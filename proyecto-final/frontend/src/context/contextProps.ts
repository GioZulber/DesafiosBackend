import { User, UserLogin, UserRegister } from '../components/User/User';

export interface ContextProps {
	user: User | null;
	isAuthenticated: boolean;
	loginUser: (user: UserLogin) => Promise<any>;
	registerUser: (user: UserRegister) => Promise<any>;
	logoutUser: () => void;
}

export interface ProviderProps {
	children: JSX.Element | JSX.Element[];
}

export type ActionType = { type: string; payload?: any };
