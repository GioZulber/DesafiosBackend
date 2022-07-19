import { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { User } from '../components/User/User';
import { getUser } from '../components/User/userService';
import { toast } from 'react-toastify';
import { Product } from '../components/Products/Product';

interface ContextProps {
	user: User | null;
	getUserData(): void;
	getLogout(): void;
}
interface UserProviderProps {
	children: JSX.Element | JSX.Element[];
}

const UserContext = createContext({} as ContextProps);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [cart, setCart] = useState<Product[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('user');
		if (token) {
			getUserData();
		}
	}, [user]);

	useEffect(() => {
		if (user) {
		}
	}, []);

	const getUserData = async () => {
		const token = localStorage.getItem('user');
		if (token) {
			const decoded: User = jwtDecode(token);
			const userData: User = await getUser(decoded.email);
			setUser(userData);
		} else {
			toast.info('No hay usuario');
		}
	};

	const getLogout = () => {
		localStorage.removeItem('user');
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ user, getUserData, getLogout }}>
			{children}
		</UserContext.Provider>
	);
};
