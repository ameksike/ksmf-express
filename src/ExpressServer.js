/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        22/04/2021
 * @copyright   Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 */
const express = require('express');
const https = require('https');
const ksmf = require('ksmf');

const mwCookie = require('cookie-parser');
const Cors = require('./Cors');
const Fingerprint = require('./Fingerprint');
const Session = require('./Session');

class ExpressServer extends ksmf.server.Base {

    /**
     * @description configure the web server
     * @param {Object} [payload]
     * @param {Object} [payload.web]
     * @param {Object} [payload.drv]
     * @param {Object} [payload.logger]
     * @param {Object} [payload.helper]
     * @param {Object} [payload.option]
     * @param {Object} [payload.cookie]
     * @param {Object} [payload.static]
     * @param {Object} [payload.session]
     */
    constructor(payload = undefined) {
        super(payload);
        this.web = payload?.web || express();
        this.drv = payload?.drv || express;
        this.static = payload?.static || { publish: express.static };
        this.name = 'express';
    }

    /**
     * @description configure the web server
     * @param {Object} [payload]
     * @param {Object} [payload.web]
     * @param {Object} [payload.drv]
     * @param {Object} [payload.logger]
     * @param {Object} [payload.helper]
     * @param {Object} [payload.option]
     * @param {Object} [payload.cookie]
     * @param {Object} [payload.static]
     * @param {Object} [payload.session]
     * @returns {Promise<ExpressServer>} self
     */
    configure(payload) {
        super.configure(payload);
        this.web = this.web || express();
        this.drv = this.drv || express;
        this.static = this.static || { publish: express.static };
        //... Allow body Parser
        this.use(this.drv.urlencoded({ extended: true }));
        this.use(express.json());
        return Promise.resolve(this);
    }

    /**
     * @description add cookie support
     * @override
     * @param {Object|null} [cookie] 
     * @param {Object|null} [web] 
     */
    initCookie(cookie = null, web = null) {
        web = web || this.web;
        cookie && web.use(mwCookie());
    }

    /**
     * @description add session support
     * @override
     * @param {Object|null} [config] 
     * @param {Object|null} [web] 
     */
    initSession(config = null, web = null) {
        web = web || this.web;
        const sessionManager = new Session();
        config && web?.use(sessionManager.middleware(config));
        this.session = sessionManager;
    }

    /**
     * @description add Fingerprint support
     * @override
     * @param {Object|null} [config] 
     * @param {Object|null} [web] 
     */
    initFingerprint(config = null, web = null) {
        web = web || this.web;
        const manager = new Fingerprint();
        config && web?.use(manager.middleware(config));
    }

    /**
     * @description add cors support
     * @override
     * @param {Object|null} [config] 
     * @param {Object|null} [web] 
     */
    initCors(config = null, web = null) {
        web = web || this.web;
        if (config) {
            const corsManager = new Cors();
            web.use(corsManager.middleware(config));
        }
    }

    /**
     * @description publish static files
     * @override
     * @param {String} url 
     * @param {String} path 
     */
    publish(url, path) {
        //... Allow static files
        url && path && this.drv && this.web?.use(url, this.drv.static(path));
    }

    /**
     * @description delete routes 
     * @param {String|Array<String>} value 
     * @param {Function} check 
     * @returns {Boolean}
     */
    del(value, check = null) {
        if (!(this.web?._router?.stack?.filter instanceof Function)) {
            return false;
        }
        check = check instanceof Function ? check : ((item, value) => Array.isArray(value) ? !value.includes(item?.route?.path) : item?.route?.path !== value);
        this.web._router.stack = value ? this.web._router.stack.filter(layer => check(layer, value)) : [];
        return true;
    }

    /**
     * @description set a route
     * @param {Object} payload 
     * @param {String} payload.route 
     * @param {String} payload.method 
     * @param {import('./types').TFnHandler} payload.handler 
     * @param {Array} payload.middlewares 
     * @returns {Object} 
     */
    set(payload) {
        let { route, middlewares, handler, method = 'use' } = payload;
        try {
            if (!this.web) {
                return null;
            }
            let action = this.web[method] || this.web?.use;
            if (!action || !handler || !(handler instanceof Function)) {
                return null;
            }
            middlewares = (Array.isArray(middlewares) ? middlewares : [middlewares]).filter(mw => mw instanceof Function);
            return action.apply(this.web, [route, ...middlewares, handler]);
        }
        catch (_) {
            return null;
        }
    }

    /**
     * @description start the server
     * @param {Object} [payload] 
     * @param {Number} [payload.port]
     * @param {String} [payload.key]
     * @param {String} [payload.cert] 
     * @param {String} [payload.host] 
     * @param {String} [payload.protocol] 
     * @param {Boolean} [payload.secure] 
     * @param {Object} [payload.app] 
     * @param {Function} [payload.callback] 
     */
    start(payload = null) {
        const { key, cert, protocol = 'http', port = 3003, host = '127.0.0.1', app = this.web } = payload || {};
        return new Promise((resolve, reject) => {
            try {
                if (protocol === 'https' && key && cert) {
                    https.createServer({ key, cert }, app).listen(port, () => resolve({ port, host, protocol: 'https' }));
                } else {
                    app.listen(port, () => resolve({ port, host, protocol: 'http', url: `${protocol}://${host}:${port}`, provider: 'express' }));
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }

    /**
     * @description stop server 
     */
    stop() {
        if (this.web?.close instanceof Function) {
            this.web.close();
        }
    }

    onError(callback) {
        callback instanceof Function && this.web.use((error, req, res, next) => callback(error, req, res, next));
    }

    onRequest(callback) {
        callback instanceof Function && this.web.use((req, res, next) => callback(req, res, next));
    }

    onResponse(callback) {
        callback instanceof Function && this.web.use((req, res, next) => callback(req, res, next));
    }

    on404(callback) {
        callback instanceof Function && this.web?.use('*', (req, res, next) => callback(req, res, next));
    }

    /**
     * @description get list of available routes
     * @param {Object} web 
     * @returns {Array} list
     */
    routes(web = null) {
        web = web || this.web;
        const list = [];
        const epss = [];
        function print(path, layer) {
            if (layer.route) {
                layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
            } else if (layer.name === 'router' && layer.handle.stack) {
                layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
            } else if (layer.method) {
                const endpoint = `${layer.method.toUpperCase()} ${path.concat(split(layer.regexp)).filter(Boolean).join('/')}`;
                if (epss.indexOf(endpoint) === -1) {
                    epss.push(endpoint);
                    list.push([layer.method.toUpperCase(), path.concat(split(layer.regexp)).filter(Boolean).join('/')]);
                }
            }
        }
        function split(thing) {
            if (typeof thing === 'string') {
                return thing.split('/')
            } else if (thing.fast_slash) {
                return ''
            } else {
                let match = thing.toString()
                    .replace('\\/?', '')
                    .replace('(?=\\/|$)', '$')
                    .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
                return match ?
                    match[1].replace(/\\(.)/g, '$1').split('/') :
                    '<complex:' + thing.toString() + '>'
            }
        }
        web?._router?.stack?.forEach(print.bind(null, []));
        return list;
    }
}
module.exports = ExpressServer;