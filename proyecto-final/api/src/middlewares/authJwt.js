const JWT = require('jsonwebtoken');
const UsersMongo = require('../components/auth/services/usersServices');
const { config } = require('../config/index');

const User = new UsersMongo();
const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers['x-access-token'];
		if (!token) return res.status(401).json({ error: 'No token provided' });

		const decoded = JWT.verify(token, config.secret_key);
		console.log(decoded);
		req.userEmail = decoded.email;
		const user = await User.findUserCompare(req.userEmail);

		if (!user) return res.status(401).json({ error: 'User not found' });

		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ message: 'Invalid token' });
	}
};

const isAdmin = async (req, res, next) => {
	try {
		const user = await User.findUserCompare(req.userEmail);
		const { role } = user;
		if (role !== 'admin') return res.status(401).json({ error: 'You are not admin' });
		next();
	} catch (error) {}
};

module.exports = {
	verifyToken,
	isAdmin,
};
