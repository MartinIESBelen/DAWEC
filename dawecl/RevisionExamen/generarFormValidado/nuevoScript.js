let andalucia;

// Metodo para rellenar el select de provincias (robusto para múltiples CCAA)
function cargarProvinciasInicial() {
    const provinciaSelect = document.getElementById("provincia");
    let optionsHTML = '<option value="">Seleccione una provincia</option>\n';

    // Iterar sobre CADA Comunidad Autónoma en el array dataProvincias
//    let andalucia = provincias.find(ca => ca.label === "Andalucía");
//    if (!andalucia) return;
    if (!andalucia.provinces) return;

    provinciaSelect.innerHTML = optionsHTML + andalucia.provinces
        .map(p => `<option value="${p.code}">${p.label}</option>`)
        .join('');


    // Restablecer el select de municipio
    document.getElementById("municipio").innerHTML = '<option value="">Seleccione un municipio</option>';
    document.getElementById("municipio").disabled = true;
    document.getElementById("localidad").innerHTML = '<option value="">Localidad no disponible</option>';
    document.getElementById("localidad").disabled = true;
}

//Rellena los select de municipios y localidades de los datos de provincias.js
function cargarMunicipiosYLocalidades(provinciaCode) {
    const municipioSelect = document.getElementById("municipio");
    const localidadSelect = document.getElementById("localidad");

    // Limpieza
    municipioSelect.innerHTML = '<option value="">Seleccione un municipio</option>';
    localidadSelect.innerHTML = '<option value="">Localidad no disponible</option>';
    // Añadimos disabled por si acaso se vacía
    municipioSelect.disabled = true;
    localidadSelect.disabled = true;

    if (!provinciaCode) return;

    // Buscar provincia
    let provinciaEncontrada = andalucia.provinces.find(p => p.code === provinciaCode);

    if (!provinciaEncontrada || !provinciaEncontrada.towns) return;

    // CORRECCIÓN: .join('') para evitar comas
    const optionsHTML = provinciaEncontrada.towns
        .map(t => `<option value="${t.label}">${t.label}</option>`)
        .join('');

    // Inserción (Usar innerHTML += está bien, pero insertAdjacentHTML es más eficiente, aunque esto vale)
    municipioSelect.innerHTML += optionsHTML;
    localidadSelect.innerHTML += optionsHTML;

    municipioSelect.disabled = false;
    localidadSelect.disabled = false;
}

//Metodo para llenar selector enseñanza
function cargarEnsenianzas() {
    const enseniazaSelect = document.getElementById("enseñanza");
    enseniazaSelect.innerHTML = '<option value="">Seleccione una enseñanza</option>';

    if (!enseniazaCursos) return;

    // CORRECCIÓN: .join('') aquí es vital
    enseniazaSelect.innerHTML += enseniazaCursos
        .map(e => `<option value="${e.code}">${e.label}</option>`)
        .join('');

    document.getElementById("curso").disabled = true;
    document.getElementById("curso").innerHTML = '<option value="">Curso no disponible</option>';
}

function cargarCursos(enseniazaCode) {
    const cursosSelect = document.getElementById("curso");
    cursosSelect.innerHTML = '<option value="">Seleccione una curso</option>';

    let ensenianzaEncontrada = enseniazaCursos.find(p => p.code === enseniazaCode);

    if (!ensenianzaEncontrada || !ensenianzaEncontrada.cursos) return;

    // CORRECCIÓN: .join('') aquí también
    cursosSelect.innerHTML += ensenianzaEncontrada.cursos
        .map(c => `<option value="${c.code}">${c.label}</option>`)
        .join('');

    cursosSelect.disabled = false;
}
//metemos todos los cursos en un solo obj
/*const todosLosCursos = enseniazaCursos.reduce((acum, ensenianza) => {
    return acum.concat(ensenianza.cursos);
}, []);*/

let contadorPersonas = 1;

