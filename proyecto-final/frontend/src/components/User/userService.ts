import axios from 'axios';
import { UserRegister, UserLogin } from './User';

const API = import.meta.env.VITE_NODE_API;

export const registerUser = async (user: UserRegister) => {
	const res = await axios.post<UserRegister>(`${API}/register`, user);
	console.log(res);

	if (res.data) {
		localStorage.setItem('user', JSON.stringify(res.data));
	}
	return res;
};

export const loginUser = async (user: UserLogin) => {
	const res = await axios.post<UserLogin>(`${API}/login`, user);

	if (res.data) {
		localStorage.setItem('user', JSON.stringify(res.data));
	}

	return res;
};

export const logoutUser = async () => {
	// const res = await axios.get<UserRegister>(`${API}/logout`, {});
	localStorage.removeItem('user');
};
