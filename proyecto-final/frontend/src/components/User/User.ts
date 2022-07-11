export interface UserRegister {
	email: string;
	password: string;
	name: string;
	address: string;
	phone: string;
	age: number;
	avatar: string;
}

export interface UserLogin {
	email: string;
	password: string;
}
