const expect = require('expect');
const request = require('supertest');
const { User } = require('./../../../models/user');
const { USER_ALREADY_EXISTS, INCORRECT_REQUEST_PARAMETERS } = require('./../../../utils/errors');
const commonSeed = require('./../../seeds/common.seed');

module.exports = (app, routePrefix) => {

    describe(`POST/${routePrefix}`, () => {

        it('should create user', (done) => {

            const name = 'Dummy name';

            request(app)
                .post(`/${routePrefix}`)
                .send({
                    name
                })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    // Check if user created in database
                    return User
                        .findOne({ name })
                        .then(user => {
                            expect(user).toBeTruthy();
                            done();
                        })
                        .catch(e => done(e));

                });

        });

        it('should not create user if name already exists', (done) => {

            const name = commonSeed.users[0].name;

            request(app)
                .post(`/${routePrefix}`)
                .send({
                    name
                })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(USER_ALREADY_EXISTS.code);
                })
                .end(done);

        });

        it('should not create user if name is empty', (done) => {

            const name = '';

            request(app)
                .post(`/${routePrefix}`)
                .send({
                    name
                })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(INCORRECT_REQUEST_PARAMETERS.code);
                })
                .end(done);

        });

    });

}