const bcrypt = require('bcrypt');

// class Validate {

// 	isValidPassword(password, userPassword) {
// 		const match = await bcrypt.compare(password, userPassword);
// 		return match;
// 	}

// 	createHash(password) {
// 		const hasheada = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
// 		return hasheada
// 	}

// }

// module.exports = new Validate();

const isValidPassword = async (password, userPassword) => {
	const match = await bcrypt.compare(password, userPassword);
	return match;
};

const createHash = (password) => {
	const hasheada = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
	return hasheada;
};

module.exports = {
	isValidPassword,
	createHash,
};
