import parameters from '../http/parameters.js';
import env from '../../env.js';
import crypto from 'crypto';

export function verifyRegistrationRequest(req) {
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

export function generateProof(req) {
    const url = new URL(`http://${env.host}:${env.port}/${req.url}`);
    const message = `${url.searchParams.get(parameters.shared.shopId)}${url.searchParams.get(parameters.shared.shopUrl)}localappdev`;

    return crypto.createHmac('sha256', env.appSecret).update(message).digest('hex');
}
