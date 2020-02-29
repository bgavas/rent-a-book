const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const commonSeed = require('./../../seeds/common.seed');
const { BOOK_NOT_EXISTS } = require('./../../../utils/errors');

module.exports = (app, routePrefix) => {

    describe(`GET/${routePrefix}/:bookId`, () => {

        it('should get book having votes', (done) => {

            const book = commonSeed.books[0];

            request(app)
                .get(`/${routePrefix}/${book._id}`)
                .expect(200)
                .expect(res => {
                    expect(String(res.body._id)).toBe(String(book._id));
                    expect(res.body.score).toBe(Number(book.totalScore / book.totalVote).toFixed(2));
                })
                .end(done);

        });

        it('should get book having no votes', (done) => {

            const book = commonSeed.books[2];

            request(app)
                .get(`/${routePrefix}/${book._id}`)
                .expect(200)
                .expect(res => {
                    expect(String(res.body._id)).toBe(String(book._id));
                    expect(res.body.score).toBe(-1);
                })
                .end(done);

        });

        it('should not get book if book not exists', (done) => {

            const _bookId = new ObjectID();

            request(app)
                .get(`/${routePrefix}/${_bookId}`)
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(BOOK_NOT_EXISTS.code);
                })
                .end(done);

        });

    });

}