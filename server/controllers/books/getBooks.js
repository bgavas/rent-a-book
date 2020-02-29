const { Book } = require('./../../models/book');
const { RESPONSE_STATUS } = require('./../../utils/constants');

module.exports = (req, res, next) => {
    
    // Get book list
    return Book
        .find({}, '_id name')
		// Success
        .then(books => next({
			data: books,
            message: `Books fetched`,
            status: RESPONSE_STATUS.SUCCESS
		}))
		// Error
        .catch(error => next({
			data: error,
			message: `Failed while fetching books`,
			status: RESPONSE_STATUS.FAIL
		}));
    
};

/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Book
 *     description: Get book list
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/definitions/book'
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