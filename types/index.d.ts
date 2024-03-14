export = ExpressPlugin;
declare class ExpressPlugin extends ExpressServer {
    static cls: {
        Server: typeof ExpressServer;
        Session: typeof import("./src/Session");
        Fingerprint: typeof import("./src/Fingerprint");
        Cors: typeof import("./src/Cors");
        middleware: {
            cookie: any;
            session: any;
            fingerprint: any;
            cors: any;
        };
    };
}
import ExpressServer = require("./src/ExpressServer");
