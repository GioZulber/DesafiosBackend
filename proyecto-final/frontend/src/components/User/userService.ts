import axios from 'axios';
import { UserRegister, UserLogin, User } from './User';

const API = import.meta.env.VITE_NODE_API;

export const getUser = async (email: string) => {
	const response = await axios.get<User>(`${API}/user/${email}`, {
		headers: {
			'Content-Type': 'application/json',
			'x-access-token': localStorage.getItem('user') || '',
		},
	});

	return response.data;
};

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
