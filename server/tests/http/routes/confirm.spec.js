import * as confirm from '../../../src/http/routes/confirm';
import { jest } from '@jest/globals';

describe('src/http/routes/confirm/index.js', () => {
    it('should match /confirm as route', () => {
        const req = {
            url: '/confirm',
        };

        expect(confirm.matches(req)).toBe(true);
    });

    it('should handle successfully', () => {
        const res = {
            writeHead: jest.fn(),
            end: jest.fn(),
        };

        confirm.handle(null, res);

        expect(res.writeHead).toHaveBeenCalledWith(200);
        expect(res.end).toHaveBeenCalledWith('');
    });
});

