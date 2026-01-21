// Variable global
let paisActual = null;

document.addEventListener('DOMContentLoaded', () => {
    generarPaises();
    generarRegimenPolitico();

    const contenedorUl = document.querySelector("#paisesList");
    const form = document.getElementById("paisForm");
    const btnAgregarIdioma = document.getElementById("addLanguageBtn"); // Recuerda quitar el onclick del HTML
    const contenedorIdiomas = document.getElementById("otrosIdiomasContainer");

    // Evento Click en la lista (Delegación)
    contenedorUl.addEventListener("click", (e) => {
        if (e.target.tagName !== "LI") return;

        const liClickeado = e.target;
        const estaSeleccionado = liClickeado.classList.contains("selected");

        // Limpiamos selección visual de todos
        contenedorUl.querySelectorAll("li.selected").forEach(li => li.classList.remove("selected"));

        // Limpiamos errores si cambiamos de país
        limpiarErrores();

        if (estaSeleccionado) {
            limpiarFormulario();
            paisActual = null;
        } else {
            liClickeado.classList.add("selected");
            const nombrePais = liClickeado.textContent.trim();
            paisActual = obtenerPais(nombrePais);
            rellenarFormulario(paisActual);
        }
    });

    // Eventos varios
    contenedorIdiomas.addEventListener("click", eliminarIdioma);

    // Descomenta esto si ya quitaste el onclick="" del HTML
    //btnAgregarIdioma.addEventListener("click", agregarIdiomaManual);

    // --- MODIFICACIÓN CLAVE AQUÍ ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // 1. Primero limpiamos mensajes de error antiguos
        limpiarErrores();

        // 2. Ejecutamos la validación
        const esValido = validarCampos();

        // 3. Si NO es válido, paramos la ejecución (return).
        // El JSON no se pintará.
        if (!esValido) {
            return;
        }

        // Si todo está bien, continuamos normal
        const datosFormulario = leerDatosDelFormulario();
        paisActual = datosFormulario;
        mostrarJson(datosFormulario);
    });
});

// --- NUEVAS FUNCIONES DE VALIDACIÓN ---

function limpiarErrores() {
    // Busca todos los elementos con la clase "error-msg" y los elimina
    document.querySelectorAll(".error-msg").forEach(el => el.remove());
    // Quita el borde rojo de los inputs si lo tuvieran
    document.querySelectorAll(".input-invalido").forEach(el => el.classList.remove("input-invalido"));
}

function mostrarError(inputElement, mensaje) {
    // 1. Crear el mensaje
    const errorSmall = document.createElement("small");
    errorSmall.innerText = mensaje;
    errorSmall.classList.add("error-msg");
    errorSmall.style.color = "red";
    errorSmall.style.display = "block"; // Para que baje de línea
    errorSmall.style.marginTop = "5px";
    errorSmall.style.fontWeight = "bold";

    // 2. Insertarlo en el DOM justo después del input
    inputElement.insertAdjacentElement('afterend', errorSmall);

    // 3. Opcional: Marcar el input en rojo
    inputElement.classList.add("input-invalido"); // Podrías darle estilo CSS a esta clase
}

function validarCampos() {
    let esTodoCorrecto = true;

    // A. Validar Población (Solo números)
    const inputPoblacion = document.getElementById("poblacion_nacional");
    const valorPoblacion = inputPoblacion.value.trim();

    // Regex: ^\d+$ significa "empieza y acaba solo con dígitos"
    // isNaN() también vale, pero permite "1.5" o espacios raros. Regex es más estricto para enteros.
    if (!/^\d+$/.test(valorPoblacion)) {
        mostrarError(inputPoblacion, "Error: La población debe contener solo números enteros.");
        esTodoCorrecto = false;
    }

    // B. Validar Jefe de Estado (No puede contener números)
    const inputJefe = document.getElementById("jefe_estado");
    const valorJefe = inputJefe.value;

    // Regex: \d busca cualquier dígito del 0 al 9 en el texto
    if (/\d/.test(valorJefe)) {
        mostrarError(inputJefe, "Error: El nombre no puede contener números.");
        esTodoCorrecto = false;
    }

    return esTodoCorrecto;
}

// ---------------------------------------

