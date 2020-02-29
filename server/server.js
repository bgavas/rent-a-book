// Get configuration
require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public'));

// Listen requests
app.listen(port, () => {
	console.log(`App started on port ${port}`);
});

// Export for testing
module.exports = { app };