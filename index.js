/**
 * @author      Antonio Membrides Espinosa
 * @email       tonykssa@gmail.com
 * @date        22/04/2021
 * @copyright   Copyright (c) 2020-2050
 * @license     GPL
 * @version     1.0
 */
const ExpressServer = require('./src/ExpressServer');
class ExpressPlugin extends ExpressServer {
    static cls = {
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
};
module.exports = ExpressPlugin;