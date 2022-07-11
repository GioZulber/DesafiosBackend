const ContenedorMongo = require('../../../containers/ContainerMongoDb');
const productSchema = require('../schema/productSchema');

class ProductDaoMongo extends ContenedorMongo {
	constructor() {
		super(productSchema, 'products');
	}
	getProducts = async (id) => {
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
	};
	setProduct = async (porduct) => {
		try {
			let lastId = await this.model.findOne({}, {}, { sort: { id: -1 } });
			let id = lastId ? Number(lastId.id) + 1 : 1;
			let date = new Date();
			const set = await this.model.create({
				id: id,
				timestamp: date,
				...porduct,
			});
			return set;
		} catch (error) {
			console.log(`Could not set product: ${error}`);
		}
	};
	updateProduct = async (id, product) => {
		try {
			const res = await this.model.findOneAndUpdate({ id: id }, product);
			return res;
		} catch (error) {
			console.log(`Could not update product: ${error}`);
		}
	};

	deleteProduct = async (id) => {
		try {
			const res = await this.model.findOneAndDelete({ id });
			return res;
		} catch (error) {
			console.log(`Could not delete product: ${error}`);
		}
	};
}

module.exports = ProductDaoMongo;
