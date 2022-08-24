const ProductModel = require('../services/index');

class ProductController {
	async getProducts(req, res) {
		try {
			const id = req.params.pid;
			const products = await ProductModel.getProducts(id);
			res.status(200).send({
				message: 'Products encontrados',
				products: products,
			});
		} catch (error) {
			console.log(error);
		}
	}
	async setProduct(req, res) {
		try {
			const product = req.body;
			const newProduct = await ProductModel.setProduct(product);
			res.status(200).send({
				message: 'Producto agregado',
				newProduct: newProduct,
			});
		} catch (error) {
			console.log(error);
		}
	}
	async updateProduct(req, res) {
		try {
			const id = req.params.pid;
			const product = req.body;
			const updatedProduct = await ProductModel.updateProduct(id, product);
			if (id) {
				res.status(200).send({
					message: 'Producto actualizado',
					updatedProduct: updatedProduct,
				});
			} else {
				res.status(400).send({
					message: 'El id del producto no puede ser nulo',
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
	async deleteProduct(req, res) {
		try {
			const id = req.params.pid;
			const deletedProduct = await ProductModel.deleteProduct(id);
			if (id) {
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
	}
}

module.exports = new ProductController();
