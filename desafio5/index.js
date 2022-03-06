const http = require('http');

const server = http.createServer((peticion, respuesta) => {
  const obj = {
    id: Math.floor(Math.random() * 10 + 1),
    title: 'Product ' + Math.floor(Math.random() * 10 + 1),
    price: Math.floor(Math.random() * 9999.99 + 0.0),
    thumnail: 'Foto ' + Math.floor(Math.random() * 10 + 1),
  };

  const objFront = JSON.stringify(obj);

  respuesta.end(objFront);
});

server.listen(8080, () => {
  console.log('Listening on port 8080');
});
