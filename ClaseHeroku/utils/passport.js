const Validate = require('./validate');
const UsersMongo = require('../models/users/usersMongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Instance = new UsersMongo();

passport.use(
	'register',
	new LocalStrategy(
		{
			usernameField: 'name',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, username, password, done) => {
			try {
				const user = await Instance.getUsername(username);
				if (user) return done(null, false, { message: 'User already exists' });
				const hash = Validate.createHash(password);
				const newUser = {
					email: req.body.email,
					username: username,
					password: hash,
				};
				await Instance.createUser(newUser);
				return done(null, newUser);
			} catch (error) {
				console.log(error);
				return done(error);
			}
		}
	)
);

passport.use(
	'login',
	new LocalStrategy(
		{
			usernameField: 'name',
			passwordField: 'password',
		},
		async (username, password, done) => {
			try {
				let errors = [];
				const user = await Instance.getUsername(username);
				if (!user) {
					errors.push({ message: 'User not found' });
					return done(null, false, { message: 'User not found' });
				}

				const match = await Validate.isValidPassword(password, user.password);
				if (!match) {
					errors.push({ message: 'Password incorrect' });
					return done(null, false, { message: 'Wrong password' });
				}
				return done(null, user);
			} catch (error) {
				console.log(error);
			}
		}
	)
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
