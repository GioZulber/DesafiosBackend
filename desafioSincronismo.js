//Este desafio lo hicimos en clase

const mostrarLetas = (palabra, cb) => {
  let i = 0;
  const timer = setInterval(() => {
    if (i < palabra.length) {
      console.log(palabra[i]);
      i++;
    } else {
      clearInterval(timer);
      cb();
    }
  }, 1000);
};

const funcionFinalizada = () => console.log('finalizado al proceso');

setTimeout(() => {
  mostrarLetas('hola', funcionFinalizada);
}, 0);

setTimeout(() => {
  mostrarLetas('hola', funcionFinalizada);
}, 250);
setTimeout(() => {
  mostrarLetas('hola', funcionFinalizada);
}, 500);
