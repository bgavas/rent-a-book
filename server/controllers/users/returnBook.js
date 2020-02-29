const moment = require('moment');
const { User } = require('./../../models/user');
const { Book } = require('./../../models/book');
const { Rent } = require('./../../models/rent');
const { RESPONSE_STATUS, LIMIT } = require('./../../utils/constants');
const { BOOK_NOT_RENTED, INCORRECT_SCORE } = require('./../../utils/errors');

module.exports = (req, res, next) => {

	// Extract parameters
	const { userId, bookId } = req.params;
	const { score } = req.body;

	// Check request parameters
	if (score < LIMIT.MINIMUN_SCORE || score > LIMIT.MAXIMUM_SCORE) {
		return next({
            data: INCORRECT_SCORE,
			message: `Failed while returning book (${bookId}) by the user ${userId}`,
            status: RESPONSE_STATUS.FAIL
        });
    }
    
    // Find book rent
	return Rent
		.findOne({
			_userId: userId,
			_bookId: bookId,
			returnDate: null
		})
		.then(rent => {

			// Rent not found
			if (!rent) return Promise.reject(BOOK_NOT_RENTED);

			// Create promise array
			let promises = [];

			// Modify rent object
			rent.returnDate = moment();
			rent.score = score;

			// Save rent
			promises.push(rent.save());

			// Update book
			promises.push(Book.updateOne({ _id: bookId }, {
				$inc: { totalVote: 1, totalScore: score }
			}));

			// Update user object
			promises.push(User.updateOne({ _id: userId }, {
				$push: {
					'books.past': { _id: bookId, score }
				},
				$pull: {
					'books.present': { _id: bookId }
				}
			}));

			// Wait promises
			return Promise.all(promises);

		})
		// Success
        .then(() => next({
			data: {},
            message: `Book (${bookId}) is returned by the user ${userId}`,
            status: RESPONSE_STATUS.SUCCESS
		}))
		// Error
        .catch(error => next({
			data: error,
			message: `Failed while returning book (${bookId}) by the user ${userId}`,
			status: RESPONSE_STATUS.FAIL
		}));
    
};

/**
 * @swagger
 * definition:
 *   returnBook:
 *     properties:
 *       score:
 *         type: integer
 *     example: {
 *       "score": 7
 *     }
 */

/**
 * @swagger
 * /users/{userId}/return/{bookId}:
 *   post:
 *     tags:
 *       - User
 *     description: Return a book
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
 *       - name: returnBook
 *         description: Score object
 *         in: body
 *         schema:
 *           $ref: '#/definitions/returnBook'
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