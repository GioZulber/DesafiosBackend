const ContainerMongo = require('../../containers/ContainerMongoDb');
const userSchema = require('../../schema/userSchema');
const { infoLog, errorLog, warnLog } = require('../../utils/loggers/winston');

class UsersMongo extends ContainerMongo {
	constructor() {
		super(userSchema, 'users');
	}

	getUsername = async (username) => {
		try {
			if (!username) {
				warnLog.warn('Username is empty');
				return null;
			}
			const user = await this.model.findOne({ username: username });
			return user;
		} catch (error) {
			errorLog.error(error);
		}
	};
	createUser = async (user) => {
		try {
			const newUser = {
				email: user.email,
				username: user.username,
				password: user.password,
			};
			const addUser = await this.model.create(newUser);
			infoLog.info(addUser);
		} catch (error) {
			errorLog.error(error);
		}
	};
}

module.exports = UsersMongo;
