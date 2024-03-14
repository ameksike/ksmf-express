export = ExpressServer;
declare class ExpressServer {
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
    constructor(payload?: {
        web?: any;
        drv?: any;
        logger?: any;
        helper?: any;
        option?: any;
        cookie?: any;
        static?: any;
        session?: any;
    });
    web: any;
    drv: any;
    static: any;
    name: string;
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
    configure(payload?: {
        web?: any;
        drv?: any;
        logger?: any;
        helper?: any;
        option?: any;
        cookie?: any;
        static?: any;
        session?: any;
    }): Promise<ExpressServer>;
    /**
     * @description add cookie support
     * @override
     * @param {Object|null} [cookie]
     * @param {Object|null} [web]
     */
    override initCookie(cookie?: any | null, web?: any | null): void;
    /**
     * @description add session support
     * @override
     * @param {Object|null} [config]
     * @param {Object|null} [web]
     */
    override initSession(config?: any | null, web?: any | null): void;
    session: Session;
    /**
     * @description add Fingerprint support
     * @override
     * @param {Object|null} [config]
     * @param {Object|null} [web]
     */
    override initFingerprint(config?: any | null, web?: any | null): void;
    /**
     * @description add cors support
     * @override
     * @param {Object|null} [config]
     * @param {Object|null} [web]
     */
    override initCors(config?: any | null, web?: any | null): void;
    /**
     * @description publish static files
     * @override
     * @param {String} url
     * @param {String} path
     */
    override publish(url: string, path: string): void;
    /**
     * @description delete routes
     * @param {String|Array<String>} value
     * @param {Function} check
     * @returns {Boolean}
     */
    del(value: string | Array<string>, check?: Function): boolean;
    /**
     * @description set a route
     * @param {Object} payload
     * @param {String} payload.route
     * @param {String} payload.method
     * @param {import('./types').TFnHandler} payload.handler
     * @param {Array} payload.middlewares
     * @returns {Object}
     */
    set(payload: {
        route: string;
        method: string;
        handler: import('./types').TFnHandler;
        middlewares: any[];
    }): any;
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
    start(payload?: {
        port?: number;
        key?: string;
        cert?: string;
        host?: string;
        protocol?: string;
        secure?: boolean;
        app?: any;
        callback?: Function;
    }): Promise<any>;
    /**
     * @description stop server
     */
    stop(): void;
    onError(callback: any): void;
    onRequest(callback: any): void;
    onResponse(callback: any): void;
    on404(callback: any): void;
    /**
     * @description get list of available routes
     * @param {Object} web
     * @returns {Array} list
     */
    routes(web?: any): any[];
}
import Session = require("./Session");
