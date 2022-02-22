import * as http from 'http';
import routes from './routes';
import { views } from '../../index';

export function startServer(port: number, host: string, views: views) {
  const server = http.createServer((req, res) => {
    const matchingRoute = routes.find(route => route.matches(req));
    if (matchingRoute) {
      console.debug(`Handling route ${req.method} ${req.url}`);
      matchingRoute.handle(req, res);

      return;
    }

    const matchingView = views.find(view => view.matches(req));
    if (matchingView) {
      console.debug(`Handling view ${req.method} ${req.url}`);
      matchingView.handle(req, res);

      return;
    }

    res.writeHead(400);
    res.end('Bad request');
  });

  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}
