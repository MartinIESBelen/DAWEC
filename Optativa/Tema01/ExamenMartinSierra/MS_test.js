/*

//Salra error y no se porque
import {calcularMedia} from './MS_sript';

export function runtest(){
    const casos = [
        {mensaje: "Media correcta", test: calcularMedia([{nombre:"Martin", nota: 7},{nombre:"Jose", nota: 9}]), expected: 8},
        {mensaje: "Media incorrecta", test: calcularMedia([{nombre:"Martin", nota: 5},{nombre:"Jose", nota: 9}]), expected: 8},
    ]
    console.log("=== Ejecutando Tests ===");

    casos.forEach((t, index) => {
        const result = t.test();
        const passed = result === t.expected;

        console.log(
            `Test ${index + 1}: ${t.description} → ${passed ? "PASA" : "FALLA"}`
        );

        if (!passed) {
            console.log("    Esperado:", t.expected);
            console.log("    Recibido:", result);
        }
    });
}

runtest();*/
