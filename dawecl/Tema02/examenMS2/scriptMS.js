let comunidadActual = null;
let listaComunidadGlobal = [];

function obtenerComunidad(nombre) {
    return listaComunidadGlobal.find(c => c.nombre === nombre);
}

function ordenarPorNombreOPoblacion(lista) {
    const filtro = document.getElementById("sltFiltro").value;

    if (filtro === "nombre") {
        return lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (filtro === "poblacionTotal") {
        return lista.sort((a, b) => b.poblacion_total - a.poblacion_total);
    }
    return lista;
}

function filtrarPorBuscador(listaPoblacion) {
    const texteBusqueda = document.getElementById("buscador").value.toLowerCase().trim();

    if(texteBusqueda == "") { return listaPoblacion;}

    return listaPoblacion.filter(pob => pob.nombre.toLowerCase().includes(texteBusqueda));
}

function sumarPoblacion(listaComunidades) {
    return listaComunidades.reduce((acc, comunidad) =>{
        return acc + comunidad.poblacion_total;
    },0)
}

function generarListaComunidades() {
    const comunidadesBody = document.getElementById("comunidadesBody");
    let listaProcesada = [...listaComunidadGlobal];
    const headerPoblacion = document.getElementById("poblacionTotal");

    listaProcesada = filtrarPorBuscador(listaProcesada);

    listaProcesada = ordenarPorNombreOPoblacion(listaProcesada);

    const totalPob = sumarPoblacion(listaProcesada);
    headerPoblacion.textContent = `(${totalPob.toLocaleString('es-ES')} total UE)`;

    const filasComunidades = listaProcesada
        .map(c => `
            <tr data-nombre="${c.nombre}">
                <td>${c.nombre}</td>
                <td style="text-align: right;">${c.poblacion_total.toLocaleString('es-ES')}</td>
            </tr>
        `)
        .join('');

    comunidadesBody.innerHTML = filasComunidades;
}

function rellenarFormulario(comunidad) {
    if (!comunidad) return;

    document.getElementById("comunidad").value = comunidad.nombre;
    document.getElementById("capital").value = comunidad.capital;
    document.getElementById("presidente").value = comunidad.presidente;
    document.getElementById("output").value = rellenarTextArea(comunidad);

    validarBotonPresidente();
}

function limpiarFormulario() {
    document.getElementById("comunidadForm").reset();
    document.getElementById("output").value = "";
    comunidadActual = null;
    validarBotonPresidente();
    ocultarMensajes();

    document.getElementById("presidente").classList.remove("input-error");
    document.getElementById("errorPresidente").style.display = "none";
}

function rellenarTextArea(comunidad) {
    return comunidad.provincias.map(p => p.nombre).join('\n');
}

function validarBotonPresidente() {
    const inputPresidente = document.getElementById("presidente").value.trim();
    const botonGuardar = document.getElementById("guardar");

    botonGuardar.disabled = !comunidadActual || inputPresidente === "";
}

function mostrarMensaje(texto, esError) {
    ocultarMensajes();

    const form = document.getElementById("comunidadForm");
    const mensajeDiv = document.createElement("div");
    mensajeDiv.id = "mensajeValidacion";
    mensajeDiv.textContent = texto;

    if (esError) {
        mensajeDiv.classList.add("mensaje-error");
    } else {
        mensajeDiv.classList.add("mensaje-exito");
    }

    form.appendChild(mensajeDiv);

    if (!esError) {
        setTimeout(() => {
            if (mensajeDiv.parentNode) {
                mensajeDiv.remove();
            }
        }, 4000);
    }
}

function ocultarMensajes() {
    const msjPrevio = document.getElementById("mensajeValidacion");
    if (msjPrevio) {
        msjPrevio.remove();
    }
}

function inicializarDatos(){
    const datosGuardados = localStorage.getItem("comunidadesDatos");

    if (datosGuardados) {
        listaComunidadGlobal = JSON.parse(datosGuardados);
    } else {
        listaComunidadGlobal = [...ccaa]
    }
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarDatos();
    generarListaComunidades();
    validarBotonPresidente();

    const selectFiltro = document.getElementById("sltFiltro");
    const tablaCuerpo = document.getElementById("comunidadesBody");
    const inputPresidente = document.getElementById("presidente");
    const formulario = document.getElementById("comunidadForm");
    const inputBuscar = document.getElementById("buscador");

    selectFiltro.addEventListener("change", () => {
        generarListaComunidades();
        limpiarFormulario();
        tablaCuerpo.querySelectorAll("tr.selected").forEach(tr => tr.classList.remove("selected"));
    });

    inputBuscar.addEventListener("input", () => {
        generarListaComunidades();
        limpiarFormulario();
        tablaCuerpo.querySelectorAll("tr.selected").forEach(tr => tr.classList.remove("selected"));
    })

    inputPresidente.addEventListener("input", () => {
        validarBotonPresidente();
        const valorInput = inputPresidente.value.trim();

        if (comunidadActual && valorInput === "") {
            inputPresidente.classList.add("input-error");
            document.getElementById("errorPresidente").style.display = "block";
        } else if (valorInput !== "") {
            inputPresidente.classList.remove("input-error");
            document.getElementById("errorPresidente").style.display = "none";
        }
    });

    tablaCuerpo.addEventListener("click", (e) => {
        const trClickeado = e.target.closest("tr");
        if (!trClickeado) return;

        inputPresidente.classList.remove("input-error");
        document.getElementById("errorPresidente").style.display = "none";

        const estaSeleccionado = trClickeado.classList.contains("selected");

        tablaCuerpo.querySelectorAll("tr.selected").forEach(tr => tr.classList.remove("selected"));
        ocultarMensajes();

        if (estaSeleccionado) {
            limpiarFormulario();
        } else {
            trClickeado.classList.add("selected");
            const nombreComunidad = trClickeado.dataset.nombre;

            comunidadActual = obtenerComunidad(nombreComunidad);
            rellenarFormulario(comunidadActual);
        }
    });

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const nuevoPresidente = inputPresidente.value.trim();

        if (nuevoPresidente === "") {
            mostrarMensaje("El campo del presidente no puede estar vacío.", true);
            return;
        }

        if (comunidadActual) {
            comunidadActual.presidente = nuevoPresidente;

            localStorage.setItem("comunidadesDatos", JSON.stringify(listaComunidadGlobal));

            mostrarMensaje("¡Cambios guardados correctamente!", false);
        }
    });
});