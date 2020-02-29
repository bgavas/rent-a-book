const { RESPONSE_STATUS } = require('./../utils/constants');
const errors = require('./../utils/errors');
const logger = require('../utils/logger');

let expressResult = (result, req, res, next) => {

	// console.log(result);

	// If headers set before skip
    if (res.headersSent) {
		logger.error("Internal servor error. Error: Headers sent.");
		return res.status(500).send({
			code: errors.INTERNAL_SERVER_ERROR.code,
			message: errors.INTERNAL_SERVER_ERROR.message[req.language]
		});
	} else if (!result) { // The result didn't come for any reason
		logger.error("Internal servor error. Error: " + result);
		return res.status(500).send({
			code: errors.INTERNAL_SERVER_ERROR.code,
			message: errors.INTERNAL_SERVER_ERROR.message[req.language]
		});
	}

	const data = result.data;

	// SUCCESS

	// Was it a successful process?
	if (result.status === RESPONSE_STATUS.SUCCESS) {

		// Set headers if exists
		if (result.headers) res.header(result.headers);

		// Log warning
		logger.info(JSON.stringify(result, null, 2));

		// Return success
		return res.status(200).send(data);

	}

	// ERROR

	// Is there error object?
    if (data) {

		// Find the error
		const err = Object.values(errors).find(item => item.code === data.code);
		let returnObject;

		// Known error
		if (err) returnObject = { code: err.code, message: err.message[req.language] };
		// Unknown error
		else returnObject = { code: errors.UNKNOWN.code, message: errors.UNKNOWN.message[req.language] };

		// Log warning
		logger.warn((result.data.stack ? result.data.stack : '') + '\n' + JSON.stringify(returnObject, null, 2));

		// Error
		return res.status(400).send(returnObject);

    } else {

		// Unknown error
		let returnObject = { code: errors.INTERNAL_SERVER_ERROR.code, message: errors.INTERNAL_SERVER_ERROR.message[req.language] };

		// Log error
		logger.error(result.stack + '\n' + JSON.stringify(returnObject, null, 2));
		
        // Unknown error
		return res.status(500).send(returnObject);

	}

};

// Export
module.exports = { expressResult };
