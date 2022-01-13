import * as registrationService from '../../../utils/registration-service.js';
import env from '../../../../env.js';

export function matches(req) {
  return !!req.url.match(/\/registration\?.*/);
}

export function handle(req, res) {
  if(!registrationService.verifyRegistrationRequest(req)) {
    res.writeHead(400);
    res.end('Registration failed');

    return;
  }

  const response = {
    proof: registrationService.generateProof(req),
    secret: env.appSecret,
    'confirmation_url': `http://${env.host}:${env.port}/confirm`,
  };

  res.writeHead(200);
  res.end(JSON.stringify(response));
}
