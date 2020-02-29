// Get configuration
require('./config/config.js');
// Connect to db
require('./db/connectDb');

const express = require('express');
const bodyParser = require('body-parser');
const { AVAILABLE_VERSIONS } = require('./utils/constants');
const routes = require('./routes');
const middlewareDefaults = require('./middlewares/defaults');
const { expressResult } = require('./middlewares/expressResult');

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize swagger
require('./utils/swagger')(app);

// Middleware defaults
app.use(middlewareDefaults);

// Define routes
Object.keys(routes).forEach(function (key) {
    // Versioning
    AVAILABLE_VERSIONS.forEach((version) => {
        app.use(`/api/${version}/` + key, routes[key](version));
    });
});

// Result handler
app.use(expressResult);

// Listen requests
app.listen(port, () => {
	console.log(`App started on port ${port}`);
});

// Export for testing
module.exports = { app };