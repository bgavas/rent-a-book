const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// swagger definition
const swaggerDefinition = {
    info: {
        title: 'Library Node Swagger API',
        version: '1.0.0',
        description: 'Library Swagger',
    },
    host: process.env.API_URL.replace('http://', '').replace('https://', ''),
    basePath: '/'
};

// Options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./server/controller/*/*/*.js']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {

    // Swagger.json get
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    // Initialize ui
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

}