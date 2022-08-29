let { buildSchema } = require('graphql');
const CartsModel = require('../services/index');
const Users = require('../../auth/services/index');
const jwt = require('../../../utils/jwt/jwt');

let funciones = {};

const schema = buildSchema(
	`   
        type Product  {
            productId: Int!
		    title: String!
		    description: String!
		    code: String!
		    thumbnail: String!
            price: Int!
            stock: Int!
            timestamp: String! 
        }

        type Cart {
            id: Int!
            timestamp: String!
            products: [Product]
        }
        input ProductInput {
			productId: Int!
            title: String
            description: String
            code: String
            thumbnail: String
            price: Int
            stock: Int           
        }
        type Query {
            getCartProducts(id: Int!): [Product]
        }
        type Mutation {
            setCart(id: Int!): Cart
            deleteCart(id: Int!): Cart 
            setProductToCart(id: Int!, product: ProductInput ): Product
            deleteProductFromCart(id: Int!, product: ProductInput): Product
        }
    `
);

funciones.getCartProducts = async ({ id }) => {
	try {
		const productsCart = await CartsModel.getCartProducts(id);
		return productsCart;
	} catch (error) {
		console.log(error);
	}
};

funciones.setCart = async ({ id }) => {
	try {
		const newCart = await CartsModel.setCart(id);
		return newCart;
	} catch (error) {
		console.log(error);
	}
};

funciones.deleteCart = async ({ id }) => {
	try {
		const deletedCart = await CartsModel.deleteCart(id);
		return { message: 'Cart deleted successfully' };
		// return deletedCart;
	} catch (error) {
		console.log(error);
	}
};

funciones.setProductToCart = async ({ id, product }) => {
	try {
		const newProduct = await CartsModel.setProductToCart(id, product);
		return newProduct;
	} catch (error) {
		console.log(error);
	}
};

funciones.deleteProductFromCart = async ({ id, product }) => {
	try {
		const deletedProduct = await CartsModel.deleteProductFromCart(id, product.productId);
		console.log(deletedProduct);
		return deletedProduct;
	} catch (error) {
		console.log(error);
	}
};

module.exports = [funciones, schema];
