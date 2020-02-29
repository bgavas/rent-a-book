const { User } = require('./../../models/user');
const { Book } = require('./../../models/book');
const { Rent } = require('./../../models/rent');

const resetDb = () => {
    return Rent.deleteMany({})
        .then(() => Book.deleteMany({}))
        .then(() => User.deleteMany({}));
};

module.exports = {
    resetDb
};