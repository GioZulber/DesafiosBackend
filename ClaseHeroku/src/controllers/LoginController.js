const passport = require('passport');

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
		console.log('entro a logout');
		const user = req.session.passport.user.username;
		const data = {
			user: user,
		};
		req.session.destroy((err) => {
			if (err) res.send(JSON.stringify(err));
		});
		res.render('logout', { data: data });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	login,
	register,
	getLogout,
};
