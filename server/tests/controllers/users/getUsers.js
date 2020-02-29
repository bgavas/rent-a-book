const expect = require('expect');
const request = require('supertest');
const commonSeed = require('./../../seeds/common.seed');

module.exports = (app, routePrefix) => {

    describe(`GET/${routePrefix}`, () => {

        it('should get users', (done) => {

            request(app)
                .get(`/${routePrefix}`)
                .expect(200)
                .expect(res => {
                    expect(res.body.length).toBe(commonSeed.users.length);
                    commonSeed.users.forEach(user => {
                        expect(res.body.find(_user => String(user._id) === String(_user._id))).toBeTruthy();
                    });
                })
                .end(done);

        });

    });

}