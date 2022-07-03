const passport = require('passport');
const { infoLog, errorLog } = require('../utils/loggers/winston');
const register = passport.authenticate('register', {
	failureRedirect: '/errorRegister',
	successRedirect: '/',
});

const login = passport.authenticate('login', {
	failureRedirect: '/errorLogin',
	successRedirect: '/',
});

const getLogout = async (req, res) => {
	try {
		infoLog.info('Logout');
		const user = req.session.passport.user.username;
		const data = {
			user: user,
		};
		req.session.destroy((err) => {
			if (err) res.send(JSON.stringify(err));
		});
		res.render('logout', { data: data });
	} catch (error) {
		errorLog.error(error);
	}
};

module.exports = {
	login,
	register,
	getLogout,
};
