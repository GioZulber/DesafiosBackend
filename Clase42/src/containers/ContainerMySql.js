const { pool } = require('../config/mysqlConnection');

class ContainerMySql {
	constructor() {
		this.pool = pool;
	}

	// async getData() {}
}

module.exports = ContainerMySql;
