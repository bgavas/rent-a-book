const helper = require('./../utils/helper');

// Define routes
const routes = [, {
    controller: 'getBooks',
    description: 'Get book list',
    handlers: [],
    path: '/',
    type: 'get'
}];


// Export route
module.exports = helper.defineRoutes(routes, 'books');