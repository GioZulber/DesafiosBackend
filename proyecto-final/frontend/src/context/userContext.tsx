import { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { ContextProps, ProviderProps, ActionType } from './contextProps';
// import { loginUser, registerUser } from '../components/User/userService';
import { UserLogin, UserRegister } from '../components/User/User';
import axios from 'axios';

const API = import.meta.env.VITE_NODE_API;

const initialState = {
	isAuthenticated: false,
	user: null,
};

const authReducer = (state = initialState, { type, payload }: ActionType) => {
	switch (type) {
		case 'LOGIN':
			return {
				...state,
				isAuthenticated: true,
				user: payload.user,
			};
		case 'LOGOUT':
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};
		default: {
			return state;
		}
	}
};

const UserContext = createContext({} as ContextProps);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	const getUserInfo = async () => {
		const token = localStorage.getItem('user');
		if (token) {
			try {
				const res = await axios.get(`${API}/user`, {
					headers: {
						authorization: token,
					},
				});
				dispatch({
					type: 'LOGIN',
					payload: {
						user: res.data,
					},
				});
				console.log(res.data);
			} catch (error) {
				console.error(error);
			}
		} else {
			delete axios.defaults.headers.common['authorization'];
		}
	};

	useEffect(() => {
		if (!state.user) {
			async function getUser() {
				await getUserInfo();
			}
			getUser();
		}
	}, [state]);

	console.log(state);

	const loginUser = async (user: UserLogin) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await axios
				.post(`${API}/login`, user, config)
				.then((res) => {
					localStorage.setItem('user', res.data.token);
					return res;
				})
				.catch((err) => {
					return err.response;
				});
			await getUserInfo();
			return response;
		} catch (error) {
			console.error(error);
		}
	};

	const registerUser = async (user: UserRegister) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const response = await axios
				.post(`${API}/register`, user, config)
				.then((res) => {
					localStorage.setItem('user', res.data.token);
					return res;
				})
				.catch((err) => {
					return err.response;
				});

			await getUserInfo();
			return response;
		} catch (error) {
			console.error(error);
		}
	};

	const logoutUser = () => {
		try {
			localStorage.removeItem('user');
			dispatch({ type: 'LOGOUT' });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<UserContext.Provider value={{ ...state, loginUser, registerUser, logoutUser }}>
			{children}
		</UserContext.Provider>
	);
};
