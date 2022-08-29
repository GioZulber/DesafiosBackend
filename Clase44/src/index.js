const express = require('express');
const cors = require('cors');

//Coneccion a la base de datos
require('./config/indexConections');
const { config } = require('./config/index');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const serverRoutes = require('./routes/index');
const cluster = require('cluster');
let cpus = require('os').cpus().length;

class Server {
	constructor() {
		this.app = express();
		this.port = config.port;
		this.settings();
		this.middlewares();
		this.routes();
		this.mode();
	}
	settings() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.static(__dirname + '/public'));
	}
	middlewares() {
		this.app.use(cors('*'));
		const advancedOptions = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};
		this.app.use(
			expressSession({
				store: MongoStore.create({
					mongoUrl: config.database_url,
					mongoOptions: advancedOptions,
				}),
				secret: config.secret_key,
				resave: false,
				saveUninitialized: false,
				cookie: {
					maxAge: 600000,
				},
			})
		);
	}
	routes() {
		serverRoutes(this.app);
	}
	mode() {
		// if (config.server_mode === 'CLUSTER') {
		// 	if (cluster.isMaster) {
		// 		console.log(`Master PID -> ${process.pid} is running`);
		// 		//WORKERS
		// 		for (let i = 0; i < cpus; i++) {
		// 			cluster.fork();
		// 		}
		// 		// 	cluster.on('exit', (worker, code, signal) => {
		// 		// 		console.log(`Worker ${worker.process.pid} died`);
		// 		// 		cluster.fork();
		// 		// 	});
		// 	} else {
		// 		const server = app.listen(PORT, () => {
		// 			console.log(`Server is running on port ${PORT}`);
		// 		});
		// 	}
		// } else {
		// 	const server = app.listen(PORT, () => {
		// 		console.log(`Server is running on port ${PORT}`);
		// 	});
		// }
	}
	init() {
		this.app.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`);
		});
	}
}
module.exports = new Server();
