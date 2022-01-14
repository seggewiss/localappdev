import * as registrationService from '../../../utils/registration-service.js';
import env from '../../../../env.js';
import * as http from "http";

export function matches(req: http.IncomingMessage) {
  return req.url && !!req.url.match(/\/registration\?.*/);
}

export function handle(req: http.IncomingMessage, res: http.ServerResponse) {
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
