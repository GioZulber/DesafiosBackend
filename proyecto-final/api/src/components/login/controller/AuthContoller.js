const Validate = require('../../../utils/validate');
const JWT = require('jsonwebtoken');
const { config } = require('../../../config/index');
const UsersMongo = require('../services/usersServices');

const usersServices = new UsersMongo();

const register = async (req, res) => {
	try {
		const { name, password, email, address, phone, age, avatar } = req.body;

		const user = await usersServices.findUser(email);

		if (user) {
			res.send(JSON.stringify({ error: 'email already exists' }));
		} else {
			const hash = Validate.createHash(password);
			const newUser = {
				name,
				password: hash,
				email,
				address,
				phone,
				age,
				avatar,
			};
			if (name === 'admin' && email === 'admin@gmail.com') {
				newUser.role = 'admin';
			} else {
				newUser.role = 'user';
			}
			await usersServices.createUser(newUser);

			const token = JWT.sign({ name: name }, config.secret_key, { expiresIn: '24h' });
			// const userAdded = await usersServices.findUser(email);

			return res.status(200).json({ token });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await usersServices.findUser(email);
		if (!user) return res.status(401).json({ error: 'User not found' });

		const matchPassword = await Validate.isValidPassword(password, user.password);

		if (!matchPassword) return res.status(401).json({ token: null, message: 'Wrong password' });

		const token = JWT.sign({ name: user.name }, config.secret_key, { expiresIn: '24h' });
		return res.json({ token });
	} catch (error) {
		console.log(error);
	}
};

const getLogout = async (req, res) => {
	try {
		console.log('entro a logout');

		// console.log(req.headers['x-access-token']);
		// JWT.verify(req.headers['x-access-token'], config.secret_key);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	login,
	register,
	getLogout,
};
