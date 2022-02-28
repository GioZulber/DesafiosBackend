"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const operaciones = (num1, num2, cuenta) => __awaiter(void 0, void 0, void 0, function* () {
    let calculos = yield import('./operacion.js');
    let resultados = calculos.operacion(num1, num2, cuenta);
    return resultados;
});
const ejecucion = (num1, num2, cuenta) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield operaciones(num1, num2, cuenta);
    console.log(res);
});
//Como 3er paremetro pase "sumar", "restar", "multiplicar" o "dividir"
ejecucion(30, 6, 'restar');
