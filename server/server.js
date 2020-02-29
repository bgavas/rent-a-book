// Get configuration
require('./config/config.js');
// Connect to db
require('./db/connectDb');

const express = require('express');
const bodyParser = require('body-parser');
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

// Create endpoints
Object.keys(routes).forEach(key => {
    app.use(`/` + key, routes[key]);
});

// Result handler
app.use(expressResult);

// Listen requests
app.listen(port, () => {
	console.log(`App started on port ${port}`);
});

// Export for testing
module.exports = { app };