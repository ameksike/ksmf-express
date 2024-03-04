export = ExpressServer;
declare const ExpressServer_base: typeof import("ksmf/types/src/server/BaseServer");
declare class ExpressServer extends ExpressServer_base {
    /**
     * @description configure the web server
     * @param {Object} [payload]
     * @param {Object} [payload.web]
     * @param {Object} [payload.drv]
     * @param {Object} [payload.logger]
     * @param {Object} [payload.helper]
     * @param {Object} [payload.option]
     * @param {Object} [payload.cookie]
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
        session?: any;
    }): Promise<ExpressServer>;
    /**
     * @description add cookie support
     * @param {Object|null} [cookie]
     * @param {Object|null} [web]
     */
    initCookie(cookie?: any | null, web?: any | null): void;
    /**
     * @description add session support
     * @param {Object|null} [config]
     * @param {Object|null} [web]
     */
    initSession(config?: any | null, web?: any | null): void;
    /**
     * @description add Fingerprint support
     * @param {Object|null} [config]
     * @param {Object|null} [web]
     */
    initFingerprint(config?: any | null, web?: any | null): void;
    /**
     * @description add cors support
     * @param {Object|null} [config]
     * @param {Object|null} [web]
     */
    initCors(config?: any | null, web?: any | null): void;
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
    onError(callback: any): void;
    onRequest(callback: any): void;
    onResponse(callback: any): void;
    on404(callback: any): void;
}
