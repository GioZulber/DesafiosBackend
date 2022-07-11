const { config } = require('../config/index');
let productModel = require('./products/productTest.js');

let userModel;

switch (config.database) {
	case 'mongo': {
		console.log('MongoDB');
		userModel = require('./users/usersMongo.js');
		break;
	}
	default: {
		console.log('Default');
		userModel = require('./usersMongo.js');
		break;
	}
}

module.exports = {
	userModel,
	productModel,
};
