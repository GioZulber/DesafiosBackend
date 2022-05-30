const express = require('express');
require('dotenv').config();
const app = express();
const { config } = require('./config/index');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
let { schema, normalize, denormalize } = require('normalizr');
const PORT = config.port;
const ViewsRouter = require('./routes/viewsRouter.js');
let msgModel = require('./models/index.js').msgModel;

const msgDb = new msgModel();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
app.use(cookieParser());

app.use(
  expressSession({
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://giozulber:6dYnFldnFz2d5QcP@ecommercecluster.ml55j.mongodb.net/coderDb?retryWrites=true&w=majority',
      mongoOptions: advancedOptions,
      // autoRemove: 'native',
    }),
    collection: 'sessions',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

const SocketServer = new Server(server);

(async () => {
  let chat = await msgDb.getMsg();
  const authorSchema = new schema.Entity(
    'author',
    {},
    { idAttribute: 'email' }
  );
  const chatSchema = new schema.Entity('chat', {
    mensajes: [{ author: authorSchema }],
  });
  let normalizedData = normalize(chat, chatSchema);

  SocketServer.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('newUser', () => {
      socket.emit('log', normalizedData);
    });

    socket.on('sendMessage', (data) => {
      chat.mensajes.push(data);
      msgDb.setMsg(chat);
      let normalizedData = normalize(chat, chatSchema);
      SocketServer.emit('log', normalizedData);
    });
  });
})();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', ViewsRouter);
app.use('/getData', (req, res) => {
  res.send(req.session);
});
