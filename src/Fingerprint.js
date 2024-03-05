/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		22/04/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * @requires    express-fingerprint
 */
const mwFingerprint = require('express-fingerprint');
const kscryp = require('kscryp');

class Fingerprint {

    /**
     * @description Allow all origin request, CORS on ExpressJS
     * @param {Object|null} [option] 
     * @returns {import('./types').TFnMiddleware} middleware
     */
    middleware(option = null) {
        /**
           * @type {import('express-fingerprint').FingerprintConfig}
           */
        const fingerprintOptions = {
            parameters: [
                // Defaults
                /**
                 * @type {import('express-fingerprint').useragent}
                 */
                mwFingerprint.useragent,
                mwFingerprint.acceptHeaders,
                mwFingerprint.geoip,
                /**
                 * @type {import('./types').TFnFingerprint}
                 */
                (cb, req, res) => {
                    let hostLs = req.headers['host'].split(":")
                    let server = { host: req.headers['host'], ip: hostLs[0], port: hostLs[1] };
                    let client = { ip: req.ip, name: req.hostname, ipOriginal: req.headers['x-forwarded-for'] || req.connection?.remoteAddress }
                    let useragent = kscryp.decode(req.headers['user-agent'], 'json');
                    cb(null, typeof useragent === "object" ? { useragent, server, client } : { server, client });
                }
            ]
        };
        return mwFingerprint(fingerprintOptions);
    }
}
module.exports = Fingerprint;