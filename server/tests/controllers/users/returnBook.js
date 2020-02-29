const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { Rent } = require('./../../../models/rent');
const { User } = require('./../../../models/user');
const { Book } = require('./../../../models/book');
const { BOOK_NOT_RENTED, INCORRECT_SCORE } = require('./../../../utils/errors');
const { LIMIT } = require('./../../../utils/constants');
const commonSeed = require('./../../seeds/common.seed');

module.exports = (app, routePrefix) => {

    describe(`POST/${routePrefix}/:userId/return/:bookId`, () => {

        it('should return a book', (done) => {

            const user = commonSeed.users[0];
            const book = commonSeed.books[2];
            const score = 5;

            request(app)
                .post(`/${routePrefix}/${user._id}/return/${book._id}`)
                .send({ score })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    // Check if return is successful
                    return Rent
                        .findOne({
                            _userId: user._id,
                            _bookId: book._id,
                            score,
                            returnDate: { $ne: null },
                            borrowDate: { $ne: null }
                        })
                        .then(rent => {
                            expect(rent).toBeTruthy();
                            return User.findOne({
                                _id: user._id,
                                'books.present._id': book._id
                            });
                        })
                        .then(_user => {
                            expect(_user).toBeFalsy();
                            return User.findOne({
                                _id: user._id,
                                'books.past': {
                                    _id: book._id,
                                    score
                                }
                            });
                        })
                        .then(_user => {
                            expect(_user).toBeTruthy();
                            return Book.findOne({
                                _id: book._id,
                                totalScore: book.totalScore + score,
                                totalVote: book.totalVote + 1
                            });
                        })
                        .then(_book => {
                            expect(_book).toBeTruthy();
                            done();
                        })
                        .catch(e => done(e));

                });

        });

        it('should not return if book not rented', (done) => {

            const _userId = new ObjectID();
            const book = commonSeed.books[0];
            const score = 5;

            request(app)
                .post(`/${routePrefix}/${_userId}/return/${book._id}`)
                .send({ score })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(BOOK_NOT_RENTED.code);
                })
                .end(done);

        });

        it('should not return if book not rented', (done) => {

            const user = commonSeed.users[1];
            const _bookId = new ObjectID();
            const score = 5;

            request(app)
                .post(`/${routePrefix}/${user._id}/return/${_bookId}`)
                .send({ score })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(BOOK_NOT_RENTED.code);
                })
                .end(done);

        });

        it('should not return if score is less than minimum', (done) => {

            const user = commonSeed.users[0];
            const book = commonSeed.books[2];
            const score = LIMIT.MINIMUN_SCORE - 1;

            request(app)
                .post(`/${routePrefix}/${user._id}/return/${book._id}`)
                .send({ score })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(INCORRECT_SCORE.code);
                })
                .end(done);

        });

        it('should not return if score is more than maximum', (done) => {

            const user = commonSeed.users[0];
            const book = commonSeed.books[2];
            const score = LIMIT.MAXIMUM_SCORE + 1;

            request(app)
                .post(`/${routePrefix}/${user._id}/return/${book._id}`)
                .send({ score })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(INCORRECT_SCORE.code);
                })
                .end(done);

        });

    });

}