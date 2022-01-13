export function matches(req) {
  return !!req.url.match(/\/confirm/);
}

export function handle(req, res) {
  // TODO: Save shop credentials to the database
  res.writeHead(200);
  res.end('');
}
