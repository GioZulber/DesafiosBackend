let minimist = require('minimist');
let args = minimist(process.argv.slice(2));
let { errorLog, infoLog, warnLog } = require('../utils/loggers/winston');
const ProductModel = require('../models/index').productModel;

let productModel = new ProductModel();

const getHome = async (req, res) => {
	try {
		infoLog.info(req.session.passport);
		// res.render('home');
		if (req.session.passport.user) {
			let data = {
				user: req.session.passport.user.username,
			};
			res.render('home', { data: data });
		} else {
			res.redirect('/register');
		}
	} catch (error) {
		errorLog.error(error);
	}
};

const getRegister = async (req, res) => {
	try {
		if (!req.session.passport) {
			warnLog.warn('No hay sesion');
			res.render('register');
		} else {
			res.redirect('/');
		}
	} catch (error) {
		errorLog.error(error);
	}
};

const getLogin = async (req, res) => {
	try {
		res.render('login');
	} catch (error) {
		errorLog.error(error);
	}
};

const getProducts = (req, res) => {
	try {
		if (req.session.passport.user) {
			let data = {
				user: req.session.passport.user.username,
			};
			let products = productModel.getProducts(10);
			res.render('products', { products: products, data: data });
		}
	} catch (error) {
		errorLog.error(error);
	}
};

const getErrorLogin = async (req, res) => {
	try {
		errorLog.error('Error al ingresar usuario o contraseña');

		res.render('errorLogin', { error: 'Contraseña o nombre incorrecto' });
	} catch (error) {
		errorLog.error(error);
	}
};

const getErrorRegister = async (req, res) => {
	try {
		errorLog.error('Error al registrar usuario');
		res.render('errorRegister', { error: 'Ese nombre de usuario ya existe' });
	} catch (error) {
		errorLog.error(error);
	}
};

const getInfo = async (req, res) => {
	try {
		infoLog.info(args._);
		let data = {
			// user: req.session.passport.user.username,
			entryArgs: process.argv,
			platformName: process.platform,
			nodeVersion: process.version,
			memoryRss: process.memoryUsage().rss,
			path: process.execPath,
			processId: process.pid,
			folder: process.cwd(),
		};
		res.render('info', { data: data });

		// if (req.session.passport.user) {
		// 	infoLog.info(args);
		// 	let data = {
		// 		user: req.session.passport.user.username,
		// 		entryArgs: process.argv,
		// 		platformName: process.platform,
		// 		nodeVersion: process.version,
		// 		memoryRss: process.memoryUsage().rss,
		// 		path: process.execPath,
		// 		processId: process.pid,
		// 		folder: process.cwd(),
		// 	};
		// 	res.render('info', { data: data });
		// }
	} catch (error) {
		errorLog.error(error);
	}
};

module.exports = {
	getHome,
	getProducts,
	getRegister,
	getLogin,
	getErrorLogin,
	getErrorRegister,
	getInfo,
};
