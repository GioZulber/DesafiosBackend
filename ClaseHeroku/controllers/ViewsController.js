let minimist = require('minimist');
let args = minimist(process.argv.slice(2));
const ProductModel = require('../models/index').productModel;

let productModel = new ProductModel();

const getHome = async (req, res) => {
	try {
		console.log(req.session.passport.user);
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
		console.log(error);
	}
};

const getRegister = async (req, res) => {
	try {
		if (!req.session.passport) {
			res.render('register');
		} else {
			res.redirect('/');
		}
	} catch (error) {
		console.log(error);
	}
};

const getLogin = async (req, res) => {
	try {
		res.render('login');
	} catch (error) {
		console.log(error);
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
		console.log(error);
	}
};

const getErrorLogin = async (req, res) => {
	try {
		res.render('errorLogin', { error: 'Contraseña o nombre incorrecto' });
	} catch (error) {
		console.log(error);
	}
};

const getErrorRegister = async (req, res) => {
	try {
		res.render('errorRegister', { error: 'Ese nombre de usuario ya existe' });
	} catch (error) {
		console.log(error);
	}
};

const getInfo = async (req, res) => {
	try {
		console.log(args._);
		if (req.session.passport.user) {
			let data = {
				user: req.session.passport.user.username,
				entryArgs: process.argv,
				platformName: process.platform,
				nodeVersion: process.version,
				memoryRss: process.memoryUsage().rss,
				path: process.execPath,
				processId: process.pid,
				folder: process.cwd(),
			};
			res.render('info', { data: data });
		}
	} catch (error) {
		console.log(error);
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
