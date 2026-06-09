let comunidadSelect = null;

function ordenarComunidades(lista){
    const filtro = document.getElementById("ordenarPor").value;

    if(filtro === "Nombre"){
        return lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }else if(filtro === "Población"){
        return lista.sort((a, b) => b.poblacion - a.poblacion);
    }

    return lista;
}

function generarListaComunidades(){
    const contenedorLista = document.getElementById("listaComunidades");
    const comunidadesOrdenadas = ordenarComunidades([...new Set(ccaa)]);

    const encabezadoHTML = `
        <li id="listaComunidades">
            <samp>Comunidad /Ciudad Autonómica</samp>
            <samp>Población total (aprox.)</samp>
        </li>
    `;

    const comunidadesHTML = comunidadesOrdenadas
        .map(c =>`
            <li > 
                ${c.nombre} - ${c.poblacion.toLocaleString('es-ES')}
            </li>`)
        .join("");

    contenedorLista.innerHTML = encabezadoHTML + comunidadesHTML;

}

function rellenarFormulario(comunidad){
    if(!comunidad) return;

    document.getElementById("comunidadAut").value = comunidad.nombre;
    document.getElementById("capital").value = comunidad.capital;
    document.getElementById("presidente").value = comunidad.presidente;
    document.getElementById("provincia").value = rellenarTextArea(comunidad);

    validarBotonPresidente();
}

function obtenerComunidad(nombre) {
    return ccaa.find(c => c.nombre === nombre);
}

function rellenarTextArea(comunidad){
    return comunidad.provincias.map(p => p.nombre).join('\n');
}

function limpiarFormulario(){
    document.getElementById("comunidadForm").reset();
    document.getElementById("provincia").value = "";
    validarBotonPresidente();
    comunidadSelect = null;
    ocultarMensajes();
}

function validarBotonPresidente() {
    const presidente = document.getElementById("presidente").value.trim();
    const botonGuardar = document.getElementById("botonGuardar");

    botonGuardar.disable = !comunidadSelect || presidente.value === "";

}

function mostrarMensaje(texto, esError){
    ocultarMensajes();

    const bloqueForm = document.getElementById("comunidadForm");
    const mensajeDiv = document.createElement("div");
    mensajeDiv.id = "mensajeValidacion";

    if(esError){
        mensajeDiv.classList.add("mensajeError");
    }else{
        mensajeDiv.classList.remove("mensajeExito");
    }

    bloqueForm.appendChild(mensajeDiv);

    if(!esError){
        setTimeout(() =>{
            if(mensajeDiv.parentNode){
                mensajeDiv.remove();
            }
        }, 4000);
    }

}

function ocultarMensajes() {
    const mensajeDiv = document.getElementById("mensajeValidacion");
    if(mensajeDiv){
        mensajeDiv.remove();
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    generarListaComunidades();
    validarBotonPresidente();

    const filtroSelect = document.getElementById("ordenarPor");
    const listaComunidad  = document.getElementById("listaComunidad");
    const imputPresidente = document.getElementById("presidente");
    const formulario = document.getElementById("comunidadForm");

    filtroSelect.addEventListener("change", function(){
        generarListaComunidades();
        limpiarFormulario();
        listaComunidad.querySelector("li.selected").forEach(li => li.classList.remove("selected"));
    })

    imputPresidente.addEventListener("input", validarBotonPresidente)

    listaComunidad.addEventListener("click", (e) =>{
        const liClickeado = e.target.closest("li");
        if(!liClickeado) return;

        const selecionado = liClickeado.classList.contains("selected");

        listaComunidad.querySelectorAll("li.selected").forEach(li => li.classList.remove("selected"));
        ocultarMensajes();

        if(selecionado){
            limpiarFormulario();
        }else{
            liClickeado.classList.add("selected");
            const nombreComunidad = liClickeado.dataset.nombre;

            comunidadSelect = obtenerComunidad(nombreComunidad);
            rellenarFormulario(comunidadSelect);
        }

    });

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const nuevoPresidente = imputPresidente.value.trim();

        if (nuevoPresidente === "") {
            mostrarMensaje("El campo del presidente no puede estar vacío.", true);
            return;
        }

        if (comunidadActual) {
            comunidadActual.presidente = nuevoPresidente;

            mostrarMensaje("¡Cambios guardados correctamente!", false);
        }
    });
})