let { infoLog, errorLog } = require('../utils/loggers/winston');
let isLogin = (req, res, next) => {
	try {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/register');
		}
	} catch (error) {
		errorLog.error(error);
	}
};

let isNotLogin = (req, res, next) => {
	try {
		if (!req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/register');
		}
	} catch (error) {
		errorLog.error(error);
	}
};

module.exports = {
	isLogin,
	isNotLogin,
};
