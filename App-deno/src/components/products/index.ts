import { Router } from '../../config/deps.ts';
import ProductsController from './controllers/ProductsController.ts';

export const router = new Router()
	.get('/api/products', ProductsController.getAllProducts)
	.get('/api/products/:pid', ProductsController.getProductId)
	.post('/api/products', ProductsController.create)
	// .put("/api/products/:pid", ProductsController.update)
	.delete('/api/products/:pid', ProductsController.delete);
