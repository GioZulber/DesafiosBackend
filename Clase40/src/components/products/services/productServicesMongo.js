const ContenedorMongo = require('../../../containers/ContainerMongoDb');
const productSchema = require('../schema/productSchema');

class ProductServiceMongo extends ContenedorMongo {
	constructor() {
		super(productSchema, 'products');
	}
	async getProducts(id) {
		try {
			if (id) {
				const res = await this.model.findOne({ id: id });
				if (res === null) {
					throw new Error('No se encontró el producto');
				}
				return res;
			} else {
				return await this.model.find({});
			}
		} catch (error) {
			console.log(`Could not get products: ${error}`);
		}
	}
	async setProduct(product) {
		try {
			console.log(product);
			let lastId = await this.model.findOne({}, {}, { sort: { id: -1 } });
			let id = lastId ? Number(lastId.id) + 1 : 1;
			let date = new Date();
			const set = await this.model.create({
				id: id,
				timestamp: date,
				...product,
			});
			return set;
		} catch (error) {
			console.log(`Could not set product: ${error}`);
		}
	}
	async updateProduct(id, product) {
		try {
			const res = await this.model.findOneAndUpdate({ id: id }, product);
			return res;
		} catch (error) {
			console.log(`Could not update product: ${error}`);
		}
	}

	async deleteProduct(id) {
		try {
			const res = await this.model.findOneAndDelete({ id });
			return res;
		} catch (error) {
			console.log(`Could not delete product: ${error}`);
		}
	}
}

module.exports = new ProductServiceMongo();
