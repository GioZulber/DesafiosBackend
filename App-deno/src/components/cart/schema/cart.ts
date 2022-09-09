import { ProductInt } from '../../products/schema/product.ts';
export interface CartInt {
	id: number;
	timestamp: Date;
	products: ProductInt[];
}
