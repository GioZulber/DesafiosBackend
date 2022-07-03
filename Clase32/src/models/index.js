const { config } = require('../config/index');
let productModel = require('./products/productTest.js');
let { infoLog } = require('../utils/loggers/winston');

let userModel;

switch (config.database) {
	case 'mongo': {
		infoLog.info('MongoDB');
		userModel = require('./users/usersMongo.js');
		break;
	}
	default: {
		infoLog.info('Default');
		userModel = require('./usersMongo.js');
		break;
	}
}

module.exports = {
	userModel,
	productModel,
};
