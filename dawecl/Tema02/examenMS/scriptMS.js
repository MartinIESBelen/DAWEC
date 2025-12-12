
function generarPaises(){
    const paisesUl = document.getElementById("paisesList");

    paisesUl.innerHTML = datosUE
        .map(p => `<li value="${p.pais}">${p.pais}</li>`)
        .join('');
}

function generarIdiomas(pais) {

    if (!pais?.idiomas?.otros_idiomas) return "";

    const lista = pais.idiomas.otros_idiomas.split(", ");

    return lista.map(i => `
        <div class="idioma">
            <input type="text" value="${i}" readonly>
            <button type="button" class="btnEliminar">Eliminar</button>
        </div>
    `).join('');
}


function generarRegimenPolitico(){
    const select = document.getElementById("regimen_tipo");

    const tipos = [...new Set(datosUE.map(p => p.regimen_politico.tipo))];

    select.innerHTML = tipos.map(t => `<option>${t}</option>`).join("");
}


function optenerPais(nombre){
    return datosUE.find(dato => dato.pais === nombre);
}


function agregarIdioma(pais) {
    if (!pais || !pais.idiomas) {
        console.warn("agregarIdioma() llamado sin país");
        return;
    }

    const otros = pais.idiomas.otros_idiomas
        ? pais.idiomas.otros_idiomas.split(", ")
        : [];

    // lógica...
}

function agregarIdiomaManual() {
    const div = document.createElement("div");
    div.classList.add("idioma");

    div.innerHTML = `
        <input type="text" value="" placeholder="Nuevo idioma">
        <button type="button" class="btnEliminar">Eliminar</button>
    `;

    document.getElementById("otrosIdiomasContainer").appendChild(div);
}

function eliminarIdioma(e) {
    if (!e.target.classList.contains("btnEliminar")) return;

    e.target.parentElement.remove();
}

function transformarFecha(fechaISO) {
    if (!fechaISO) return "";

    // Convertimos a objeto Date
    const fecha = new Date(fechaISO);

    if (isNaN(fecha)) return ""; // por si viene una fecha inválida

    const dia  = String(fecha.getDate()).padStart(2, "0");
    const mes  = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
}

function mostrarJson(pais) {
    const out = document.getElementById("output");

    out.value = JSON.stringify(pais, null, 4);
}

document.addEventListener('DOMContentLoaded',() =>{
    generarPaises();

    generarRegimenPolitico()
    const contenedorUl = document.querySelector("#paisesList");
    const inputName = document.querySelector("#pais");
    const inputPoblacion = document.querySelector("#poblacion_nacional");
    const inputFechaAdesion = document.querySelector("#fecha_adhesion");
    const inputCapital = document.querySelector("#capital");
    const inputIdiomaOficial = document.querySelector("#idioma_oficial");
    const divOtrosIdiomas = document.querySelector("#otrosIdiomasContainer");
    const selectRegimen = document.getElementById("regimen_tipo");

    contenedorUl.addEventListener("click", (e) => {

        contenedorUl.querySelectorAll("li.selected").forEach(li => li.classList.remove("selected"));
        e.target.classList.add("selected");

        const nombrePais = e.target.textContent.trim();
        const paisSelecionado = optenerPais(nombrePais);
        inputName.value = paisSelecionado.pais;
        inputPoblacion.value = paisSelecionado.poblacion_nacional;
        inputFechaAdesion.value = paisSelecionado.fecha_adhesion;
        inputCapital.value = paisSelecionado.capital;
        inputIdiomaOficial.value = paisSelecionado.idiomas.oficial;
        divOtrosIdiomas.innerHTML = generarIdiomas(paisSelecionado);
        selectRegimen.value = paisSelecionado.regimen_politico.tipo;
    })



    document.getElementById("otrosIdiomasContainer").addEventListener("click", eliminarIdioma);
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        if(paisSelecionado)mostrarJson(paisSelecionado);
    });
});