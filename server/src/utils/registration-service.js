const parameters = require('../http/parameters');
const env = require('../../env');
const crypto = require('crypto');

function verifyRegistrationRequest(req) {
  const url = new URL(`http://${env.host}:${env.port}/${req.url}`);
  const appSignature = req.headers[parameters.parameters.shared.shopwareAppSignature];

  if(!appSignature) {
    return false;
  }

  if(!url.searchParams.has(parameters.parameters.shared.shopId)) {
    return false;
  }

  if(!url.searchParams.has(parameters.parameters.shared.shopUrl)) {
    return false;
  }

  if(!url.searchParams.has(parameters.parameters.shared.timestamp)) {
    return false;
  }

  const message = `${parameters.parameters.shared.shopId}=${url.searchParams.get(parameters.parameters.shared.shopId)}&${parameters.parameters.shared.shopUrl}=${url.searchParams.get(parameters.parameters.shared.shopUrl)}&${parameters.parameters.shared.timestamp}=${url.searchParams.get(parameters.parameters.shared.timestamp)}`;
  const hash = crypto.createHmac('sha256', env.appSecret).update(message).digest('hex');

  return hash === appSignature;
}

function generateProof(req) {
  const url = new URL(`http://${env.host}:${env.port}/${req.url}`);
  const message = `${url.searchParams.get(parameters.parameters.shared.shopId)}${url.searchParams.get(parameters.parameters.shared.shopUrl)}localappdev`;

  return crypto.createHmac('sha256', env.appSecret).update(message).digest('hex');
}

exports.verifyRegistrationRequest = verifyRegistrationRequest
exports.generateProof = generateProof
