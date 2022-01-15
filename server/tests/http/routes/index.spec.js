import routes from '../../../src/http/routes';

describe('src/http/routes/index.js', () => {
    it('should contain all routes', () => {
        expect(typeof routes).toBe('object')
        expect(routes.length).toBe(2);
    });
});
