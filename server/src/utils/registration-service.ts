import parameters from '../http/parameters';
import env from '../../env';
import * as crypto from 'crypto';
import * as http from "http";

export function verifyRegistrationRequest(req: http.IncomingMessage) {
  const url = new URL(`http://${env.host}:${env.port}/${req.url}`);
  const appSignature = req.headers[parameters.shared.shopwareAppSignature];

  if(!appSignature) {
    return false;
  }

  if(!url.searchParams.has(parameters.shared.shopId)) {
    return false;
  }

  if(!url.searchParams.has(parameters.shared.shopUrl)) {
    return false;
  }

  if(!url.searchParams.has(parameters.shared.timestamp)) {
    return false;
  }

  const message = `${parameters.shared.shopId}=${url.searchParams.get(parameters.shared.shopId)}&${parameters.shared.shopUrl}=${url.searchParams.get(parameters.shared.shopUrl)}&${parameters.shared.timestamp}=${url.searchParams.get(parameters.shared.timestamp)}`;
  const hash = crypto.createHmac('sha256', env.appSecret).update(message).digest('hex');

  return hash === appSignature;
}

export function generateProof(req: http.IncomingMessage) {
  const url = new URL(`http://${env.host}:${env.port}/${req.url}`);
  const message = `${url.searchParams.get(parameters.shared.shopId)}${url.searchParams.get(parameters.shared.shopUrl)}localappdev`;

  return crypto.createHmac('sha256', env.appSecret).update(message).digest('hex');
}
