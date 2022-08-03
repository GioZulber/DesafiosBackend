import axios from 'axios';
import { Product } from './Product';

const API = import.meta.env.VITE_NODE_API;

export const getProducts = async () => {
	const token = localStorage.getItem('user');
	try {
		if (token) {
			const response = await axios.get(`${API}/api/products`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: token,
				},
			});

			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

export const getProductById = async (id: number) => {
	const token = localStorage.getItem('user');
	try {
		if (token) {
			const response = await axios.get(`${API}/api/products/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: token,
				},
			});
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};
export const createProduct = async (product: Product) => {
	const token = localStorage.getItem('user');
	try {
		if (token) {
			const response = await axios.post<Product>(`${API}/api/products`, product, {
				headers: {
					'Content-Type': 'application/json',
					authorization: token,
				},
			});
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};
export const updateProduct = async (product: Product) => {
	const token = localStorage.getItem('user');
	try {
		if (token) {
			const response = await axios.put<Product>(
				`${API}/api/products/${product.id}`,
				product,
				{
					headers: {
						'Content-Type': 'application/json',
						authorization: token,
					},
				}
			);
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};
export const deleteProduct = async (id: number) => {
	const token = localStorage.getItem('user');
	try {
		if (token) {
			const response = await axios.delete(`${API}/api/products/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: token,
				},
			});
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};
