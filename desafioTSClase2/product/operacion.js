class Cuentas {
    constructor(num1, num2, cuenta) {
        this.num1 = num1;
        this.num2 = num2;
        this.cuenta = cuenta;
    }
    resolver() {
        if (this.cuenta === 'sumar') {
            return this.num1 + this.num2;
        }
        else if (this.cuenta === 'restar') {
            return this.num1 - this.num2;
        }
        else if (this.cuenta === 'multiplicar') {
            return this.num1 * this.num2;
        }
        else if (this.cuenta === 'dividir') {
            return this.num1 / this.num2;
        }
    }
}
export const operacion = (num1, num2, cuenta) => {
    return new Promise((resolve, reject) => {
        if (cuenta === 'sumar' ||
            cuenta === 'restar' ||
            cuenta === 'multiplicar' ||
            cuenta === 'dividir') {
            let calculo = new Cuentas(num1, num2, cuenta);
            resolve(calculo.resolver());
        }
        else {
            reject(console.log('Error, las cuentas habilitadas son: sumar, restar, multiplicar y dividir'));
        }
    });
};
