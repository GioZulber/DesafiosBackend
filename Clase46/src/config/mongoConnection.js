const mongoose = require('mongoose');
const { config } = require('./index');

const disconnect = async () => {
	try {
		await mongoose.disconnect();
		console.log('MONGODB DISCONNECTED');
	} catch (error) {
		console.log(error);
	}
};

process.on('uncaughtException', (error) => {
	console.log(error);
	mongoose.disconnect();
});

if (config.database === 'MONGO') {
	(async () => {
		try {
			const db = await mongoose.connect(config.database_url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			console.log('DB Connected', db.connection.host);
		} catch (error) {
			console.log(error);
		}
	})();
}

module.exports = {
	disconnect,
};
