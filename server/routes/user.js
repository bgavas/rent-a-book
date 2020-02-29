const helper = require('./../utils/helper');

// Define routes
const routes = [
    // {
    //     controller: 'search',
    //     description: 'Search records',
    //     fallbackVersion: 'v1',
    //     handlers: [],
    //     path: '/search',
    //     type: 'post',
    //     versions: ['v1']
    // }
];


// Export route
module.exports = (version) => helper.defineRoutes(routes, 'users', version);