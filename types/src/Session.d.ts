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
}
