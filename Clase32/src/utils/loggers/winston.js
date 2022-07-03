let winston = require('winston');

let infoLog = winston.createLogger({
	level: 'info',
	format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
	transports: [new winston.transports.Console({ level: 'info' })],
});

let warnLog = winston.createLogger({
	level: 'warn',
	format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
	transports: [
		// new winston.transports.Console({ level: 'warn' }),
		new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
	],
});

let errorLog = winston.createLogger({
	level: 'error',
	format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
	transports: [
		new winston.transports.Console({ level: 'error' }),
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
	],
});

module.exports = {
	infoLog,
	warnLog,
	errorLog,
};
