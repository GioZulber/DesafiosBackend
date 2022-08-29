let { buildSchema } = require('graphql');
const ProductServices = require('../services/index');

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

        input ProductInput {
			productId: Int
            title: String
            description: String
            code: String
            thumbnail: String
            price: Int
            stock: Int           
        }
        type Query {
            getProduct(id: Int): Product
			getProducts( id: Int): [Product]
        }
        type Mutation {
            setProduct(prduct: ProductInput): Product
            deleteProduct(id: Int!): Product
            updateProduct(id: Int, product: ProductInput ): Product
        }
    `
);

funciones.getProduct = async ({ id }) => {
	try {
		const products = await ProductServices.getProducts(id);
		return products;
	} catch (error) {
		console.log(error);
	}
};

funciones.getProducts = async () => {
	try {
		const products = await ProductServices.getProducts();
		return products;
	} catch (error) {
		console.log(error);
	}
};

funciones.setProduct = async ({ product }) => {
	try {
		const newProduct = await ProductServices.setProduct(product);
		return newProduct;
	} catch (error) {
		console.log(error);
	}
};

funciones.deleteProduct = async ({ id }) => {
	try {
		const deletedProduct = await ProductServices.deleteProduct(id);
		return { message: 'Product deleted successfully' };
	} catch (error) {
		console.log(error);
	}
};

funciones.updateProduct = async ({ id, product }) => {
	try {
		const updatedProduct = await ProductServices.updateProduct(id, product);
		console.log(updatedProduct);
		return updatedProduct;
	} catch (error) {
		console.log(error);
	}
};

module.exports = [funciones, schema];
