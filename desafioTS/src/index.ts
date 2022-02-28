const operaciones = async (num1: number, num2: number, cuenta: string) => {
  let calculos = await import('./operacion.js');
  let resultados = calculos.operacion(num1, num2, cuenta);
  return resultados;
};

const ejecucion = async (num1: number, num2: number, cuenta: string) => {
  let res = await operaciones(num1, num2, cuenta);
  console.log(res);
};

//Como 3er paremetro pase "sumar", "restar", "multiplicar" o "dividir"
ejecucion(30, 6, 'restar');
