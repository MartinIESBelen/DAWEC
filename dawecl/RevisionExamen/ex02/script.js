import {datosUE} from "./JA_uecountries.js";
let columnaOrdenActual = "poblacion";
let ordenAscendente = false;

function ordenarPorPoblacion(lista){
    return [...lista].sort((a,b) => b.poblacion_nacional - a.poblacion_nacional);
}

function ordenarPaises(lista) {
    return [...lista].sort((a, b) => {
        let comparacion = 0;

        if (columnaOrdenActual === "pais") {
            comparacion = a.pais.localeCompare(b.pais);
        } else if (columnaOrdenActual === "poblacion") {
            comparacion = a.poblacion_nacional - b.poblacion_nacional;
        }
        return ordenAscendente ? comparacion : -comparacion;
    });
}

function idiomasSinRepetir(){
    let idiomas = new Set();

    datosUE.forEach(p => {
        if(p.idiomas?.oficial){
            p.idiomas.oficial.split(", ").forEach(i => idiomas.add(i.toLowerCase().trim()));
        }
        if( p.idiomas?.otros_idiomas){
            p.idiomas.otros_idiomas.split(", ").forEach(i => idiomas.add(i.toLowerCase().trim()));
        }
    });
    return [...idiomas].sort((a,b) => a.localeCompare(b));
}

function pintarRadioIdiomas(){
    const contenedor = document.getElementById("listaPaisesRadio");

    const radioActivo = document.querySelector('input[name="idioma"]:checked');
    const idiomaPrevio = radioActivo ? radioActivo.value : "Ninguno";

    const idiomas = idiomasSinRepetir();

    const mantenerIdioma = idiomas.includes(idiomaPrevio) ? idiomaPrevio : "Ninguno";


    let htmlRadios = `
        <label style="margin-right: 10px;">
            <input type="radio" name="idioma" value="Ninguno" ${mantenerIdioma === "Ninguno" ? "checked" : ""}>
            <strong>Ninguno</strong>
        </label>
    `;

    htmlRadios += idiomas.map(i => `
        <label style="margin-right: 10px;">
            <input type="radio" name="idioma" value="${i}" ${mantenerIdioma === i ? "checked" : ""}>
            ${i}
        </label>
    `).join("");

    contenedor.innerHTML = htmlRadios;
}

function sumarPoblacionTotal(){
    const listaPaises = [...datosUE];
    return listaPaises.reduce((acumulador, pais) => {
        return acumulador + pais.poblacion_nacional;
    }, 0);
}

function calcularMediaPoblacion(lista){
    return sumarPoblacionTotal(lista) / lista.length;
}


function pintarTablaPaises(listaPaises){
    const tbody = document.getElementById("cuerpoTablaPaises");
    const headerPoblacion = document.getElementById("totalPoblacionHeader");

    const listaOrdenada = ordenarPaises(listaPaises);

    const totalPob = sumarPoblacionTotal();
    headerPoblacion.textContent = `(${totalPob.toLocaleString('es-ES')} total UE)`;

    const mediaPoblacionUE = calcularMediaPoblacion(datosUE);

    const flechaAsc = "⬆️";
    const flechaDesc = "⬇️";
    document.getElementById("flechaPais").textContent = columnaOrdenActual === "pais" ? (ordenAscendente ? flechaAsc : flechaDesc) : "";
    document.getElementById("flechaPoblacion").textContent = columnaOrdenActual === "poblacion" ? (ordenAscendente ? flechaAsc : flechaDesc) : "";

    tbody.innerHTML = listaOrdenada.map(p => {

        let esMonarquia = p.regimen_politico && p.regimen_politico.tipo.toLowerCase().includes("monarquía");
        let corona = esMonarquia ? "👑" : "";

        let superaMedia = p.poblacion_nacional > mediaPoblacionUE;
        let nombrePais = superaMedia ? `<strong>${p.pais}</strong>` : p.pais;

        let fechaArreglada = new Date(p.fecha_adhesion).toLocaleDateString('es-ES');

        let htmlCiudades = obtenerListaCiudades(p);

        return`
        <tr>
            <td>${nombrePais}${corona}</td>
            <td>${p.capital}</td>
            <td>${htmlCiudades}</td>
            <td>${p.poblacion_nacional.toLocaleString('es-ES')}</td>
            <td>${fechaArreglada}</td>
        </tr>    
    `}).join("");
}

