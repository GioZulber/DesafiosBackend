const express = require('express');
const app = express();
const cors = require('cors');
const { fork } = require('child_process');
require('./config/clienteMongo');
const { config } = require('./config/index');
// const { puerto } = require('./utils/minimist');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const cluster = require('cluster');
let cpus = require('os').cpus().length;
// Configuraciones
const PORT = parseInt(process.env.watch || 8080);

app.use(
	cors({
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		allowedHeaders: 'Content-Type, Authorization',
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

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

const advancedOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
app.use(
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

app.use('/', require('./routes/viewsRouter.js'));
app.use('/', require('./routes/authRouter.js'));
app.use('/api/products', require('./routes/productRouter.js'));
app.use('/api/carts', require('./routes/cartRouter.js'));

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
