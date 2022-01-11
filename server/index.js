import env from './env.js';
import { startServer } from './src/http/index.js';

startServer(env.port, env.host);
