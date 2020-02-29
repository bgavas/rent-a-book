// Get configuration
require('./config/config.js');
// Connect to db
require('./db/connectDb');

const express = require('express');
const bodyParser = require('body-parser');
const constants = require('./utils/constants');

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize swagger
require('./utils/swagger')(app);

// Listen requests
app.listen(port, () => {
	console.log(`App started on port ${port}`);
});

// Export for testing
module.exports = { app };