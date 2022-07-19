const ContainerMongo = require('../../../containers/ContainerMongoDb');
const userSchema = require('../schema/userSchema');

class UsersMongo extends ContainerMongo {
	constructor() {
		super(userSchema, 'users');
	}

	findUser = async (email) => {
		return await this.model.findOne({ email: email }, { password: 0, __v: 0 });
	};

	findUserCompare = async (email) => {
		try {
			const emailUser = await this.model.findOne({ email: email });
			return emailUser;
		} catch (error) {
			console.log(error);
		}
	};
	createUser = async (user) => {
		try {
			const addUser = await this.model.create(user);
			return addUser;
		} catch (error) {
			console.log(error);
		}
	};
}

module.exports = UsersMongo;
