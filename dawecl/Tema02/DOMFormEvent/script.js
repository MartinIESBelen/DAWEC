// Metodo para rellenar el select de provincias (robusto para múltiples CCAA)
function cargarProvinciasInicial() {
    const provinciaSelect = document.getElementById("provincia");
    let optionsHTML = '<option value="">Seleccione una provincia</option>\n';

    // Iterar sobre CADA Comunidad Autónoma en el array dataProvincias
    provincias.forEach(comunidadAutonoma => {
        if (comunidadAutonoma.provinces) {
            // Por cada CCAA, mapear sus provincias
            optionsHTML += comunidadAutonoma.provinces.map(p =>
                `<option value="${p.code}">${p.label}</option>`
            ).join('\n');
        }
    });

    provinciaSelect.innerHTML = optionsHTML;

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

    municipioSelect.innerHTML = '<option value="">Seleccione un municipio</option>';
    municipioSelect.disabled = true;
    localidadSelect.innerHTML = '<option value="">Localidad no disponible</option>';
    localidadSelect.disabled = true;

    if (!provinciaCode) return;

    // Buscar la provincia por su código en TODAS las CCAA
    let provinciaEncontrada = null;
    provincias.forEach(ca => {
        const p = ca.provinces.find(p => p.code === provinciaCode);
        if (p) provinciaEncontrada = p; // Guarda la provincia si la encuentra
    });

    if (provinciaEncontrada && provinciaEncontrada.towns) {
        municipioSelect.disabled = false;

        // Mapear solo los municipios de esa provincia
        const optionsHTML = provinciaEncontrada.towns.map(t =>
            // Usamos el label como value y text
            `<option value="${t.label}">${t.label}</option>`
        ).join('\n');

        municipioSelect.innerHTML += optionsHTML;
        localidadSelect.innerHTML += optionsHTML;
    }
}


let contadorPersonas = 1;

function generarResponsable() {
    contadorPersonas++;

    const contenedor = document.getElementById("personaAutorizada");

    contenedor.insertAdjacentHTML(
        "beforeend",
        `
        
        <div class="persona" id="persona${contadorPersonas}">
            <p>${contadorPersonas}º Persona autorizada</p>
            <button type="button" class="btnRestar" data-id="${contadorPersonas}">-</button>
            
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

            <button type="button" class="btnEliminar">Eliminar</button>
        </div>
        `
    );
}

function eliminarResponsable(id) {
    // No permitimos borrar la primera persona
    if (id === "persona1") return alert("La primera persona no se puede eliminar.");

    const persona = document.getElementById(id);
    if (persona) persona.remove();
}

// ======================================================
// DELEGACIÓN DE EVENTOS → Captura botones dinámicos
// ======================================================
document.addEventListener("click", e => {
    // Botón +
    if (e.target.id === "sumar") {
        generarResponsable();
    }

    // Botón restar (el propio contenedor)
    if (e.target.classList.contains("btnRestar")) {
        const id = "persona" + e.target.dataset.id;
        eliminarResponsable(id);
    }
});

// ==============================
//  EVENTOS INICIALES
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    cargarProvinciasInicial();

    document.getElementById("provincia").addEventListener("change", e => {
        cargarMunicipiosYLocalidades(e.target.value);
    });
});