
let num = 1234.56789;
//Redondea un número a una cantidad fija de decimales y devuelve una cadena (string).
console.log(num.toFixed(2)); // "1234.57"
console.log(num.toFixed(0)); // "1235"

//Devuelve el numero segun el total de cifras designadas
console.log(num.toPrecision(6)); //"1234.57"
console.log(num.toPrecision(4)); //"1235"

//Devuelve el numero
console.log(num.toExponential(2));
console.log(num.toExponential(0));
console.log(num.toExponential(6));

num = 17841234.56789;

//Formatear numero separandolos por rangos a traces de "," o "."
console.log(num.toLocaleString());
//console.log(num.toLocaleString("es-Es"));
//Añadir formato
console.log(num.toLocaleString("es-ES", { style: "currency", currency: "EUR" }));

//Metodos para redondear

console.log(Math.round(num));//rendondea al numero mas proxiomo
console.log(Math.floor(num));
console.log(Math.ceil(num));
console.log(Math.trunc(num));


