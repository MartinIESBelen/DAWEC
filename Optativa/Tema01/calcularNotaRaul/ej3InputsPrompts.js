document.addEventListener("DOMContentLoaded", () => {
    console.log("La página ha cargado");
    agregarEstilos();

    const form = document.querySelector("#form");

    const TOTAL_NOTAS = 4;
    const NOTA_MAX = 10;
    const NOTA_MIN = 0;
    const RANGO_NOTAS = {
        maximo: 10,
        minimo: 0
    };
    const CALIFICACIONES= {
        suficiente:5,
        notable:6,
        sobresaliente:8,
    }

    export function verificarNotaValida(nota){
        const numero = parseFloat(nota);
        return !isNaN(numero) && numero > RANGO_NOTAS.minimo && numero < RANGO_NOTAS.minimo;
    }

    export function calcularPromedio(notas){
        let sumaNotas = notas.reduce((promedio, nota) => promedio + nota, 0);
        return sumaNotas / TOTAL_NOTAS;
        //return notas.reduce((suma, nota)=> suma + nota, 0) / TOTAL_NOTAS;
    }

    export function optenerCalificacion(promedio){
        if (promedio < CALIFICACIONES.suficiente) return {estado: "supendido", nombre: "suspenso"};
        if (promedio < CALIFICACIONES.notable)return {estado: "aprobado", nombre: "suficiente"};
        if(promedio < CALIFICACIONES.sobresaliente) return {estado: "aprobado", nombre: "notable"};
        return {estado: "aprobado", nombre: "sobresaliente"};
    }

    function formatearNotas(notas){
        return notas.map((n, i) => `Nota ${i + 1}: ${n}`).join(", ");
    }


    function generarImputs(parent){
        for(let i = 1; i < TOTAL_NOTAS; i++) {
            parent.innerHTML = `
            <label>Nota${i + 1}:</label>
            <input type="number" data-index="${i}" min="${NOTA_MIN}" max="${NOTA_MAX}"> 
            `;
        }
        parent.innerHTML += `<button id="enviar" type="button">Enviar</button>`;
    }

    function renderTabla(notas, promedio, calificacion) {
        const tabla = document.createElement("table");
        tabla.innerHTML = `
            <thead>
                <tr><th>Descripción</th><th>Valor</th></tr>
            </thead>
            <tbody>
                ${notas.map((n, i) => `<tr><td>Nota ${i + 1}</td><td>${n}</td></tr>`).join("")}
                <tr><td><strong>Promedio</strong></td><td><strong>${promedio}</strong></td></tr>
                <tr><td><strong>Calificación</strong></td><td><strong>${calificacion.nombre}</strong></td></tr>
            </tbody>
        `;
        document.body.appendChild(tabla);
    }

    function renderDiv(notas, promedio, calificacion) {
        const div = document.createElement("div");
        div.innerHTML = `
            <h2>Resultado Final</h2>
            <p><strong>Notas:</strong> ${formatearNotas(notas)}</p>
            <p><strong>Promedio:</strong> ${promedio}</p>
            <p>El alumno ha <strong>${calificacion.estado}</strong> con un <strong>${calificacion.nombre}</strong>.</p>
        `;
        document.body.appendChild(div);
    }

    // ==========================
    // 5. EVENTO DEL BOTÓN
    // ==========================
    function enviarDatos() {
        const inputs = [...form.querySelectorAll("input")];
        const valores = inputs.map(i => i.value.trim());

        if (valores.some(v => !esNotaValida(v))) {
            alert("Error: todas las notas deben ser válidas.");
            return;
        }

        notas = valores.map(Number);
        const promedio = calcularPromedio(notas);
        const calificacion = obtenerCalificacion(promedio);

        // Siempre renderizamos en tabla (puedes cambiar a div si quieres)
        renderTabla(notas, promedio, calificacion);
        // renderDiv(notas, promedio, calificacion);
    }

    // ==========================
    // 6. ESTILOS
    // ==========================
    function agregarEstilos() {
        const style = document.createElement("style");
        style.textContent = `
            body { padding: 20px; }
            #form { padding: 20px; margin-bottom: 20px; }
            #form label { margin: 10px; }
            #form input { padding: 5px; margin: 10px; outline: none; }
            #form button { padding: 8px; }
            table { border-collapse: collapse; margin-top: 20px; }
            table th, table td { border: 1px solid #333; padding: 10px; }
            div { margin-top: 20px; }
        `;
        document.head.appendChild(style);
    }

    // ==========================
    // 7. INICIALIZACIÓN
    // ==========================
    agregarEstilos();
    crearInputs(form);

    document.querySelector("#enviar").addEventListener("click", enviarDatos);
});