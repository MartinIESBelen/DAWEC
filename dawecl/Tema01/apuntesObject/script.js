let paises= {
    name: "España",
    capital: "Madrid",
    state: 17,
}

console.log(paises);


paises[0].state = 7;

console.log(paises);

paises = [
    {   name: "España",
        capital: "Madrid",
        state: 17,},

    {   name: "Francia",
        capital: "Paris",
        state: 22,},

    {   name: "Argentina",
        capital: "B-A",
        state: 28,},

]
console.log(paises);

let listaNumeros = [1,2,3];

function add(numero) {
    return [...listaNumeros,numero]
}

let items = {name: "libro", precio: 13}

function cambiarPrecio(item,nuevoPrecio){
    return{
        ...item,
        precio: nuevoPrecio,
    };

    //Si fuese un array
    //return item.map(p => p.name === name ? {p.precio = nuevoPrecio} : p);
}

function eliminarNumero(arr, numero){
    return arr.filter(n => n !== numero);

}