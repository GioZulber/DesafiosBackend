console.log('Hola mundo');

let socket = io();
/* CHAT */
let chatBox = document.getElementById('chatBox');
let divChat = document.getElementById('chat');
let divChatAndInput = document.getElementById('chatAndInput');
let percentTitle = document.getElementById('percentTitle');
/* CHAT */

/* REGISTRO */
let containerForm = document.getElementById('container-form');
let containerChat = document.getElementById('container-chat');
let buttonRegister = document.getElementById('register');
/* REGISTRO */

/* REGISTRO */
let author = {};
if (buttonRegister) {
  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let age = document.getElementById('age').value;
    let nickname = document.getElementById('nickname').value;
    let avatar = document.getElementById('avatar').value;
    if (
      name === '' ||
      lastName === '' ||
      email === '' ||
      age === '' ||
      nickname === '' ||
      avatar === ''
    ) {
      alert('Por favor llene todos los campos');
    } else {
      author = {
        email,
        name,
        lastName,
        age,
        nickname,
        avatar,
      };

      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(author),
      });
    }
  });
}

// console.log('gooooool' + JSON.stringify(author));
/* REGISTRO */

/* CHAT */
const init = async () => {
  let res = await fetch('/getData');
  let data = await res.json();
  author = data.user;
  initChat();
};
if (divChatAndInput) {
  init();
}

if (chatBox) {
  chatBox.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      if (chatBox.value.trim().length > 0) {
        socket.emit('sendMessage', {
          author: author,
          message: chatBox.value.trim(),
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        });
        chatBox.value = '';
      }
    }
  });
}

/* CHAT */

// Eventos de sockets
const authorSchema = new normalizr.schema.Entity(
  'author',
  {},
  { idAttribute: 'email' }
);
const chatSchema = new normalizr.schema.Entity('chat', {
  mensajes: [{ author: authorSchema }],
});
/* CHAT */

const initChat = () => {
  console.log(author.email);
  console.log('InitChat');
  socket.emit('newUser', author);
  socket.on('log', (data) => {
    let messages = '';
    let chat = normalizr.denormalize(data.result, chatSchema, data.entities);
    console.log('data normalizada =' + JSON.stringify(data).length);
    console.log('data denormalizada =' + JSON.stringify(chat).length);
    let percent =
      (1 - JSON.stringify(data).length / JSON.stringify(chat).length) * 100;
    // (JSON.stringify(chat).length * 100) / JSON.stringify(data).length;
    console.log(percent);
    percentTitle.innerHTML = `(Compresión ${percent.toFixed(2)}%)`;
    chat.mensajes.forEach((msg) => {
      console.log(msg);
      if (author.email === msg.author.email) {
        messages += `<div id="myMessages" class="myMessages">
                      <p id="log" class="pMessage"> ${msg.author.name}: ${msg.message}  <small>${msg.time}</small> </p>
                  </div>`;
      } else {
        messages += `
                  <div id="messages" class="messages" >
                  <p id="log" class="pMessage"> ${msg.author.name}: ${msg.message}  <small>${msg.time}</small> </p>
                  </div>`;
      }
    });
    divChat.innerHTML = messages;
  });
};
