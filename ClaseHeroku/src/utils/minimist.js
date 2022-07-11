let minimist = require('minimist');
let args = minimist(process.argv.slice(2));
let options = {
	default: {
		port: 8080,
	},
	alias: {
		port: 'p',
	},
};
const puerto = minimist(args._, options).port;

module.exports = {
	puerto,
};
