const expect = require('expect');
const request = require('supertest');
const commonSeed = require('./../../seeds/common.seed');

module.exports = (app, routePrefix) => {

    describe(`GET/${routePrefix}`, () => {

        it('should get books', (done) => {

            request(app)
                .get(`/${routePrefix}`)
                .expect(200)
                .expect(res => {
                    expect(res.body.length).toBe(commonSeed.books.length);
                    commonSeed.books.forEach(book => {
                        expect(res.body.find(_book => String(book._id) === String(_book._id))).toBeTruthy();
                    });
                })
                .end(done);

        });

    });

}