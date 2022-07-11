const express = require('express');
const app = express();
const { fork } = require('child_process');
require('./config/clienteMongo');
const { config } = require('./config/index');
const { puerto } = require('./utils/minimist');
const expressSession = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const handlebars = require('express-handlebars');
const passport = require('passport');
const ViewsRouter = require('./routes/viewsRouter.js');
const LoginRouter = require('./routes/loginRouter.js');
require('./utils/passport.js');
// Configuraciones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
const server = app.listen(puerto, () => {
	console.log(`Server is running on port ${puerto}`);
});
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
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 600000,
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', ViewsRouter);
app.use('/', LoginRouter);
app.use('/api/randoms', (req, res) => {
	let cant = req.query.cant || 100000000;
	const child = fork('./src/random.js');
	child.send(cant);
	child.on('message', (operation) => {
		res.json(operation);
	});
});
