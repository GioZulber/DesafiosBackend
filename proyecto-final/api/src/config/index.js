require('dotenv').config();
let args = process.argv.slice(2);
// console.log(args);
let config = {
	port: process.env.PORT,
	database: process.env.DATABASE || 'mongo',
	database_url:
		process.env.DATABASE_URL ||
		'mongodb+srv://giozulber:6dYnFldnFz2d5QcP@ecommercecluster.ml55j.mongodb.net/coderDb?retryWrites=true&w=majority',
	path_to_msg_files: String(process.env.PATH_TO_MSG_FILES) || 'src/files/msg.json',
	path_to_products_files: String(process.env.PATH_TO_PRODUCTS_FILES) || 'src/files/products.json',
	secret_key: process.env.SECRET_KEY || 'secret',
	server_mode: args[0] || 'FORK',
};

module.exports = { config };
