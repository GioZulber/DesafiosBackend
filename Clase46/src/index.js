const Koa = require('koa');
const { config } = require('./config/index');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const app = new Koa();
const PORT = config.port;
require('./config/mongoConnection');

app.use(koaBody()).use(cors());

let routes = require('./routes/index');

routes(app);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
