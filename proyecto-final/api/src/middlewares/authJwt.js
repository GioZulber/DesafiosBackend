const JWT = require('../utils/jwt');
const User = require('../components/auth/services/usersServices');

const verifyToken = async (req, res, next) => {
	try {
		const token = await req.headers.authorization;

		if (!token) return res.status(401).json({ error: 'No token provided' });

		const decoded = await JWT.verifyToken(token);

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
	} catch (error) {
		console.log(error);
		return res.status(401).json({ message: 'Invalid token' });
	}
};

module.exports = {
	verifyToken,
	isAdmin,
};
