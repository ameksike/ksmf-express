export = Fingerprint;
declare class Fingerprint {
    /**
     * @description Allow all origin request, CORS on ExpressJS
     * @param {Object|null} [option]
     * @returns {import('./types').TFnMiddleware} middleware
     */
    middleware(option?: any | null): import('./types').TFnMiddleware;
}
