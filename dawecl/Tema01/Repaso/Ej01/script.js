
function preguntarOperacion() {
   let respuesta;
    do {
        let input = prompt("Indique que operacion quiere realizar: 1 sumar, 2 restar o 3 multiplicar")
        if(input === null) {
            alert("Se ha cancelado la operacion!");
            return null;
        }
        respuesta = Number(input);
   }while(respuesta !== 1 && respuesta !== 2 && respuesta !== 3);

    return respuesta;
}

function pedirNumeros(){
    const listaNumeros = []
    for(let i = 0; i < 2; i++){
        let numero = Number(prompt(`Escriba el ${i === 0 ? "primer" : "segundo"} numero`));
        listaNumeros.push(numero);
    }
    return listaNumeros;
}

function sumarNumeros(numeros){
    let suma = numeros.reduce((acc, num) => acc + num, 0);
    return suma;
}

function restarNumeros(numeros){
    let resta = numeros.reduce((acc, num) => acc - num);
    return resta;
}

function multiplicarNumeros(numeros){
    let multiplicacion = numeros.reduce((acc, num) => acc * num);
    return multiplicacion;
}

function pintarResultados(respuesta){
    const lista= pedirNumeros();
    let resultado;
    let mensaje = document.createElement("div");
    if(respuesta === 1){
        resultado = sumarNumeros(lista);
        console.log(resultado);
        mensaje.innerHTML = `La suma de ${lista[0]} mas ${lista[1]} es ${resultado}`;
    }
    if(respuesta === 2){
        resultado = restarNumeros(lista);
        console.log(resultado);
        mensaje.innerHTML = `La resta de ${lista[0]} menos ${lista[1]} es ${resultado}`;
    }
    if(respuesta === 3){
        resultado = multiplicarNumeros(lista);
        console.log(resultado);
        mensaje.innerHTML = `La multiplicación de ${lista[0]} por ${lista[1]} es ${resultado}`;
    }

    alert(mensaje.innerHTML);
    document.body.appendChild(mensaje);
}

document.addEventListener("DOMContentLoaded", () => {
    let respueta = preguntarOperacion();
    pintarResultados(respueta);
});