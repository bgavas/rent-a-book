const { User } = require('./../../models/user');
const { RESPONSE_STATUS } = require('./../../utils/constants');

module.exports = (req, res, next) => {
    
    // Get user list
    return User
        .find({}, '_id name')
		// Success
        .then(users => next({
			data: users,
            message: `Users fetched`,
            status: RESPONSE_STATUS.SUCCESS
		}))
		// Error
        .catch(error => next({
			data: error,
			message: `Failed while fetching users`,
			status: RESPONSE_STATUS.FAIL
		}));
    
};

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - User
 *     description: Get user list
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/definitions/user'
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