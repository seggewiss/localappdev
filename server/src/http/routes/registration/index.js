const requestVerifier = require('../../../utils/request-verifier');

function matches(req) {
  return req.url.match(/\/registration\?.*/);
}

function handle(req, res) {
  // TODO: handle registration
  if(!requestVerifier.verify(req)) {
    res.writeHead(400);
    res.end('Registration failed');

    return
  }

  res.writeHead(200);
  res.end('Registration successfull');
}

exports.matches = matches;
exports.handle = handle;
