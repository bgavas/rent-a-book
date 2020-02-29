const { User } = require('./../../models/user');
const { Book } = require('./../../models/book');

const resetDb = () => {
    return User.deleteMany({})
        .then(() => Book.deleteMany({}));
};

module.exports = {
    resetDb
};