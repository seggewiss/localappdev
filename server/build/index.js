"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_js_1 = __importDefault(require("./env.js"));
const http_1 = require("./src/http");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const finder = require('findit')('./src/views');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const views = [];
const extensionSdkCdn = fs.readFileSync('./node_modules/@shopware-ag/admin-extension-sdk/cdn/index.js', 'utf8');
finder.on('directory', function (dir) {
    if (dir === './src/views') {
        return;
    }
    let template = '';
    const viewName = dir.substring(10, dir.length);
    try {
        template = fs.readFileSync(dir + '/index.html', 'utf8');
    }
    catch (e) {
        console.warn('Could not read template from ' + dir + '/index.html');
        return;
    }
    if (template.includes('<!--injectAdminExtensionSdk-->')) {
        template = template.replace('<!--injectAdminExtensionSdk-->', `<script>${extensionSdkCdn}</script>`);
    }
    views.push({
        name: viewName,
        matches: (req) => {
            if (!req.url) {
                return false;
            }
            const regex = new RegExp(`/${viewName}`);
            return !!req.url.match(regex);
        },
        handle: (_, res) => {
            res.writeHead(200);
            res.end(template);
        }
    });
});
finder.on('end', () => {
    (0, http_1.startServer)(env_js_1.default.port, env_js_1.default.host, views);
});
