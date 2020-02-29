const { User } = require('./../../models/user');
const { Book } = require('./../../models/book');
const { BookScore } = require('./../../models/bookScore');

const resetDb = () => {
    return BookScore.deleteMany({})
        .then(() => Book.deleteMany({}))
        .then(() => User.deleteMany({}));
};

module.exports = {
    resetDb
};