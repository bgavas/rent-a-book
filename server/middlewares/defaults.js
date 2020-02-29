const { LANGUAGES, HEADER, DEFAULT_LANGUAGE } = require('./../utils/constants');

let defaults = (req, res, next) => {
	
	// Get language 
	let language = req.headers[HEADER.LANGUAGE] ? req.headers[HEADER.LANGUAGE] : null;
	if (!language || !LANGUAGES.includes(language)) {
		language = DEFAULT_LANGUAGE;
	}
	
	// Set language
	req.language = language;
	
	// next
	return next();
	
};

// Export
module.exports = defaults;