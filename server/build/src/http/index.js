"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const http = __importStar(require("http"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const server = http.createServer((req, res) => {
    const matchingRoute = index_js_1.default.find(route => route.matches(req));
    if (matchingRoute) {
        console.debug(`Handling ${req.method} ${req.url}`);
        matchingRoute.handle(req, res);
        return;
    }
    res.writeHead(400);
    res.end('Bad request');
});
function startServer(port, host) {
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
}
exports.startServer = startServer;
