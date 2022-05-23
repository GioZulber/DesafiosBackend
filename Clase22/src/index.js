const express = require('express');
const config = require('./config.json');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
let { schema, normalize, denormalize } = require('normalizr');
const app = express();
const PORT = config.port;
const ViewsRouter = require('./routes/viewsRouter.js');
let msgModel = require('./models/index.js').msgModel;

const msgDb = new msgModel();

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
      SocketServer.emit('newMsg', normalizedData);
    });
  });
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', ViewsRouter);
