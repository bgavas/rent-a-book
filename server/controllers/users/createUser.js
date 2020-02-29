const validator = require('validator');
const { User } = require('./../../models/user');
const { RESPONSE_STATUS } = require('./../../utils/constants');
const { INCORRECT_REQUEST_PARAMETERS, USER_ALREADY_EXISTS } = require('./../../utils/errors');

module.exports = (req, res, next) => {

    // Extract parameters
    const { name } = req.body;

	// Check request parameters
	if (validator.isEmpty(name)) {
		return next({
            data: INCORRECT_REQUEST_PARAMETERS,
			message: `Failed while creating user`,
            status: RESPONSE_STATUS.FAIL
        });
    }
    
    // Check if there is a user with this name
    return User
        .findOne({ name }, '_id')
        .then(user => {

            // This user already exists
            if (user) return Promise.reject(USER_ALREADY_EXISTS);

            // Create user
            return User.create({ name });

        })
		// Success
        .then(user => next({
			data: {},
            message: `User (${user._id}) is created`,
            status: RESPONSE_STATUS.SUCCESS
		}))
		// Error
        .catch(error => next({
			data: error,
			message: `Failed while creating user`,
			status: RESPONSE_STATUS.FAIL
		}));
    
};

/**
 * @swagger
 * definition:
 *   newUser:
 *     properties:
 *       name:
 *         type: string
 *     example: {
 *       "name": "Ahmet Can"
 *     }
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - User
 *     description: Create new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: newUser
 *         description: User object
 *         in: body
 *         schema:
 *           $ref: '#/definitions/newUser'
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