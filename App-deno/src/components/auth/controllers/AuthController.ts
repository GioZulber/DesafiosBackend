import { Context, verify } from '../../../config/deps.ts';
import { createHash, isValidPassword } from '../../../utils/bcrypt/bcrypt.ts';
import { UserBody, UserInt } from '../schema/user.ts';

class User {
	async getUser(ctx: Context) {
		try {
			const token = ctx.request.headers.get('Authorization');

			const decoded = token ? await verify(token, 'secret') : null;
			const user = await UserService.getUser(decoded.id);
		} catch (error) {
			console.log(error);
		}
	}
	async register(ctx: Context) {
		try {
			const { name, password, email, address, phone, age, avatar }: UserBody =
				await ctx.request.body().value;

			const user = await UserService.findUser(email);

			if (user) {
				ctx.response.status = 400;
				ctx.response.body = {
					error: 'User already exists',
				};
			} else {
				const hash = createHash(password);

				const newUser: UserBody = {
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
				await UserService.createUser(newUser);
			}
		} catch (error) {
			console.log(error);
		}
	}
	async login(ctx: Context) {
		try {
			const { email, password } = await ctx.request.body().value;

			const user: UserInt = await UserService.findUser(email);

			if (!user) return (ctx.response.body = { status: 401, message: 'User not found' });

			const matchPassword = await isValidPassword(password, user.password);

			if (!matchPassword)
				return (ctx.response.body = {
					status: 401,
					message: 'Wrong password',
					token: null,
				});

			const userForToken = { id: user.id };

			const token = await jwt.generateToken(userForToken);

			ctx.response.body = {
				status: 200,
				token,
			};
		} catch (error) {
			console.log(error);
		}
	}
}

export default new User();
