import clientDb from '../../../config/slq.ts';
import { ProductBody, ProductInt } from '../schema/product.ts';

class ProductService {
	async findOne(id: string) {
		try {
			const res: ProductInt = await clientDb.query(`
                SELECT * FROM products where id=${Number(id)}
             `);
			return res;
		} catch (error) {
			console.log(error);
		}
	}
	async findAll() {
		try {
			const res: ProductInt[] = await clientDb.query(`SELECT * FROM products`);
			return res;
		} catch (error) {
			console.log(error);
		}
	}

	async create(data: ProductBody) {
		try {
			const res: ProductInt = await clientDb.query(`
                INSERT INTO product(title, description, code, thumbnail, price, stock) VALUES(${data.title}, ${data.description}, ${data.code}, ${data.thumbnail}, ${data.price}, ${data.stock}))
            `);
			return res;
		} catch (error) {
			console.log(error);
		}
	}
	// async update(id: string) {
	// 	try {
	// 		const res: ProductInt = await clientDb.query(``);
	// 		return res;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }
	async delete(id: string) {
		try {
			const res = await clientDb.query(`DELETE * FROM products WHERE id=${Number(id)}`);
			return res;
		} catch (error) {
			console.log(error);
		}
	}
}

export default new ProductService();
