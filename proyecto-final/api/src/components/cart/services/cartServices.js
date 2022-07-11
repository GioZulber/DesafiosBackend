const ContenedorMongo = require('../../../containers/ContainerMongoDb');
const cartSchema = require('../schema/cartSchema');

class CartsDaoMongo extends ContenedorMongo {
	constructor() {
		super(cartSchema, 'carts');
	}
	getCart = async (id) => {
		try {
			let data = await this.model.findOne({ id: id });
			if (data === null) {
				return { message: 'No se encontro el carrito', data: null };
			} else {
				return data;
			}
		} catch (error) {
			console.log(`Could not get cart: ${error}`);
		}
	};
	setCart = async () => {
		try {
			let lastId = await this.model.findOne({}, {}, { sort: { id: -1 } });
			let id = lastId ? Number(lastId.id) + 1 : 1;
			let date = new Date();
			const set = await this.model.create({
				id: id,
				timestamp: date,
				products: [],
			});
			return set;
		} catch (error) {
			console.log(`Could not set cart: ${error}`);
		}
	};
	deleteCart = async (id) => {
		try {
			let res = await this.model.deleteOne({ id });
			return res;
		} catch (error) {
			console.log(`Could not delete cart: ${error}`);
		}
	};
	getCartProducts = async (id) => {
		try {
			let data = await this.getCart(id);
			if (id) {
				return data.products;
			} else {
				return data;
			}
		} catch (error) {
			console.log(`Could not get cart products: ${error}`);
		}
	};

	setProductToCart = async (cid, product) => {
		try {
			let cart = await this.getCart(cid);

			let id = cart.products.length > 0 ? cart.products[cart.products.length - 1].id + 1 : 1;
			console.log(id);
			if (cart) {
				let isInCart = cart.products.some((prod) => prod.id === Number(product.id));
				console.log(isInCart);
				if (isInCart) {
					cart.products.forEach((prod) => {
						if (prod.id === product.id) {
							prod.quantity += product.quantity;
						}
					});
				} else {
					cart.products.push({
						id: product.id || id,
						quantity: product.quantity || 1,
						timestamp: product.timestamp || new Date(),
					});
				}
				await this.model.updateOne({ id: cid }, cart);
				return cart.products;
			} else {
				return { message: 'No existe el carrito' };
			}
		} catch (error) {
			console.log(`Could not set product to cart: ${error}`);
		}
	};
	deleteProductFromCart = async (cid, pid) => {
		try {
			let cart = await this.getCart(cid);
			if (cart) {
				cart.products = cart.products.filter((prod) => prod.id !== Number(pid));
				//Eliminar producto del carrito
				await this.model.findOneAndUpdate({ id: pid }, { products: cart.products });
				//Actualizar el carrito
				await this.model.updateOne({ id: Number(cid) }, cart);
				return cart.products;
			} else {
				return { message: 'No existe el carrito' };
			}
		} catch (error) {
			console.log(`Could not delete product from cart: ${error}`);
		}
	};
}

module.exports = CartsDaoMongo;
