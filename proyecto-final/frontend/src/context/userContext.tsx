import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
interface User {
	email: string;
	name: string;
}
type UserContext = {
	user: User | null;
	login: (user: User) => void;
	children: React.ReactNode;
};

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: UserContext) => {
	const [user, setUser] = useState<User>({
		email: '',
		name: 'user',
	});

	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem('user');
		console.log(token);
		if (token) {
			const decoded: User = jwtDecode(token);
			console.log(decoded);
			setUser({
				email: decoded.email,
				name: decoded.name,
			});
			if (!decoded.name) {
				localStorage.removeItem('user');
				navigate('/register');
			}
		}
	}, []);

	return <UserContext.Provider value={[{ user, setUser }]}>{children}</UserContext.Provider>;
};
