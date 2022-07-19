import axios from 'axios';
import { Product } from './Product';

const API = import.meta.env.VITE_NODE_API;

const headers = {
	'Content-Type': 'application/json',
	'x-access-token': localStorage.getItem('user') || '',
};

export const getProducts = async () => {
	const response = await axios.get(`${API}/api/products`, {
		headers: headers,
	});
	console.log(response);

	return response;
};

export const getProductById = async (id: number) => {
	const response = await axios.get<Product>(`${API}/api/products/${id}`, {
		headers: headers,
	});
	return response;
};
export const createProduct = async (product: Product) => {
	const response = await axios.post<Product>(`${API}/api/products`, product, {
		headers: headers,
	});
	console.log(response);

	return response;
};
export const updateProduct = async (product: Product) => {
	const response = await axios.put<Product>(`${API}/api/products/${product.id}`, product, {
		headers: headers,
	});
	return response;
};
export const deleteProduct = async (id: number) => {
	const res = await axios.delete<Product>(`${API}/api/products/${id}`, {
		headers: headers,
	});
	return res;
};
