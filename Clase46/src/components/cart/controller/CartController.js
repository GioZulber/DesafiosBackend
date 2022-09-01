const CartService = require('../services/cartServiceMongo');
const Users = require('../../auth/services/userServiceMongo');
const jwt = require('../../../utils/jwt/jwt');
const { sendOrderConfirm } = require('../../../utils/nodemailer/nodemailer');
const { sendTwilioOrderConfirm } = require('../../../utils/twilio/twilio');

class CartController {
	async setCart(ctx) {
		try {
			const { userId } = ctx.request.body;

			const newCart = await CartService.setCart(userId);
			ctx.body = {
				status: 200,
				message: 'Cart agregado',
				newCart,
			};
		} catch (error) {
			console.log(error);
		}
	}
	async deleteCart(ctx) {
		try {
			const { cid } = ctx.params;
			const deletedCart = await CartService.deleteCart(cid);
			if (cid) {
				ctx.body = {
					status: 200,
					message: 'Carrito eliminado',
					deletedCart,
				};
			} else {
				ctx.body = {
					status: 400,
					message: 'Cart inexistente',
				};
			}
		} catch (error) {
			console.log(error);
		}
	}
	async getCartProducts(ctx) {
		try {
			const { cid } = ctx.params;
			const cartProducts = await CartService.getCartProducts(cid);
			if (cid) {
				ctx.body = {
					status: 200,
					message: 'Productos en el carrito',
					products: cartProducts,
				};
			}
		} catch (error) {
			console.log(error);
		}
	}
	async setProductToCart(ctx) {
		try {
			const { cid } = ctx.params;
			const product = ctx.request.body;
			const newProduct = await CartService.setProductToCart(cid, product);
			if (cid) {
				ctx.body = {
					status: 200,
					message: 'Producto agregado',
					newProduct: newProduct,
				};
			} else {
				ctx.body = {
					status: 400,
					message: 'Cart inexistente',
				};
			}
		} catch (error) {
			console.log(error);
		}
	}
	async deleteProductInCart(ctx) {
		try {
			const { cid, pid } = ctx.params;

			const deletedProduct = await CartService.deleteProductFromCart(cid, pid);

			if (cid && pid) {
				ctx.body = {
					status: 200,
					message: 'Producto eliminado',
					deletedProduct: deletedProduct,
				};
			} else {
				ctx.body = {
					status: 400,
					message: 'Cart inexistente',
				};
			}
		} catch (error) {
			console.log(error);
		}
	}
	async confirmCartOrder(ctx) {
		try {
			const { cid } = ctx.request.params;
			const token = ctx.headers.authorization;
			const cart = await CartService.getCart(cid);
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
				ctx.body = {
					status: 200,
					message: 'Pedido confirmado.',
				};
			} else {
				ctx.body = {
					status: 400,
					message: 'Ocurrio un error al confirmar su pedido',
				};
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new CartController();