//Cambiar formato fecha
function convertirFecha(fechaStr) {
    if (!fechaStr) return "";
    let [anio, mes, dia] = fechaStr.split("-");
    return `${dia.padStart(2, "0")}/${mes.padStart(2, "0")}/${anio}`;
}

function generarPaises() {
    const paisesUl = document.getElementById("paisesList");
    const listaOrdenada = [...datosUE].sort((a, b) => a.pais.localeCompare(b.pais));

    paisesUl.innerHTML = listaOrdenada
        .map(p => `<li value="${p.pais}">${p.pais}</li>`)
        .join('');
}

function obtenerPais(nombre) {
    return datosUE.find(dato => dato.pais === nombre);
}

function generarRegimenPolitico() {
    const select = document.getElementById("regimen_tipo");
    const tipos = [...new Set(datosUE.map(p => p.regimen_politico.tipo))];
    const defaultOption = '<option value="">Seleccione un tipo de régimen</option>';
    const options = tipos.map(t => `<option value="${t}">${t}</option>`).join("");
    select.innerHTML = defaultOption + options;
}

function rellenarFormulario(pais) {
    if (!pais) return;

    // Limpiamos errores previos al cargar un nuevo país
    limpiarErrores();

    document.getElementById("pais").value = pais.pais;
    document.getElementById("poblacion_nacional").value = pais.poblacion_nacional;
    document.getElementById("capital").value = pais.capital;
    document.getElementById("idioma_oficial").value = pais.idiomas.oficial;
    document.getElementById("regimen_tipo").value = pais.regimen_politico.tipo;
    document.getElementById("jefe_estado").value = pais.regimen_politico.jefe_estado;

    document.getElementById("fecha_adhesion").value = pais.fecha_adhesion || "";

    const contenedor = document.getElementById("otrosIdiomasContainer");
    contenedor.innerHTML = "";

    if (pais.idiomas && pais.idiomas.otros_idiomas) {
        const textoIdiomas = pais.idiomas.otros_idiomas || "";
        if(textoIdiomas.length > 0){
            const listaIdiomas = textoIdiomas.split(",").map(i => i.trim());
            listaIdiomas.forEach(idioma => crearInputIdioma(idioma));
        }
    }
}

function limpiarFormulario() {
    limpiarErrores(); // Limpiar errores también al resetear
    document.getElementById("paisForm").reset();
    document.getElementById("otrosIdiomasContainer").innerHTML = "";
    document.getElementById("output").value = "";
}

function crearInputIdioma(valor = "") {
    const div = document.createElement("div");
    div.classList.add("language-row");

    div.innerHTML = `
        <input type="text" value="${valor}" placeholder="Otro idioma">
        <button type="button" class="btnEliminar">X</button>
    `;
    document.getElementById("otrosIdiomasContainer").appendChild(div);
}

function agregarIdiomaManual() {
    crearInputIdioma("");
}

function eliminarIdioma(e) {
    if (e.target.classList.contains("btnEliminar")) {
        e.target.parentElement.remove();
    }
}

function leerDatosDelFormulario() {
    const inputsOtrosIdiomas = document.querySelectorAll("#otrosIdiomasContainer input");
    const arrayOtrosIdiomas = Array.from(inputsOtrosIdiomas)
        .map(input => input.value.trim())
        .filter(val => val !== "");

    const stringOtrosIdiomas = arrayOtrosIdiomas.join(", ");
    const fechaRaw = document.getElementById("fecha_adhesion").value;

    return {
        pais: document.getElementById("pais").value,
        poblacion_nacional: parseInt(document.getElementById("poblacion_nacional").value) || 0,
        fecha_adhesion: convertirFecha(fechaRaw),
        capital: document.getElementById("capital").value,
        idiomas: {
            oficial: document.getElementById("idioma_oficial").value,
            otros_idiomas: stringOtrosIdiomas || null
        },
        regimen_politico: {
            tipo: document.getElementById("regimen_tipo").value,
            jefe_estado: document.getElementById("jefe_estado").value
        },
        ciudades_principales: paisActual ? paisActual.ciudades_principales : []
    };
}

function mostrarJson(objetoDatos) {
    const out = document.getElementById("output");
    out.value = JSON.stringify(objetoDatos, null, 4);
}