function generarResponsable() {
    contadorPersonas++;

    const contenedor = document.getElementById("personaAutorizada");

    contenedor.insertAdjacentHTML(
        "beforeend",
        `
        
        <div class="persona" id="persona${contadorPersonas}">
            <p>${contadorPersonas}º Persona autorizada</p>
            <button type="button" class="btnRestar" data-idpersona="${contadorPersonas}">-</button>
            
            <label>Nombre:</label>
            <input type="text" class="nombre">

            <label>Primer apellido:</label>
            <input type="text" class="primerApellido">

            <label>Segundo apellido:</label>
            <input type="text" class="segundoApellido">

            <label>Tipo de documentación:</label>
            <select class="documentacion">
                <option>DNI</option>
                <option>NIE</option>
                <option>Pasaporte</option>
            </select>

            <label>NIF/NIE/Pasaporte:</label>
            <input type="text" class="nif">

            <label>Teléfono:</label>
            <input type="text" class="telefono">
        </div>
        `
    );
}

function eliminarResponsable(e) {

    if (!e.target.classList.contains("btnRestar")) return;

    // No permitimos borrar la primera persona
    /*    if (e.target.parentElement.id === "persona1") {
            alert("La primera persona no se puede eliminar.");
            return
        }*/
    e.target.parentElement.remove();
}

function validarCampo(e) {
    const input = e.target;
    const valor = input.value.trim();
    // Evitar validar el botón o selects sin reglas
    if (!input.classList.contains("nombre") &&
        !input.classList.contains("primerApellido") &&
        !input.classList.contains("segundoApellido") &&
        !input.classList.contains("nif") &&
        !input.classList.contains("telefono")) return;

    const esObligatorio = input.matches(".nombre, .nif");

    let valido = true;
    let mensaje = "";

    if(valor === ""){
        if(esObligatorio){
            valido = false;
            mensaje = "No se puede dejar este campo vacio";
        }else{
            valido = true;
        }
    }else{
        if (input.classList.contains("nombre")) {
            valido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(input.value);
            mensaje = "El nombre solo puede contener letras.";
        }

        if (input.classList.contains("primerApellido")) {
            valido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(input.value);
            mensaje = "El apellido solo puede contener letras.";
        }

        if (input.classList.contains("segundoApellido")) {
            valido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(input.value);
            mensaje = "El apellido solo puede contener letras.";
        }

        if (input.classList.contains("nif")) {
            valido = /^[0-9XYZxyz]\d{7}[A-Za-z]$/.test(input.value);
            mensaje = "Formato NIF/NIE incorrecto.";
        }

        if (input.classList.contains("telefono")) {
            valido = /^[679]\d{8}$/.test(input.value);
            mensaje = "El teléfono debe tener 9 cifras y empezar por 6, 7 o 9.";
        }
    }

    mostrarEstado(input, valido, mensaje);
}

function mostrarEstado(input, valido, mensaje) {

    // Si ya existe un mensaje, lo eliminamos
    const anterior = input.parentElement.querySelector(".error");
    if (anterior) anterior.remove();

    if (valido) {
        input.style.border = "2px solid green";
        return;
    }

    input.style.border = "2px solid red";

    input.insertAdjacentHTML(
        "afterend",
        `<span class="error" style="color:red; font-size: 12px; display:block">${mensaje}</span>`
    );
}
document.addEventListener("DOMContentLoaded", () => {

    andalucia = provincias.find(ca => ca.label === "Andalucía");
    cargarProvinciasInicial();

    document.getElementById("provincia").addEventListener("change", e => {
        cargarMunicipiosYLocalidades(e.target.value);
    });

    cargarEnsenianzas();

    document.getElementById("enseñanza").addEventListener("change", e => {
        cargarCursos(e.target.value);
    })

    document.getElementById("sumar").addEventListener("click", generarResponsable);

    const contenedorPersonas = document.getElementById("personaAutorizada");
    // delegación de eventos:
    contenedorPersonas.addEventListener("click", eliminarResponsable);

    //Validamos campos
    contenedorPersonas.addEventListener("input", validarCampo);

    contenedorPersonas.addEventListener("focusout", validarCampo);
});