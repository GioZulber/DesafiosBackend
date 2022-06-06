const { config } = require('../config/index');
let productModel = require('./productTest.js');

let userModel;

switch (config.database) {
	case 'mongo': {
		console.log('MongoDB');
		userModel = require('./usersMongo.js');
		break;
	}
	// case 'filesystem': {
	//   console.log('Filesystem');
	//   msgModel = require('./usersFilesystem.js');
	//   break;
	// }
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
