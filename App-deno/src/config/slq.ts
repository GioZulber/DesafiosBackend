import { Client, config } from './deps.ts';

const clientDb = new Client();

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = config();

clientDb.connect({
	hostname: DB_HOST,
	username: DB_USER,
	password: DB_PASSWORD,
	db: DB_NAME,
});

export default clientDb;
