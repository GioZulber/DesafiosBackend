export interface ProductBody {
	title: string;
	description: string;
	code: string;
	thumbnail: string;
	price: number;
	stock: number;
}
export interface ProductInt extends ProductBody {
	id: number;
	timestamp: Date;
}
