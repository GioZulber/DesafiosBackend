const ContainerMongo = require('../../../containers/ContainerMongoDb');
const userSchema = require('../schema/userSchema');

class UsersMongo extends ContainerMongo {
	constructor() {
		super(userSchema, 'users');
	}

	findUser = async (email) => {
		try {
			return await this.model.findOne({ email: email }, { password: 0, __v: 0 });
		} catch (error) {
			console.log(error);
		}
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
			let lastId = await this.model.findOne({}, {}, { sort: { id: -1 } });
			let id = lastId ? Number(lastId.id) + 1 : 1;
			let newUser = new this.model({
				id: id,
				...user,
			});
			const addUser = await this.model.create(newUser);
			return addUser;
		} catch (error) {
			console.log(error);
		}
	};
}

module.exports = new UsersMongo();
