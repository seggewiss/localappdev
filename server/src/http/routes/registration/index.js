const registrationService = require('../../../utils/registration-service');
const env = require('../../../../env');

function matches(req) {
  return req.url.match(/\/registration\?.*/);
}

function handle(req, res) {
  if(!registrationService.verifyRegistrationRequest(req)) {
    res.writeHead(400);
    res.end('Registration failed');

    return
  }

  const response = {
    proof: registrationService.generateProof(req),
    secret: env.appSecret,
    'confirmation_url': `http://${env.host}:${env.port}/confirm`,
  };

  res.writeHead(200);
  res.end(JSON.stringify(response));
}

exports.matches = matches;
exports.handle = handle;
