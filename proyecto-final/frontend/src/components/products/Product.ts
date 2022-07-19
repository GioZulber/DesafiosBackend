export interface Product {
	id: number;
	title: string;
	description: string;
	code: string;
	thumbnail: string;
	price: number;
	stock: number;
}

export interface PutProduct extends Product {
	id: number;
}
