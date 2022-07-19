const Validate = require('../../../utils/validate');
const JWT = require('jsonwebtoken');
const { config } = require('../../../config/index');
const UsersMongo = require('../services/usersServices');

const usersServices = new UsersMongo();

const getUser = async (req, res) => {
	try {
		const { email } = req.params;

		const user = await usersServices.findUser(email);

		if (!user) return res.status(401).json({ error: 'User not found' });
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
	}
};

const register = async (req, res) => {
	try {
		const { name, password, email, address, phone, age, avatar } = req.body;

		const user = await usersServices.findUserCompare(email);

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

			const userForToken = { name: user.name, email: email };

			const token = JWT.sign(userForToken, config.secret_key, {
				expiresIn: '24h',
			});

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
		const user = await usersServices.findUserCompare(email);
		if (!user) return res.status(401).json({ error: 'User not found' });

		const matchPassword = await Validate.isValidPassword(password, user.password);

		if (!matchPassword) return res.status(401).json({ token: null, message: 'Wrong password' });

		const userForToken = { name: user.name, email: email };

		const token = JWT.sign(userForToken, config.secret_key, {
			expiresIn: '24h',
		});
		return res.json({ token });
	} catch (error) {
		console.log(error);
	}
};

const getLogout = async (req, res) => {
	try {
		// console.log(req.headers['x-access-token']);
		// JWT.verify(req.headers['x-access-token'], config.secret_key);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getUser,
	login,
	register,
	getLogout,
};
