
// Lista de alumnos
let alumnos = [];

// Función para calcular la median de los alumnos
export function calcularMedia(listaAlumnos) {
    if (listaAlumnos.length === 0) return 0;
    const total = listaAlumnos.reduce((suma, alumno) => suma + alumno.nota, 0);
    return total / listaAlumnos.length;
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

//Comprobamos si el alumna ya existe en el array
function comprobarAlumno(listaAlumnos, nombre) {
    return listaAlumnos.some(a => a.nombre === nombre);
}

// Crear-añadir un alumno
function aniadirAlumno(listaAlumnos, nombre, nota) {
    if (!nombre || nota < 0 || nota > 10) {
        console.log("Datos incorrectos");
        return;
    }
    if (comprobarAlumno(listaAlumnos, nombre)) {
        console.log("Alumno ya existe");
        return;
    }
    return [...listaAlumnos, {nombre: nombre, nota: nota}];
    console.log("Alumno añadido correctamente");
}

// Eliminar un alumno
function eliminarAlumno(listaAlumnos, nombre) {
    if(!comprobarAlumno(listaAlumnos, nombre)) {
        console.log("Alumno no existe");
        return;
    }
    return listaAlumnos.filter(a => a.nombre !== nombre);
    console.log("Alumno eliminado:" + nombre);
}

// Mostrar listado y media
export function mostrarAlumnos(listaAlumnos) {
    console.log("=== LISTADO DE ALUMNOS ===");

    if (!listaAlumnos) {
        console.log("No hay alumnos");
        return;
    }

    listaAlumnos.forEach(a => {
        console.log(`${a.nombre} - Nota: ${a.nota} (${estadoNota(a.nota)})`);
    });

    const media = calcularMedia(listaAlumnos);
    const mensaje = media >= 7 ? "¡Clase destacada!" : "A mejorar";
    console.log(`Media de la clase: ${media.toFixed(2)} → ${mensaje}`);
}

let nuevaLista = [];

nuevaLista = aniadirAlumno(alumnos,"Martin", 7);
nuevaLista = aniadirAlumno(nuevaLista,"Jose", 9);
mostrarAlumnos(nuevaLista);

nuevaLista = eliminarAlumno(nuevaLista, "Martin")

mostrarAlumnos(nuevaLista);

