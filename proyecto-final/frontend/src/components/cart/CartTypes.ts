import { Product } from '../Products/Product';
export interface CartType {
	id?: number;
	timestamp?: string;
	products: Product[];
}
