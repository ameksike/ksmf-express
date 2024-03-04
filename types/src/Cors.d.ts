export = CorsWrapper;
declare class CorsWrapper {
    /**
     * @description load DAO lib and load project models
     */
    onInitApp(web: any, app: any): void;
    /**
     * @description Allow all origin request, CORS on ExpressJS
     * @param {Object|null} config
     * @returns {import('./types').TFnMiddleware} middleware
     */
    middleware(config: any | null, env?: NodeJS.ProcessEnv): import('./types').TFnMiddleware;
}
