import * as confirm from '../../../../src/http/routes/confirm';

test('/confirm matches route', () => {
    const req = {
        url: '/confirm',
    };

    expect(confirm.matches(req)).toBe(true);
});
