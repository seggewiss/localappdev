"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_js_1 = __importDefault(require("./env.js"));
const http_1 = require("./src/http");
(0, http_1.startServer)(env_js_1.default.port, env_js_1.default.host);
