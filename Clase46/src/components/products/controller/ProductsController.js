const ProductService = require('../services/productServiceMongo');

class ProductController {
	async getProducts(ctx) {
		try {
			const { pid } = ctx.params;

			const products = await ProductService.getProducts(pid);

			ctx.body = {
				status: 200,
				message: 'Productos encontrados',
				products: products,
			};
		} catch (error) {
			console.log(error);
		}
	}
	async setProduct(ctx) {
		try {
			const product = ctx.request.body;
			const newProduct = await ProductService.setProduct(product);
			ctx.body = {
				status: 200,
				message: 'Producto agregado',
				product: newProduct,
			};
		} catch (error) {
			console.log(error);
		}
	}
	async updateProduct(ctx) {
		try {
			const { pid } = ctx.params;
			const product = ctx.request.body;
			const findProduct = await ProductService.getProducts(pid);

			const updatedProduct = await ProductService.updateProduct(pid, product);

			if (updatedProduct !== findProduct) {
				ctx.body = {
					status: 200,
					message: 'Producto actualizado',
					product: updatedProduct,
				};
			} else {
				ctx.status = 400;
				ctx.body = {
					message: 'Producto no existente',
				};
			}
		} catch (error) {
			console.log(error);
		}
	}

	async deleteProduct(ctx) {
		try {
			const { pid } = ctx.params;
			const deletedProduct = await ProductService.deleteProduct(pid);
			if (pid) {
				ctx.body = {
					status: 200,
					message: 'Producto eliminado',
					deletedProduct: pid,
				};
			} else {
				ctx.status = 400;
				ctx.body = {
					message: 'Producto no existente',
				};
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new ProductController();
