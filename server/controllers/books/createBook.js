const validator = require('validator');
const { Book } = require('./../../models/book');
const { RESPONSE_STATUS } = require('./../../utils/constants');
const { INCORRECT_REQUEST_PARAMETERS, BOOK_ALREADY_EXISTS } = require('./../../utils/errors');

module.exports = (req, res, next) => {

    // Extract parameters
    const { name } = req.body;

	// Check request parameters
	if (validator.isEmpty(name)) {
		return next({
            data: INCORRECT_REQUEST_PARAMETERS,
			message: `Failed while creating book`,
            status: RESPONSE_STATUS.FAIL
        });
    }
    
    // Check if there is a book with this name
    return Book
        .findOne({ name }, '_id')
        .then(book => {

            // This book already exists
            if (book) return Promise.reject(BOOK_ALREADY_EXISTS);

            // Create book
            return Book.create({ name });

        })
		// Success
        .then(book => next({
			data: {},
            message: `Book (${book._id}) is created`,
            status: RESPONSE_STATUS.SUCCESS
		}))
		// Error
        .catch(error => next({
			data: error,
			message: `Failed while creating book`,
			status: RESPONSE_STATUS.FAIL
		}));
    
};

/**
 * @swagger
 * definition:
 *   newBook:
 *     properties:
 *       name:
 *         type: string
 *     example: {
 *       "name": "İki Şehrin Hikayesi"
 *     }
 */

/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Book
 *     description: Create new book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: newBook
 *         description: Book object
 *         in: body
 *         schema:
 *           $ref: '#/definitions/newBook'
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
 *         description: Code = 3000
 *         schema:
 *           type: object
 *           $ref: '#/definitions/error'
 */