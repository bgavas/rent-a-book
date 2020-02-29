const { Book } = require('./../../models/book');
const { RESPONSE_STATUS } = require('./../../utils/constants');
const { BOOK_NOT_EXISTS } = require('./../../utils/errors');

module.exports = (req, res, next) => {

	// Extract parameters
	const { bookId } = req.params;
    
    // Get book list
    return Book
		.findById(bookId, '_id name totalScore totalVote')
		.lean()
		.then(book => {

			// Book not exists
			if (!book) return Promise.reject(BOOK_NOT_EXISTS);

			// Return book
			return {
				_id: book._id,
				name: book.name,
				score: book.totalVote === 0 ? -1 : Number(book.totalScore / book.totalVote).toFixed(2)
			};

		})
		// Success
        .then(book => next({
			data: book,
            message: `Book fetched`,
            status: RESPONSE_STATUS.SUCCESS
		}))
		// Error
        .catch(error => next({
			data: error,
			message: `Failed while fetching book`,
			status: RESPONSE_STATUS.FAIL
		}));
    
};

/**
 * @swagger
 * /books/{bookId}:
 *   get:
 *     tags:
 *       - Book
 *     description: Get book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         in: path
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/definitions/bookScore'
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