const expect = require('expect');
const request = require('supertest');
const { Book } = require('./../../../models/book');
const { BOOK_ALREADY_EXISTS, INCORRECT_REQUEST_PARAMETERS } = require('./../../../utils/errors');
const commonSeed = require('./../../seeds/common.seed');

module.exports = (app, routePrefix) => {

    describe(`POST/${routePrefix}`, () => {

        it('should create book', (done) => {

            const name = 'Dummy name';

            request(app)
                .post(`/${routePrefix}`)
                .send({
                    name
                })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    // Check if book created in database
                    return Book
                        .findOne({ name })
                        .then(book => {
                            expect(book).toBeTruthy();
                            done();
                        })
                        .catch(e => done(e));

                });

        });

        it('should not create book if name already exists', (done) => {

            const name = commonSeed.books[0].name;

            request(app)
                .post(`/${routePrefix}`)
                .send({
                    name
                })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(BOOK_ALREADY_EXISTS.code);
                })
                .end(done);

        });

        it('should not create book if name is empty', (done) => {

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