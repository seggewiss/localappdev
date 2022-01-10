const http = require('./src/http');
const env = require('./env');

http.startServer(env.port, env.host);
