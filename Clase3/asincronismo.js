const showText = (text, cb, time = 1000) => {
  const arrayText = text.split(' ');
  let quantity = arrayText.length;
  let i = 0;
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (i < arrayText.length) {
        console.log(arrayText[i]);
        i++;
      } else {
        clearInterval(timer);
        cb(quantity);
        resolve(i);
      }
    }, time);
  });
};

const finish = (quantity) => {
  console.log(`Fin, esta cadena tenia ${quantity} palabras`);
};

const calls = async () => {
  let total = 0;
  total += await showText('Hola soy una cadena', finish);
  total += await showText('Buenas soy la segunda cadena', finish, 500);
  total += await showText('Ya no se que poner', finish, 100);
  console.log(`Proceso completo. Se mostraron un total de ${total} palabras`);
};

calls();
