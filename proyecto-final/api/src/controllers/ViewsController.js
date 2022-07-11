let minimist = require('minimist');
let args = minimist(process.argv.slice(2));

const getHome = async (req, res) => {
	try {
		res.json({ message: 'Hello World' });
		console.log(req.session);
		console.log(req.headers);
	} catch (error) {
		console.log(error);
	}
};

const getErrorLogin = async (req, res) => {
	try {
		res.render('errorLogin', { error: 'Contraseña o nombre incorrecto' });
	} catch (error) {
		console.log(error);
	}
};

const getErrorRegister = async (req, res) => {
	try {
		res.render('errorRegister', { error: 'Ese nombre de usuario ya existe' });
	} catch (error) {
		console.log(error);
	}
};

// const getInfo = async (req, res) => {
// 	try {
// 		console.log(args._);
// 		if (req.session.passport.user) {
// 			console.log(args);
// 			let data = {
// 				user: req.session.passport.user.username,
// 				entryArgs: process.argv,
// 				platformName: process.platform,
// 				nodeVersion: process.version,
// 				memoryRss: process.memoryUsage().rss,
// 				path: process.execPath,
// 				processId: process.pid,
// 				folder: process.cwd(),
// 			};
// 			res.render('info', { data: data });
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

module.exports = {
	getHome,
	getErrorLogin,
	getErrorRegister,
	// getInfo,
};
