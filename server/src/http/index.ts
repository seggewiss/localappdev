import * as http from 'http';
import routes from './routes';

const server = http.createServer((req, res) => {
  const matchingRoute = routes.find(route => route.matches(req));
  if (matchingRoute) {
    console.debug(`Handling ${req.method} ${req.url}`);
    matchingRoute.handle(req, res);

    return;
  }

  res.writeHead(400);
  res.end('Bad request');
});

export function startServer(port: number, host: string) {
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}
