const moment = require('moment');
const { ObjectID } = require('mongodb');
const { User } = require('./../../models/user');
const { Book } = require('./../../models/book');

const books = [{
    _id: new ObjectID(),
    name: '1984',
    totalScore: 4,
    totalVote: 1
}, {
    _id: new ObjectID(),
    name: 'İskender',
    totalScore: 17,
    totalVote: 2
}, {
    _id: new ObjectID(),
    name: 'How Google Works',
    totalScore: 0,
    totalVote: 0
}];

const users = [{
    _id: new ObjectID(),
    name: 'Cem Sürer',
    books: {
        past: [{
            _id: books[0]._id,
            score: 4,
            createdAt: moment()
        }, {
            _id: books[1]._id,
            score: 8,
            createdAt: moment()
        }],
        present: [{
            _id: books[2]._id,
            createdAt: moment()
        }]
    }
}, {
    _id: new ObjectID(),
    name: 'Naz Uzun',
    books: {
        past: [{
            _id: books[1]._id,
            score: 9,
            createdAt: moment()
        }],
        present: []
    }
}];

const rents = [{
    _id: new ObjectID(),
    _bookId: books[0]._id,
    _userId: users[0]._id,
    score: 4,
    borrowDate: moment(),
    returnDate: moment()
}, {
    _id: new ObjectID(),
    _bookId: books[1]._id,
    _userId: users[0]._id,
    score: 8,
    borrowDate: moment(),
    returnDate: moment()
}, {
    _id: new ObjectID(),
    _bookId: books[2]._id,
    _userId: users[0]._id,
    borrowDate: moment()
}, {
    _id: new ObjectID(),
    _bookId: books[1]._id,
    _userId: users[1]._id,
    score: 9,
    borrowDate: moment(),
    returnDate: moment()
}];



const populateTables = (done) => {
    Promise.resolve()
        .then(() => User.insertMany(users))
        .then(() => Book.insertMany(books))
        .then(() => done());
};

module.exports = {
    books,
    populateTables,
    rents,
    users,
};