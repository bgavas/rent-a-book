const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const commonSeed = require('./../../seeds/common.seed');
const { USER_NOT_EXISTS } = require('./../../../utils/errors');

module.exports = (app, routePrefix) => {

    describe(`GET/${routePrefix}`, () => {

        it('should get user', (done) => {

            const user = commonSeed.users[0];

            request(app)
                .get(`/${routePrefix}/${user._id}`)
                .expect(200)
                .expect(res => {
                    expect(res.body).toBeTruthy();
                    // Past books
                    expect(res.body.books.past.length).toBe(commonSeed.users[0].books.past.length);
                    user.books.past.forEach(book => {
                        expect(res.body.books.past.find(_book => String(book._id) === String(_book._id))).toBeTruthy();
                    });
                    // Present books
                    expect(res.body.books.present.length).toBe(commonSeed.users[0].books.present.length);
                })
                .end(done);

        });

        it('should not get user if user not exists', (done) => {

            const _userId = new ObjectID();

            request(app)
                .get(`/${routePrefix}/${_userId}`)
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(USER_NOT_EXISTS.code);
                })
                .end(done);

        });

    });

}