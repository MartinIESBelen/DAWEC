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



// Lista de alumnos
let alumnos = [];

// Función para calcular la media
function calcularMedia(lista) {
    if (lista.length === 0) return 0;
    const total = lista.reduce((sum, alumno) => sum + alumno.pre, 0);
    return total / lista.length;
}

// Función para obtener el estado de la nota
function estadoNota(nota) {
    if (nota < 1) return "puffff";
    if (nota < 3) return "Insuficiente";
    if (nota < 5) return "Deficiente";
    if (nota < 6) return "Satisfactorio";
    if (nota < 7) return "OK";
    if (nota < 8.5) return "Bueno";
    return "Muy bueno";
}

// Crear un alumno
function addAlumno(nombre, pre) {
    if (!nombre || pre < 0 || pre > 10) {
        console.log("Datos incorrectos");
        return;
    }

    const existe = alumnos.some(a => a.name === nombre);
    if (existe) {
        console.log("Alumno ya existe");
        return;
    }

    alumnos.push({ name: nombre, pre });
    console.log("Alumno añadido correctamente");
}

// Eliminar un alumno
function removeAlumno(nombre) {
    const index = alumnos.findIndex(a => a.name === nombre);
    if (index === -1) {
        console.log("Alumno no encontrado:", nombre);
        return;
    }

    alumnos.splice(index, 1);
    console.log("Alumno eliminado:", nombre);
}

// Mostrar listado y media
function showAlumnos() {
    console.log("=== LISTADO DE ALUMNOS ===");

    if (alumnos.length === 0) {
        console.log("No hay alumnos");
        return;
    }

    alumnos.forEach(a => {
        console.log(`${a.name} - Nota: ${a.pre} (${estadoNota(a.pre)})`);
    });

    const media = calcularMedia(alumnos);
    const mensaje = media >= 7 ? "¡Clase destacada!" : "A mejorar";
    console.log(`Media de la clase: ${media.toFixed(2)} → ${mensaje}`);
}

// ======== EJEMPLO DE USO ========
addAlumno("Ana", 8);
addAlumno("Luis", 5);
addAlumno("Marta", 9);
showAlumnos();
removeA
