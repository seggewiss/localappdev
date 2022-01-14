import env from './env.js';
import { startServer } from './src/http';

startServer(env.port, env.host);
