const { config } = require('../../../config/index');

switch (config.database) {
	// case 'MYSQL': {
	// 	module.exports = require('./productServiceMySql');
	// 	break;
	// }
	case 'MONGO': {
		module.exports = require('./productServicesMongo');
		break;
	}
	case 'FS': {
		module.exports = require('./productServicesFs');
		break;
	}
}
