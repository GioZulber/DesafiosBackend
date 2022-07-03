const fs = require('fs');
const { infoLog, errorLog } = require('../utils/loggers/winston');

class ContainerFiles {
	constructor(path) {
		this.path = path;
	}
	getData = async () => {
		try {
			if (fs.existsSync(this.path)) {
				let data = await fs.promises.readFile(this.path, 'utf8');
				return await JSON.parse(data);
			} else {
				return { id: 'mensajes', mensajes: [] };
			}
		} catch (error) {
			winston.error(error);
		}
	};
	setData = async (data) => {
		try {
			await fs.promises.writeFile(this.path, JSON.stringify(data, null, '\t'));
			infoLog.info('Data saved');
		} catch (error) {
			errorLog.error(error);
		}
	};
}

module.exports = ContainerFiles;
