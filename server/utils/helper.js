module.exports = {

    // Defines routes with controllers
    defineRoutes: (routes, routeName) => {

        // Define router
        const router = require('express').Router();

        // Create all routes
        routes.forEach(endpoint => {

            // Set handlers
            let handlers = endpoint.handlers;

            // Set controller
            router[endpoint.type](endpoint.path, handlers, 
                require(`./../controllers/${routeName}/${endpoint.controller}`));
            
        });

        // Return router
        return router;

    }

}