const helper = require('./../utils/helper');

// Define routes
const routes = [
    {
        controller: 'create',
        description: 'Create a user',
        handlers: [],
        path: '/',
        type: 'post'
    }
];


// Export route
module.exports = helper.defineRoutes(routes, 'users');