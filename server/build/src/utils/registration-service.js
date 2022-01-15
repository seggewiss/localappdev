"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProof = exports.verifyRegistrationRequest = void 0;
const parameters_1 = __importDefault(require("../http/parameters"));
const env_1 = __importDefault(require("../../env"));
const crypto = __importStar(require("crypto"));
function verifyRegistrationRequest(req) {
    const url = new URL(`http://${env_1.default.host}:${env_1.default.port}/${req.url}`);
    const appSignature = req.headers[parameters_1.default.shared.shopwareAppSignature];
    if (!appSignature) {
        return false;
    }
    if (!url.searchParams.has(parameters_1.default.shared.shopId)) {
        return false;
    }
    if (!url.searchParams.has(parameters_1.default.shared.shopUrl)) {
        return false;
    }
    if (!url.searchParams.has(parameters_1.default.shared.timestamp)) {
        return false;
    }
    const message = `${parameters_1.default.shared.shopId}=${url.searchParams.get(parameters_1.default.shared.shopId)}&${parameters_1.default.shared.shopUrl}=${url.searchParams.get(parameters_1.default.shared.shopUrl)}&${parameters_1.default.shared.timestamp}=${url.searchParams.get(parameters_1.default.shared.timestamp)}`;
    const hash = crypto.createHmac('sha256', env_1.default.appSecret).update(message).digest('hex');
    return hash === appSignature;
}
exports.verifyRegistrationRequest = verifyRegistrationRequest;
function generateProof(req) {
    const url = new URL(`http://${env_1.default.host}:${env_1.default.port}/${req.url}`);
    const message = `${url.searchParams.get(parameters_1.default.shared.shopId)}${url.searchParams.get(parameters_1.default.shared.shopUrl)}localappdev`;
    return crypto.createHmac('sha256', env_1.default.appSecret).update(message).digest('hex');
}
exports.generateProof = generateProof;
