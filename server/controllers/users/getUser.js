const { User } = require('./../../models/user');
const { RESPONSE_STATUS } = require('./../../utils/constants');
const { USER_NOT_EXISTS } = require('./../../utils/errors');

module.exports = (req, res, next) => {

	// Extract parameters
	const { userId } = req.params;
    
    // Get user list
    return User
		.findById(userId, '_id name books')
        .populate('books.past._id', 'name')
		.populate('books.present._id', 'name')
		.lean()
		.then(user => {

			// User not exists
			if (!user) return Promise.reject(USER_NOT_EXISTS);

			// Modify user
			user.books.past = user.books.past.map(book => ({
				...book._id,
				score: book.score
			}))
			user.books.present = user.books.present.map(book => ({
				...book._id
			}))

			// Return user
			return user;

		})
		// Success
        .then(user => next({
			data: user,
            message: `User fetched`,
            status: RESPONSE_STATUS.SUCCESS
		}))
		// Error
        .catch(error => next({
			data: error,
			message: `Failed while fetching user`,
			status: RESPONSE_STATUS.FAIL
		}));
    
};

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags:
 *       - User
 *     description: Get user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/definitions/userDetailed'
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