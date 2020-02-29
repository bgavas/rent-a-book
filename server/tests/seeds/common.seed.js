const { ObjectID } = require('mongodb');
const { User } = require('./../../models/user');
const { Book } = require('./../../models/book');

const users = [{
    _id: new ObjectID(),
    name: 'Cem Sürer'
}, {
    _id: new ObjectID(),
    name: 'Naz Uzun'
}];

const books = [{
    _id: new ObjectID(),
    name: '1984'
}, {
    _id: new ObjectID(),
    name: 'İskender'
}, {
    _id: new ObjectID(),
    name: 'How Google Works'
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
    users
};