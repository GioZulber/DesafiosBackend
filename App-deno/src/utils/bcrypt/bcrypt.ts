import { bcrypt } from '../../config/deps.ts';

export const isValidPassword = async (password: string, dbPassword: string) => {
	return await bcrypt.compare(password, dbPassword);
};

export const createHash = (password: string) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
