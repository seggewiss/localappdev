import * as registration from '../../../src/http/routes/registration';
import parameters from '../../../src/http/parameters.js';
import { jest } from '@jest/globals';
import crypto from "crypto";
import env from "../../../env.js";

describe('src/http/routes/registration/index.js', () => {
    it('should match /registration?shop-id=1234 as route', () => {
        const req = {
            url: '/registration?shop-id=1234',
        };

        expect(registration.matches(req)).toBe(true);
    });

    it('should fail registration without signature', () => {
        const res = {
            writeHead: jest.fn(),
            end: jest.fn(),
        };

        registration.handle({headers: {}}, res);

        expect(res.writeHead).toHaveBeenCalledWith(400);
        expect(res.end).toHaveBeenCalledWith('Registration failed');
    });

    it('should fail registration without shop-id', () => {
        const res = {
            writeHead: jest.fn(),
            end: jest.fn(),
        };

        const req = {
            headers: {
                [parameters.shared.shopwareAppSignature]: '1234',
            }
        };

        registration.handle(req, res);

        expect(res.writeHead).toHaveBeenCalledWith(400);
        expect(res.end).toHaveBeenCalledWith('Registration failed');
    });

    it('should fail registration without shop-url', () => {
        const res = {
            writeHead: jest.fn(),
            end: jest.fn(),
        };

        const req = {
            url: '/registration?shop-id=12',
            headers: {
                [parameters.shared.shopwareAppSignature]: '1234',
            }
        };

        registration.handle(req, res);

        expect(res.writeHead).toHaveBeenCalledWith(400);
        expect(res.end).toHaveBeenCalledWith('Registration failed');
    });

    it('should fail registration without timestamp', () => {
        const res = {
            writeHead: jest.fn(),
            end: jest.fn(),
        };

        const req = {
            url: '/registration?shop-id=12&shop-url=foo',
            headers: {
                [parameters.shared.shopwareAppSignature]: '1234',
            }
        };

        registration.handle(req, res);

        expect(res.writeHead).toHaveBeenCalledWith(400);
        expect(res.end).toHaveBeenCalledWith('Registration failed');
    });

    it('should fail registration with invalid signature', () => {
        const res = {
            writeHead: jest.fn(),
            end: jest.fn(),
        };

        const req = {
            url: '/registration?shop-id=12&shop-url=foo&timestamp=12345',
            headers: {
                [parameters.shared.shopwareAppSignature]: '1234',
            }
        };

        registration.handle(req, res);

        expect(res.writeHead).toHaveBeenCalledWith(400);
        expect(res.end).toHaveBeenCalledWith('Registration failed');
    });

    it('should succeed', () => {
        const message = 'shop-id=12&shop-url=foo&timestamp=12345';
        const hash = crypto.createHmac('sha256', env.appSecret).update(message).digest('hex');
        const res = {
            writeHead: jest.fn(),
            end: jest.fn(),
        };

        const req = {
            url: '/registration?shop-id=12&shop-url=foo&timestamp=12345',
            headers: {
                [parameters.shared.shopwareAppSignature]: hash,
            }
        };

        registration.handle(req, res);

        expect(res.writeHead).toHaveBeenCalledWith(200);
    });
});

