//Este desafio lo hicimos en clase

const mostrarLetras = (palabra, cb) => {
  let i = 0;
  const timer = setInterval(() => {
    if (i < palabra.length) {
      console.log(palabra[i]);
      // or palabra.at(i)
      i++;
    } else {
      clearInterval(timer);
      cb();
    }
  }, 1000);
};
const funcionFinalizada = () => console.log('Finalizado el proceso');

setTimeout(() => {
  mostrarLetras('hola', funcionFinalizada);
}, 0);

setTimeout(() => {
  mostrarLetras('hola', funcionFinalizada);
}, 250);

setTimeout(() => {
  mostrarLetras('hola', funcionFinalizada);
}, 500);
