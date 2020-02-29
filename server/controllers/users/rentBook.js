const { User } = require('./../../models/user');
const { Book } = require('./../../models/book');
const { Rent } = require('./../../models/rent');
const { RESPONSE_STATUS } = require('./../../utils/constants');
const {
	USER_NOT_EXISTS, BOOK_NOT_EXISTS, BOOK_ALREADY_RENTED,
	BOOK_ALREADY_RENTED_BY_SOMEONE_ELSE
} = require('./../../utils/errors');

module.exports = (req, res, next) => {

	// Extract parameters
	const { userId, bookId } = req.params;

	// Empty promise array
	let promises = [];

	// Get user
	promises.push(User.findById(userId, '_id'));
	// Get book
	promises.push(Book.findById(bookId, '_id'));
	// Check rent info
	promises.push(Rent.findOne({ _bookId: bookId, returnDate: null }, '_userId'));
    
    // Wait promises
	return Promise
		.all(promises)
		.then(([user, book, rent]) => {

			// User not exists
			if (!user) return Promise.reject(USER_NOT_EXISTS);
			// Book not exists
			if (!book) return Promise.reject(BOOK_NOT_EXISTS);
			// Book already rented by this user
			if (rent) {
				if (String(rent._userId) === String(userId)) return Promise.reject(BOOK_ALREADY_RENTED);
				else return Promise.reject(BOOK_ALREADY_RENTED_BY_SOMEONE_ELSE);
			}

			// Empty promise array
			promises = [];

			// Add rent entry
			promises.push(Rent.create({
				_userId: userId,
				_bookId: bookId
			}));

			// Update user object
			promises.push(User.updateOne({ _id: userId }, {
				$push: {
					'books.present': { _id: bookId }
				}
			}));

			// Wait promises
			return Promise.all(promises);

		})
		// Success
        .then(() => next({
			data: {},
            message: `Book (${bookId}) is rented by the user ${userId}`,
            status: RESPONSE_STATUS.SUCCESS
		}))
		// Error
        .catch(error => next({
			data: error,
			message: `Failed while renting book (${bookId}) by the user ${userId}`,
			status: RESPONSE_STATUS.FAIL
		}));
    
};

/**
 * @swagger
 * /users/{userId}/borrow/{bookId}:
 *   post:
 *     tags:
 *       - User
 *     description: Rent a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         schema:
 *           type: string
 *       - name: bookId
 *         in: path
 *         schema:
 *           type: string
 *       - name: x-lang
 *         in: header
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *       400:
 *         description: Error
 *         schema:
 *           type: object
 *           $ref: '#/definitions/error'
 *       500:
 *         description: Error
 *         schema:
 *           type: object
 *           $ref: '#/definitions/error'
 */