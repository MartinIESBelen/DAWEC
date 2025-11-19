let notas = [];
const TOTAL_NOTAS = 4;

document.addEventListener("DOMContentLoaded", () => {
    console.log("La página ha cargado");

    function pedirNotas(){
        for (let i = 0; i < TOTAL_NOTAS; i++) {
            let nota;
            let esValida = false;

            while (!esValida) {
                nota = prompt(`Ingrese la nota ${i + 1} (0-10):`);
                esValida = compruebaMedia(nota, i + 1);
            }
            aniadirNotas(nota);
        }
    }

    function aniadirNotas(nota){
        if(compruebaMedia(nota)){
            return null;
        }
        return notas.push(nota);
    }



    function compruebaNota(numero) {
        return !isNaN(numero) && numero !== null && numero.trim() !== "";
    }

    function compruebaMedia(nota, numeroNota) {
        if (!compruebaNota(nota)) {
            alert(`Error: La nota ${numeroNota} debe ser un número válido`);
            return false;
        }
        let notaNum = parseFloat(nota);
        if (notaNum < 0 || notaNum > 10) {
            alert(`Error: La nota ${numeroNota} debe estar entre 0 y 10`);
            return false;
        }
        return true;
    }

    let promedio = (notas[0] + notas[1] + notas[2] + notas[3]) / totalOfNotas;

    if (promedio < 5) {
        document.body.innerHTML += `El alumno ha suspendido el curso con un ${promedio}, es decir, suspenso.`;
    } else if (promedio >= 5 && promedio < 6) {
        document.body.innerHTML += `El alumno ha aprobado el curso con un ${promedio}, es decir, suficiente.`;
    } else if (promedio >= 6 && promedio < 8) {
        document.body.innerHTML += `El alumno ha aprobado el curso con un ${promedio}, es decir, notable.`;
    } else {
        document.body.innerHTML += `El alumno ha aprobado el curso con un ${promedio}, es decir, sobresaliente.`;
    }
});




//Array de caso de uso
/*
const testCases = [
    {
        name: "Caso normal - notas enteras",
        input: [5, 7, 8],
        expected: 6.67
    },
    {
        name: "Notas decimales",
        input: [6.5, 7.25, 8.75],
        expected: 7.5
    },
    {
        name: "Una sola nota",
        input: [10],
        expected: 10
    },
    {
        name: "Notas con ceros",
        input: [0, 5, 10],
        expected: 5
    },
    {
        name: "Valores muy altos",
        input: [100, 90, 80],
        expected: 90
    },
    {
        name: "Notas repetidas",
        input: [7, 7, 7],
        expected: 7
    },
    {
        name: "Array vacío (debería devolver null o error)",
        input: [],
        expected: null
    },
    {
        name: "Notas negativas (no válidas)",
        input: [-1, 5, 7],
        expected: "error"
    },
    {
        name: "Una nota no numérica",
        input: [5, "hola", 7],
        expected: "error"
    },
    {
        name: "Notas no válidas: undefined",
        input: [5, undefined, 7],
        expected: "error"
    },
    {
        name: "Notas muy largas o atípicas",
        input: [0.1, 0.2, 0.3],
        expected: 0.2
    },
    {
        name: "Large dataset (muchas notas)",
        input: Array(100).fill(5),
        expected: 5
    }
];*/
