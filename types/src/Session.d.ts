export = SessionService;
declare const SessionService_base: typeof import("ksmf/types/src/server/Session");
declare class SessionService extends SessionService_base {
    /**
     * @description initialize the session manager
     * @param {Object} app
     * @param {Object} option
     * @returns {SessionService} self
     */
    init(app: any, option?: any): SessionService;
    /**
     * @description middleware
     * @param {Object|null} config
     * @returns {import('./types').TFnMiddleware} middleware
     */
    middleware(config: any | null): import('./types').TFnMiddleware;
    /**
     * @description update a new user session
     * @param {Object} req
     * @param {String} [key]
     * @param {Object} [payload]
     * @returns {Object} session account
     */
    update(req: any, key?: string, payload?: any): any;
    /**
     * @description save update/create a new user session
     * @param {Object} req
     * @param {String} [key]
     * @param {Object} [payload]
     * @returns {Object} session account
     */
    save(req: any, key?: string, payload?: any): any;
}
