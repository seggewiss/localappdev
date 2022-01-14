import * as http from "http";

export function matches(req: http.IncomingMessage) {
  return req.url && !!req.url.match(/\/confirm/);
}

export function handle(req: http.IncomingMessage, res: http.ServerResponse) {
  // TODO: Save shop credentials to the database
  res.writeHead(200);
  res.end('');
}
