const { ObjectID } = require('mongodb');
const { User } = require('./../../models/user');

const users = [{
    _id: new ObjectID(),
    name: 'Cem Sürer'
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