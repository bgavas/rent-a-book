const { ObjectID } = require('mongodb');
const { User } = require('./../../models/user');

const users = [{
    _id: new ObjectID(),
    name: 'Cem Sürer'
}, {
    _id: new ObjectID(),
    name: 'Naz Uzun'
}];

const populateTables = (done) => {
    Promise.resolve()
        .then(() => User.insertMany(users))
        .then(() => done());
};

module.exports = {
    users,
    populateTables
};