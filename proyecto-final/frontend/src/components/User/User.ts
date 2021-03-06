export interface UserRegister {
	email: string;
	name: string;
	password: string;
	address: string;
	phone: string;
	age: number;
	avatar: string;
}

export interface UserLogin {
	email: string;
	password: string;
}

export interface User {
	email: string;
	name: string;
	address: string;
	phone: string;
	age: number;
	avatar: string;
	role: string;
}
