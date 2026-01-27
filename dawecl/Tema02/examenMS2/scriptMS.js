//Listar provincias (ordenar - nombre, poblacionTotal descendente) en función de lo escogido en el select
//Al pulsar un nombre en la lista se rellenan los datos
//Se comprueba si el input de nombre de presidente no esta vacío, si lo esta el botón esta desabilitado
//El botón te permite rellenar el text area con las provincias de la comunidad seleccionada
//Examen Martin Sierra

//variable global
let comunidadActual = null;
function ordenarPorNombreOPoblacion(lista){
    const filtro = document.getElementById("sltFiltro").value;

    if(filtro === "Nombre"){
        return lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }else if(filtro === "poblacionTotal"){
        return lista.sort((a, b) => a.poblacion_total - b.poblacion_total);
    }
    return lista;
}
function generarListaComunidades(){
    const comunidades = document.getElementById("comunidadesList");
    const listaSinOrdenar = [...ccaa];
    const listaOrdenada = ordenarPorNombreOPoblacion(listaSinOrdenar);

    comunidades.innerHTML = listaOrdenada
        .map(c => `<li value="${c.nombre}">${c.nombre}   ${c.poblacion_total}</li>`)
        .join('');
}

function rellenarFormulario(comunidad) {
    if (!comunidad) return;

    document.getElementById("comunidad").value = comunidad.nombre;
    document.getElementById("capital").value = comunidad.capital;
    document.getElementById("presidente").value = comunidad.presidente;
    document.getElementById("output").value = rellenarTextArea(comunidad);

}

function obtenerComunidad(nombre) {
    return [...ccaa].find(c => c.nombre === nombre);
}

function limpiarFormulario() {
    document.getElementById("comunidadForm").reset();
   document.getElementById("output").value = "";
}

function rellenarTextArea(comunidad) {
    return comunidad.provincias.map(p => `<p>${p.nombre}</p>`).join('');
}

document.addEventListener("DOMContentLoaded", () =>{
    generarListaComunidades()
    /*const contenedorForm = document.getElementById("comunidadForm");

    contenedorForm.addEventListener("focusout", validarCampo);*/

    const contenedorC = document.querySelector("#comunidadesList");
    const botonGuardar = document.querySelector("#guardar");

    // Evento Click en la lista (Delegación) No funciona, al hacer click no se rellenan los inputs
    contenedorC.addEventListener("click", (e) => {
        if (e.target.tagName !== "li") return;

        const liClickeado = e.target;
        const estaSeleccionado = liClickeado.classList.contains("selected");

        // Limpiamos selección visual de todos
        contenedorC.querySelectorAll("li.selected").forEach(li => li.classList.remove("selected"));


        if (estaSeleccionado) {
            limpiarFormulario();
            comunidadActual = null;
        } else {
            liClickeado.classList.add("selected");
            const nombreComunidad = liClickeado.textContent.trim();
            comunidadActual = obtenerComunidad(nombreComunidad);
            rellenarFormulario(comunidadActual);
        }
    });

  /*  botonGuardar.addEventListener("click", (e) => {

    })
*/
})