const fs = require('fs');
const { app } = require('./../../server');
const testConfig = require('./../../config/test.config');
const commonSeed = require('./../seeds/common.seed');
const { resetDb } = require('./../utils/helper');

describe('BOOKS ROUTE', () => {

    beforeEach(resetDb);
    beforeEach(commonSeed.populateTables);

    const filterTests = testConfig.functionFilter.map(item => item + '.js');

    let routePrefix = 'books';

    // Read each test file
    fs
        .readdirSync(__dirname + '/../controllers/books')
        .forEach(file => {
            if (filterTests.length === 0 || filterTests.includes(file))
                require(__dirname + '/../controllers/books/' + file)(app, routePrefix);
        });

});