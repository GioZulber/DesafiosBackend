const JWT = require('../utils/jwt/jwt');
const User = require('../components/auth/services/userServiceMongo');

const verifyToken = async (ctx, next) => {
	try {
		const token = await ctx.get('Authorization');

		// console.log(authHeader);

		console.log(token);
		if (!token) return (ctx.body = { status: 401, error: 'No token provided' });

		const decoded = await JWT.verifyToken(token);

		ctx.request.id = decoded.id;

		const user = await User.findUser(ctx.request.id);

		if (!user) return (ctx.body = { status: 401, error: 'User not found' });

		await next();
	} catch (error) {
		console.log(error);
		return (ctx.body = { message: 'Invalid token' });
	}
};

const isAdmin = async (ctx, next) => {
	try {
		const user = await User.findUser(ctx.request.id);
		const { role } = user;
		if (role !== 'admin') return (ctx.body = { stats: '400', error: 'You are not admin' });
		await next();
	} catch (error) {
		console.log(error);
		return (ctx.body = { message: 'Invalid token' });
	}
};

module.exports = {
	verifyToken,
	isAdmin,
};
