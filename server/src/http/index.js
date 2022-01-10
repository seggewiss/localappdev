const http = require('http');
const routes = require('./routes');

const server = http.createServer((req, res) => {
  const matchingRoute = routes.routes.find(route => route.matches(req));
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

exports.startServer = startServer