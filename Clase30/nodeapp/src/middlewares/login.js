let isLogin = (req, res, next) => {
	try {
		if (req.isAuthenticated()) {
			console.log('entro a login');
			return next();
		} else {
			res.redirect('/register');
		}
	} catch (error) {
		console.log(error);
	}
};

let isNotLogin = (req, res, next) => {
	try {
		if (!req.isAuthenticated()) {
			console.log('entro a not login');
			return next();
		} else {
			res.redirect('/register');
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	isLogin,
	isNotLogin,
};
