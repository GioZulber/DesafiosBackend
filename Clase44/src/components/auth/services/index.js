const { config } = require('../../../config/index');

switch (config.database) {
	case 'MYSQL': {
		module.exports = require('./userServicesMySql');
		break;
	}
	case 'MONGO': {
		module.exports = require('./userServicesMongo');
		break;
	}
	case 'FS': {
		module.exports = require('./userServicesFs');
		break;
	}
}
