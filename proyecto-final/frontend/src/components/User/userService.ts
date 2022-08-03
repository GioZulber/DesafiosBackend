import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import { UserRegister, UserLogin, User } from './User';

const API = import.meta.env.VITE_NODE_API;

// const getAuthHeaders = (): AxiosRequestHeaders => {
// 	const minTokenLength = 1;
// 	try {
// 		const token = localStorage.getItem('user');

// 		if (typeof token !== 'string') throw new Error('User is not a found');

// 		if (!(typeof token === 'string' && token.length >= minTokenLength))
// 			throw new Error('Token is not found');

// 		return { authorization: token };
// 	} catch (error) {
// 		return {};
// 	}
// };

// const user = localStorage.getItem('user');
// const headers = {
// 	'Content-Type': 'application/json',
// 	'Access-Control-Allow-Origin': '*',
// 	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
// 	'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
// 	'Access-Control-Allow-Credentials': 'true',
// 	axios.defaults.headers.common.Authorization
// };

// export const getUser = async (email: string) => {
// 	const response = await axios.get<User>(`${API}/user/${email}`, {
// 		headers: headers,
// 	});

// 	return response.data;
// };

export const registerUser = async (user: UserRegister) => {
	const response = await axios
		.post(`${API}/register`, user)
		.then((res) => {
			localStorage.setItem('user', res.data.token);
			return res;
		})
		.catch((err) => {
			return err.response;
		});
	return response;
};

export const loginUser = async (user: UserLogin) => {
	const response = await axios
		.post(`${API}/login`, user)
		.then((res) => {
			localStorage.setItem('user', res.data.token);
			return res;
		})
		.catch((err) => {
			return err.response;
		});

	return response;
};
