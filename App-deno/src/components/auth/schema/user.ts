export interface UserBody {
	email: string;
	name: string;
	password: string;
	address: string;
	phone: string;
	age: number;
	avatar: string;
	role?: string;
}
export interface UserInt extends UserBody {
	id: number;
}
