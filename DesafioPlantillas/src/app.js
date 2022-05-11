import express from 'express';
import handlebars from 'express-handlebars';
import productRouter from './routes/productRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import __dirname from './utils.js';

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//motor de compilacion
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
//motor de vistas
// app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', viewsRouter);
app.use('/api/productos', productRouter);
