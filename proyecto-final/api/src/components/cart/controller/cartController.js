const CartsModel = require('../services/cartServices');
const Users = require('../../auth/services/usersServices');
const jwt = require('../../../utils/jwt');
const { sendOrderConfirm } = require('../../../utils/nodemailer');
const { sendTwilioOrderConfirm } = require('../../../utils/twilio');

const getCarts = async (req, res) => {
	try {
		// 		const id = req.params.uid;
		// 		const token = req.headers.authorization;
		// 		if (token) {
		// 			console.log('-------------------------------------------');
		// 			const decoded = await jwt.verifyToken(token);
		// 			const getUser = await Users.findUser(decoded.email);
		// 			console.log('-------------------------------------------');
		// 			console.log(id);
		// 			console.log('-------------------------------------------');
		// 			console.log(getUser.id + '-------------------------------------------');
		// 			if (getUser.id == id) {
		// 				console.log('holaaaaaaaaaaaaaaaa');
		// 				const carts = await CartsModel.getCart(id);
		// 				console.log(carts);
		// 				return res.status(200).json({
		// 					carts: carts,
		// 				});
		// 			}
		// 		}
	} catch (error) {
		console.log(error);
	}
};

const setCart = async (req, res) => {
	try {
		const { userId } = req.body;

		const newCart = await CartsModel.setCart(userId);
		res.status(200).send({
			message: 'Cart agregado',
			newCart: newCart,
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteCart = async (req, res) => {
	try {
		const id = req.params.cid;
		const deletedCart = await CartsModel.deleteCart(id);
		if (id) {
			res.status(200).send({
				message: 'Cart eliminado',
				deletedCart: deletedCart,
			});
		} else {
			res.status(400).send({
				message: 'El id del cart no puede ser nulo',
			});
		}
	} catch (error) {
		console.log(error);
	}
};
const getCartProducts = async (req, res) => {
	try {
		const id = req.params.cid;
		const productsCart = await CartsModel.getCartProducts(id);
		if (id) {
			res.status(200).send({
				message: 'Productos en el carrito',
				products: productsCart,
			});
		} else {
			res.status(400).send({
				message: 'El id del cart no puede ser nulo',
			});
		}
	} catch (error) {
		console.log(error);
	}
};

const setProductToCart = async (req, res) => {
	try {
		const id = req.params.cid;
		const product = req.body;
		const newProduct = await CartsModel.setProductToCart(id, product);
		if (id) {
			res.status(200).send({
				message: 'Producto agregado',
				newProduct: newProduct,
			});
		} else {
			res.status(400).send({
				message: 'El id del producto no puede ser nulo',
			});
		}
	} catch (error) {
		console.log(error);
	}
};

const deleteProductFromCart = async (req, res) => {
	try {
		const cid = req.params.cid;
		const pid = req.params.pid;

		const deletedProduct = await CartsModel.deleteProductFromCart(cid, pid);
		if (cid && pid) {
			res.status(200).send({
				message: 'Producto eliminado',
				deletedProduct: deletedProduct,
			});
		} else {
			res.status(400).send({
				message: 'El id del producto no puede ser nulo',
			});
		}
	} catch (error) {
		console.log(error);
	}
};

const confirmCartOrder = async (req, res) => {
	try {
		const cid = req.params.cid;
		const token = req.headers.authorization;
		const cart = await CartsModel.getCart(cid);
		const decoded = await jwt.verifyToken(token);
		const user = await Users.findUser(decoded.email);

		if (cart) {
			const order = cart.products.map((product) => product.title);
			const total = cart.products.reduce((acc, product) => {
				return acc + product.price;
			}, 0);

			const bodyMail = `<h1>El usuario ${user.name} confirmo el pedido ${order}, con un total de $${total}.</h1>`;
			const bodyTwilio = `El usuario ${user.name} confirmo el pedido ${order}, con un total de $${total}.`;
			await sendOrderConfirm(bodyMail);
			await sendTwilioOrderConfirm(bodyTwilio);
			res.status(200).send({
				message: 'Pedido confirmado',
			});
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getCarts,
	setCart,
	deleteCart,
	getCartProducts,
	setProductToCart,
	deleteProductFromCart,
	confirmCartOrder,
};
