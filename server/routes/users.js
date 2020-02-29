const helper = require('./../utils/helper');

// Define routes
const routes = [{
    controller: 'createUser',
    description: 'Create a user',
    handlers: [],
    path: '/',
    type: 'post'
}, {
    controller: 'getUsers',
    description: 'Get user list',
    handlers: [],
    path: '/',
    type: 'get'
}];


// Export route
module.exports = helper.defineRoutes(routes, 'users');