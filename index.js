const ExpressServer = require('./src/ExpressServer');
module.exports = new (class extends ExpressServer {
    cls = {
        Server: ExpressServer,
        Session: require('./src/Session'),
        Fingerprint: require('./src/Fingerprint'),
        Cors: require('./src/Cors'),
        middleware: {
            cookie: require('cookie-parser'),
            session: require('express-session'),
            fingerprint: require('express-fingerprint'),
            cors: require('cors'),
        }
    };
});