function cambiarOrden(nuevaColumna) {
    if (columnaOrdenActual === nuevaColumna) {
        ordenAscendente = !ordenAscendente;
    } else {
        columnaOrdenActual = nuevaColumna;
        ordenAscendente = false;
    }
    filtrarTablaPaises();
}

function obtenerListaCiudades(p){
        if (p.ciudades_principales && p.ciudades_principales.length > 0) {
            return `
                <ul style="margin: 0; padding-left: 20px;">
                    ${p.ciudades_principales.map(ciudad =>
                `<li>${ciudad.nombre} (${ciudad.poblacion.toLocaleString('es-ES')})</li>`
            ).join('')}
                </ul>
            `;
        } else {
            return "<em>Sin ciudades registradas</em>";
        }
}


function filtrarTablaPaises(){
    const soloMetropolis = document.getElementById("cbMetropolis").checked;
    const soloOficiales = document.getElementById("cbIdiomaOfi").checked;
    const idiomaSelect = document.querySelector('input[name="idioma"]:checked');
    const idioma = idiomaSelect ? idiomaSelect.value : "Ninguno";

    let paisesFiltrados = datosUE;

    if (idioma !== "Ninguno"){
        paisesFiltrados = datosUE.filter(p => {
            const arrayOficiales = p.idiomas?.oficial ? p.idiomas.oficial.toLowerCase().split(",").map(i => i.trim()) : [];
            const arrayNoOficiales = p.idiomas?.otros_idiomas ? p.idiomas.otros_idiomas.toLowerCase().split(",").map(i => i.trim()) : [];

            const esOficial = arrayOficiales.includes(idioma);
            const noEsOficial = arrayNoOficiales.includes(idioma);

            return soloOficiales ? esOficial : esOficial || noEsOficial;
        })
    }

    if (soloMetropolis) {
        paisesFiltrados = paisesFiltrados.filter(p => {
            if (!p.ciudades_principales || p.ciudades_principales.length === 0) return false;
            return p.ciudades_principales.some(ciudad => ciudad.poblacion > 1500000);
        });
    }

    pintarTablaPaises(paisesFiltrados);

    const infoBadge = document.getElementById("infoFiltro");
    if (idioma === "Ninguno" && !soloMetropolis) {
        infoBadge.textContent = `Se muestran los ${paisesFiltrados.length} países de la UE`;
    } else {
        const tipoTexto = soloOficiales ? "oficial" : "Todos";
        let mensaje = `Filtrado por: "${idioma}" (${tipoTexto})`;
        if (soloMetropolis) mensaje += ` + Gran Metrópolis`;
        infoBadge.textContent = `${mensaje} (${paisesFiltrados.length} de ${datosUE.length})`;
    }
}




document.addEventListener("DOMContentLoaded", () =>{
    pintarRadioIdiomas();
    pintarTablaPaises(datosUE);

    document.getElementById("infoFiltro").textContent = `Se muestran los ${datosUE.length} países de la UE`;

    document.getElementById("cbIdiomaOfi").addEventListener("change", () => {
        pintarRadioIdiomas();
        filtrarTablaPaises();
    });

    document.getElementById("listaPaisesRadio").addEventListener("change", (e) => {
        if (e.target.name === "idioma") {
            filtrarTablaPaises();
        }
    });

    document.getElementById("thPais").addEventListener("click", () => {
        cambiarOrden("pais");
    });

    document.getElementById("thPoblacion").addEventListener("click", () => {
        cambiarOrden("poblacion");
    });

    document.getElementById("cbMetropolis").addEventListener("change", () => {
        filtrarTablaPaises();
    });

});