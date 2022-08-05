import axios from 'axios';
import { Product } from '../Products/Product';
import { Cart } from './Cart';
import { User } from '../User/User';

const API = import.meta.env.VITE_NODE_API;

export const getCart = async (user: User) => {
	const token = localStorage.getItem('user');
	try {
		if (token) {
			const response = await axios.get(`${API}/api/carts/${user.userId}`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: token,
				},
			});
			console.log(response.data.newCart);
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

export const createCart = async (user: User) => {
	const token = localStorage.getItem('user');
	try {
		if (token) {
			const response = await axios.post(
				`${API}/api/carts`,
				{ userId: user.userId },
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

// export const deleteCart = async (id: number) => {
// 	const res = await axios.delete(`${API}/api/carts/${id}`, {
// 		headers: headers,
// 	});
// 	return res;
// };

// export const getProductsInCart = async (id: number) => {
// 	const response = await axios.get(`${API}/api/carts/${id}/products`, {
// 		headers: headers,
// 	});
// 	console.log(response);

// 	return response;
// };

export const addProductToCart = async (id: number, product: Product) => {
	const token = localStorage.getItem('user');
	try {
		console.log(product);

		if (token) {
			const response = await axios.post(`${API}/api/carts/${id}/products`, product, {
				headers: {
					'Content-Type': 'application/json',
					authorization: token,
				},
			});
			console.log(response);

			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

export const removeProductFromCart = async (id: number, product: Product) => {
	const token = localStorage.getItem('user');
	try {
		if (token) {
			const response = await axios.delete(`${API}/api/carts/${id}/products/${product.id}`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: token,
				},
			});
			console.log(response);
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

export const confirmCartOrder = async (id: number) => {
	const token = localStorage.getItem('user');
	try {
		if (token) {
			const response = await axios.get(`${API}/api/carts/${id}/confirm`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: token,
				},
			});
			console.log(response);
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};
