const helper = require('./../utils/helper');

// Define routes
const routes = [{
    controller: 'createBook',
    description: 'Create a book',
    handlers: [],
    path: '/',
    type: 'post'
}, {
    controller: 'getBooks',
    description: 'Get book list',
    handlers: [],
    path: '/',
    type: 'get'
}, {
    controller: 'getBook',
    description: 'Get book',
    handlers: [],
    path: '/:bookId',
    type: 'get'
}];


// Export route
module.exports = helper.defineRoutes(routes, 'books');