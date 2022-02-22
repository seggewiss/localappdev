import env from './env.js';
import { startServer } from './src/http';
import http from "http";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const finder = require('findit')('./src/views');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

type view = {
    name: string,
    matches: (req: http.IncomingMessage) => boolean,
    handle: (_: http.IncomingMessage, res: http.ServerResponse) => void,
};

export type views = view[];

const views: views = [];
const extensionSdkCdn = fs.readFileSync('./node_modules/@shopware-ag/admin-extension-sdk/cdn/index.js', 'utf8');

finder.on('directory', function (dir: string) {
    if (dir === './src/views') {
        return;
    }

    let template = '';
    const viewName = dir.substring(10, dir.length);
    try {
        template = fs.readFileSync(dir + '/index.html', 'utf8');
    } catch (e) {
        console.warn('Could not read template from ' + dir + '/index.html');

        return;
    }

    if (template.includes('<!--injectAdminExtensionSdk-->')) {
        template = template.replace('<!--injectAdminExtensionSdk-->', `<script>${extensionSdkCdn}</script>`)
    }

    views.push({
        name: viewName,
        matches: (req: http.IncomingMessage): boolean => {
            if (!req.url) {
                return false;
            }

            const regex = new RegExp(`/${viewName}`)

            return !!req.url.match(regex);
        },
        handle: (_: http.IncomingMessage, res: http.ServerResponse) => {
            res.writeHead(200);
            res.end(template);
        }
    });
});

finder.on('end', () => {
    startServer(env.port, env.host, views);
})

