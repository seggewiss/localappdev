"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = exports.matches = void 0;
function matches(req) {
    return req.url && !!req.url.match(/\/confirm/);
}
exports.matches = matches;
function handle(req, res) {
    // TODO: Save shop credentials to the database
    res.writeHead(200);
    res.end('');
}
exports.handle = handle;
