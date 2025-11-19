//Evitamos modificar nuestras variables externas
//Arrays
let numbers = [1, 2, 3];
//Mala practica
function addNumber(n) {
    numbers.push(n); // ❌ modifica la variable externa
}
//Buena practaca*
function addNumberPure(numbers, n) {
    return [...numbers, n]; // nuevo array
}

//Carrito
const cart = [];
//Mala practica
function addToCart(item) {
    cart.push(item);
}

function addToCartPure(cart,item) {
    return [...cart, ...item];
}

//........................................
//Mala practica
function addItem(list, item) {
    list.push(item);  // MUTACIÓN
    return list;
}
//Buena practica*
function addItemPure(list, item){
    return [...list, item];
}
//Buena practica*
function multiplicarElementos(list){
    return list.map(l => l * 2);
}

//Si usas push, pop, shift, unshift, splice → mutas !!
//Si usas map, filter, reduce, concat, spread → NO mutas !!


//Object
//Mala practica
function addObject(person, age){
    person.age = age;
    return person;
}
//Buena practica*
function addObjectPure(person, age){
    return {
        ...person,
        age
    };
}
//Buena practica*
function addObjectPure2(person, age){
    const copy = Object.assign({}, person);

    copy.age = age;

    return copy;
}



