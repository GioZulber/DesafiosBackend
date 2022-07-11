import axios from 'axios';
import { Product } from './Product';

const API = import.meta.env.VITE_NODE_API;

export const getProducts = async () => {
	const response = await axios.get<Product[]>(`${API}/products`);
	return response.data;
};

export const getProductById = async (id: string) => {
	const response = await axios.get<Product>(`${API}/products/${id}`);
	return response.data;
};
export const createProduct = async (product: Product) => {
	const response = await axios.post<Product>(`${API}/products`, product);
	return response.data;
};
export const updateProduct = async (product: Product) => {
	const response = await axios.put<Product>(`${API}/products/${product.id}`, product);
	return response.data;
};
export const deleteProduct = async (id: string, product: Product) => {
	return await axios.delete(`${API}/products/${id}`);
};
