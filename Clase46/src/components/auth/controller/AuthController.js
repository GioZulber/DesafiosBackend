const Validate = require('../../../utils/bcrypt/validate');
const { config } = require('../../../config/index');
const UserServices = require('../services/userServiceMongo');
const jwt = require('../../../utils/jwt/jwt');
const { sendEmailRegister } = require('../../../utils/nodemailer/nodemailer');
const { sendTwilioRegister } = require('../../../utils/twilio/twilio');

class AuthController {
	async getUser(ctx) {
		try {
			const token = ctx.get('Authorization');
			console.log(token);
			const decoded = await jwt.verifyToken(token, config.secret_key);

			const user = await UserServices.findUser(decoded.id);

			if (!user)
				return (ctx.body = {
					status: 400,
					message: 'User not found',
				});

			return (ctx.body = user);
		} catch (error) {
			console.log(error);
		}
	}
	async register(ctx) {
		try {
			const { name, password, email, address, phone, age, avatar } = ctx.request.body;

			const user = await UserServices.findUserCompare(email);

			const lastId = await UserServices.model.findOne({}, {}, { sort: { userId: -1 } });

			const id = lastId ? lastId.userId + 1 : 1;

			if (user) {
				ctx.body = {
					status: 400,
					message: 'Email already exists',
				};
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
				await UserServices.createUser(newUser);
				const userForToken = { id: id };

				const token = await jwt.generateToken(userForToken);

				await sendEmailRegister(newUser.name);
				await sendTwilioRegister(newUser.name);

				ctx.body = {
					status: 200,
					token,
				};
			}
		} catch (error) {
			console.log(error);
		}
	}
	async login(ctx) {
		try {
			const { email, password } = ctx.request.body;

			const user = await UserServices.findUserCompare(email);

			if (!user) return (ctx.body = { status: 401, message: 'User not found' });

			const matchPassword = await Validate.isValidPassword(password, user.password);

			if (!matchPassword)
				return (ctx.body = { status: 401, message: 'Wrong password', token: null });

			const userForToken = { id: user.userId };

			const token = await jwt.generateToken(userForToken);

			ctx.body = {
				status: 200,
				token,
			};
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new AuthController();
