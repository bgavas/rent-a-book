const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { Rent } = require('./../../../models/rent');
const { User } = require('./../../../models/user');
const {
    USER_NOT_EXISTS, BOOK_NOT_EXISTS, BOOK_ALREADY_RENTED,
    BOOK_ALREADY_RENTED_BY_SOMEONE_ELSE
} = require('./../../../utils/errors');
const commonSeed = require('./../../seeds/common.seed');

module.exports = (app, routePrefix) => {

    describe(`POST/${routePrefix}/:userId/borrow/:bookId`, () => {

        it('should rent a book', (done) => {

            const user = commonSeed.users[1];
            const book = commonSeed.books[0];

            request(app)
                .post(`/${routePrefix}/${user._id}/borrow/${book._id}`)
                .send({})
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    // Check if rent is successful
                    return Rent
                        .findOne({
                            _userId: user._id,
                            _bookId: book._id,
                            score: null,
                            returnDate: null,
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
                            expect(_user).toBeTruthy();
                            done();
                        })
                        .catch(e => done(e));

                });

        });

        it('should rent if book was rented before but not rented currently', (done) => {

            const user = commonSeed.users[0];
            const book = commonSeed.books[0];

            request(app)
                .post(`/${routePrefix}/${user._id}/borrow/${book._id}`)
                .send({})
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    // Check if rent is successful
                    return Rent
                        .findOne({
                            _userId: user._id,
                            _bookId: book._id,
                            score: null,
                            returnDate: null,
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
                            expect(_user).toBeTruthy();
                            done();
                        })
                        .catch(e => done(e));

                });

        });

        it('should not rent if user not found', (done) => {

            const _userId = new ObjectID();
            const book = commonSeed.books[0];

            request(app)
                .post(`/${routePrefix}/${_userId}/borrow/${book._id}`)
                .send({})
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(USER_NOT_EXISTS.code);
                })
                .end(done);

        });

        it('should not rent if book not found', (done) => {

            const user = commonSeed.users[1];
            const _bookId = new ObjectID();

            request(app)
                .post(`/${routePrefix}/${user._id}/borrow/${_bookId}`)
                .send({})
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(BOOK_NOT_EXISTS.code);
                })
                .end(done);

        });

        it('should not rent if book is rented currently', (done) => {

            const user = commonSeed.users[0];
            const book = commonSeed.books[2];

            request(app)
                .post(`/${routePrefix}/${user._id}/borrow/${book._id}`)
                .send({})
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(BOOK_ALREADY_RENTED.code);
                })
                .end(done);

        });

        it('should not rent if book is rented currently', (done) => {

            const user = commonSeed.users[1];
            const book = commonSeed.books[2];

            request(app)
                .post(`/${routePrefix}/${user._id}/borrow/${book._id}`)
                .send({})
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(BOOK_ALREADY_RENTED_BY_SOMEONE_ELSE.code);
                })
                .end(done);

        });

    });

}