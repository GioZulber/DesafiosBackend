const ContainerMongo = require('../../containers/ContainerMongoDb');
const userSchema = require('../../schema/userSchema');

class UsersMongo extends ContainerMongo {
	constructor() {
		super(userSchema, 'users');
	}

	getUsername = async (username) => {
		try {
			const user = await this.model.findOne({ username: username });
			return user;
		} catch (error) {
			console.log(error);
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
			console.log(addUser);
		} catch (error) {
			console.log(error);
		}
	};
}

module.exports = UsersMongo;
