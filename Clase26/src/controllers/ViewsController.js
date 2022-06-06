const ProductModel = require('../models/index').productModel;

let productModel = new ProductModel();

const getHome = async (req, res) => {
	try {
		console.log(req.session);
		if (req.session.passport) {
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
		res.render('register');
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

module.exports = {
	getHome,
	getProducts,
	getRegister,
	getLogin,
	getErrorLogin,
	getErrorRegister,
};
