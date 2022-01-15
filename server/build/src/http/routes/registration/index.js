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
exports.handle = exports.matches = void 0;
const registrationService = __importStar(require("../../../utils/registration-service"));
const env_1 = __importDefault(require("../../../../env"));
function matches(req) {
    return req.url && !!req.url.match(/\/registration\?.*/);
}
exports.matches = matches;
function handle(req, res) {
    if (!registrationService.verifyRegistrationRequest(req)) {
        res.writeHead(400);
        res.end('Registration failed');
        return;
    }
    const response = {
        proof: registrationService.generateProof(req),
        secret: env_1.default.appSecret,
        'confirmation_url': `http://${env_1.default.host}:${env_1.default.port}/confirm`,
    };
    res.writeHead(200);
    res.end(JSON.stringify(response));
}
exports.handle = handle;
