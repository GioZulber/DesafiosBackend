import { Context, helpers } from '../../../config/deps.ts';
import { ProductBody, ProductInt } from '../schema/product.ts';
import ProductService from '../services/productService.ts';
class ProductsController {
	async getProductId(ctx: Context) {
		try {
			const { pid } = helpers.getQuery(ctx, {
				mergeParams: true,
			});
			const product: ProductInt | undefined = await ProductService.findOne(pid);

			if (product) {
				ctx.response.status = 200;
				ctx.response.body = {
					message: 'Producto Encontrado',
					product: product,
				};
			} else {
				ctx.response.status = 404;
				ctx.response.body = { message: 'Producto no encontrado' };
			}
		} catch (error) {
			console.log(error);
		}
	}

	async getAllProducts(ctx: Context) {
		try {
			const product: ProductInt[] | undefined = await ProductService.findAll();
			ctx.response.status = 200;
			ctx.response.body = {
				message: 'Productos Encontrados',
				products: product,
			};
		} catch (error) {
			console.log(error);
		}
	}

	async create(ctx: Context) {
		try {
			const data: ProductBody = await ctx.request.body().value;

			const product: ProductInt | undefined = await ProductService.create(data);

			ctx.response.status = 200;
			ctx.response.body = {
				message: 'Producto Creado',
				product,
			};
		} catch (error) {
			console.log(error);
		}
	}

	// async update(ctx: Context) {
	//     try {
	//         const { id } = helpers.getQuery(ctx, {
	//             mergeParams: true,
	//         })
	//         // const data = await ctx.request.body().value;
	//     } catch (error) {

	//     }
	// }
	async delete(ctx: Context) {
		try {
			const { pid } = helpers.getQuery(ctx, {
				mergeParams: true,
			});
			const product: ProductInt | undefined = await ProductService.delete(pid);

			ctx.response.status = 200;
			ctx.response.body = {
				message: 'Producto Eliminado',
				deletedProduct: product,
			};
		} catch (error) {
			console.log(error);
		}
	}
}

export default new ProductsController();
