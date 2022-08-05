const Validate = require('../../../utils/validate');
const { config } = require('../../../config/index');
const usersServices = require('../services/usersServices');
const JWT = require('../../../utils/jwt');
const { sendEmailRegister } = require('../../../utils/nodemailer');
const { sendTwilioRegister } = require('../../../utils/twilio');

const getUser = async (req, res) => {
	try {
		const token = req.headers.authorization;

		const decoded = await JWT.verifyToken(token, config.secret_key);

		const user = await usersServices.findUser(decoded.email);

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

			const userForToken = { name: name, email: email };

			const token = await JWT.generateToken(userForToken);

			await sendEmailRegister(newUser.name);
			await sendTwilioRegister(newUser.name);

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

		const token = await JWT.generateToken(userForToken);

		return res.json({ token });
	} catch (error) {
		console.log(error);
	}
};

const getLogout = async (req, res) => {
	try {
		return res.status(200).json({ message: 'Logout' });
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
