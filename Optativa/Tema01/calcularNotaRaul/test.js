import {verificarNotaValida, calcularPromedio,optenerCalificacion} from "./ej3InputPrompts.js";

function runtest(){
    const cases = [
        {mensaje: "Validación nota valida", test: verificarNotaValida(9), expected: true},
        {mensaje: "Rango de validación no valido", test: verificarNotaValida(12), expected: false},
        {mensaje: "", test: calcularPromedio([5,5,5,5]), expected: 5},
        {mensaje: "", test: optenerCalificacion(5), expected: {estado: "aprobado", nombre: "suficiente"}},
        {mensaje: "", test: verificarNotaValida("fdf"), expected: false},

    ]
    console.log("=== Ejecutando Tests ===");

    cases.forEach((t, index) => {
        const result = t.test();
        const passed = JSON.stringify(result) === JSON.stringify(t.expected);

        console.log(
            `Test ${index + 1}: ${t.description} → ${passed ? "✔ PASA" : "❌ FALLA"}`
        );

        if (!passed) {
            console.log("    Esperado:", t.expected);
            console.log("    Recibido:", result);
        }
    });
}

