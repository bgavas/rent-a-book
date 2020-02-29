const { ENVIRONMENT } = require('./../util/constant');

let env = process.env.NODE_ENV || ENVIRONMENT.DEVELOPMENT;
process.env.NODE_ENV = env;

let config = require('./config.json');
let envConfig = config[env];

Object.keys(envConfig).forEach((key) => {
	process.env[key] = envConfig[key];
});