import axios from 'axios';
import { Product } from '../Products/Product';

const API = import.meta.env.VITE_NODE_API;

const headers = {
	'Content-Type': 'application/json',
	'x-access-token': localStorage.getItem('user') || '',
};

export const createCart = async () => {
	const response = await axios.post(`${API}/api/carts`, {
		headers: headers,
	});
	console.log(response);

	return response;
};

export const deleteCart = async (id: number) => {
	const res = await axios.delete(`${API}/api/carts/${id}`, {
		headers: headers,
	});
	return res;
};

export const getProductsInCart = async (id: number) => {
	const response = await axios.get(`${API}/api/carts/${id}/products`, {
		headers: headers,
	});
	console.log(response);

	return response;
};

export const addProductToCart = async (id: number, product: Product) => {
	const response = await axios.post(`${API}/api/carts/${id}/products`, product, {
		headers: headers,
	});
	console.log(response);

	return response;
};

export const removeProductFromCart = async (id: number, product: Product) => {
	const response = await axios.delete(`${API}/api/carts/${id}/products/${product.id}`, {
		headers: headers,
	});
	console.log(response);

	return response;
};
