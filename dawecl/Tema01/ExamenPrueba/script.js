import {genders} from "./filtrospelis.js";
import {pelis} from "./filmList.js";
import {countries} from "./filtrospelis.js";

function filtrarPorCampo(peliculas,campos, datoBuscar){
    return peliculas.filter(peli => {
        return campos.some(c => {
            if(typeof peli[c] !== "string")return false;
            return peli[c].toLowerCase().includes(datoBuscar.toLowerCase());
        })
    })
}

//console.log(buscarFiltrado(pelis,["Actors"], "Bryan Cranston"));

//console.log(buscarFiltrado(pelis,["Title"], "Avatar").map(t => t.Title));

//console.log(buscarFiltrado(pelis,["Director"], "Christopher Nolan").map(t => t.Director));

function filtrarPorGenero(peliculas, generos){
    const peliculasFiltradas = peliculas.filter(p => {
        const generosPelis = p.Genre.toLowerCase().split(",").map(g=>g.trim());
        return generos.some(g => generosPelis.includes(g.toLowerCase()));
    })
    return peliculasFiltradas.sort((a, b) => a.Title.localeCompare(b.Title))
}

//const pelisPorGenero = filtrarPorGenero(pelis, ["Action", "Adventure"]);

//console.log(`Peliculas por generos: ${pelisPorGenero.map(p => p.Title)}`)

function filtrarPorPaises(peliculas, pais){
    const listaFiltrada = peliculas.filter(p => {
        const paises = p.Country.map(c => c.toLowerCase())

        return paises.includes(pais.toLowerCase());
    });
    return listaFiltrada.sort((a, b) => a.Title.localeCompare(b.Title));
}

//console.log(filtrarPorPaises(pelis, "USE"));

function agruparGeneros(){
    const generosCheck = Array.from(document.querySelectorAll("#genero input[type='checkbox']:not(#checkTodo)"));
    const cbTodo = document.getElementById("checkTodo");
    if(cbTodo && cbTodo.checked){
        generosCheck.forEach((g) =>g.checked = false );
        return genders;
    }
    const selecionados = generosCheck.filter(c => c.checked).map(c => c.value);
    return selecionados.length > 0 ? selecionados : genders;
}

function agruparCampos(){
    return Array.from(document.querySelectorAll("#campo input[type='checkbox']:checked"))
        .map(s => s.value);
}

function optenerImagen(pelicula){
    return pelicula.Images[0];
}

function optenerPeliculasFiltradas(){
    const generos = agruparGeneros();
    const campos = agruparCampos();
    const text = document.getElementById("inputBusqueda").value;
    const pais = document.getElementById("paises").value;

    let listaFinal = [...pelis]

    if(campos.length > 0 && text.trim() !== ""){
        listaFinal = filtrarPorCampo(listaFinal, campos, text);

        if(listaFinal.length === 0)return [];
    }

    if (generos.length > 0)listaFinal = filtrarPorGenero(listaFinal, generos);

    if(pais === null)listaFinal = filtrarPorPaises(listaFinal, pais);
    return listaFinal;
}

function mostrarPeliculas(resultado){

    const contenedorPeliculas = document.getElementById("resultado");
    const infoPelis = document.getElementById("informacion");

    infoPelis.innerHTML = "";
    if(contenedorPeliculas.length === 0){
        contenedorPeliculas.innerHTML = `<p>No se encontraron peliculas con estas caracteristicas</p>`;
    }

    contenedorPeliculas.innerHTML =
        resultado.map(p => `<p>${p.Title}</p>
                            <img width="300" height="230" src="${optenerImagen(p)}""></img>
                            <button type="button" class="btnInfo" data-titulo="${p.Title}">Información</button>
                            <br>
                            <p>${p.Genre.split(",")
            .map(g => `<label style="background-color: blue">${g}</label>`)
            .join(" ")}</p>`)
            .join("");

    const botones = document.querySelectorAll(".btnInfo");

    botones.forEach(boton => {
        boton.addEventListener("click", () =>{
            let titulo = boton.dataset.titulo;
            const peli = pelis.find(p => p.Title === titulo);
            mostrarInformacionPeli(peli);})
    })
}


function mostrarInformacionPeli(peli){
    const htmlInfoPeli = document.getElementById("informacion")

    const contenido = Object.entries(peli)
        .map(([clave,valor])=>{
            if(Array.isArray(valor)){
                valor = valor.join(", ")
            }
            return `<p><strong>${clave}</strong> : ${valor}</p>`
        })
        htmlInfoPeli.innerHTML = `<div>${contenido}</div>`;

}

//console.log(filtrarPorPaises(pelis, "USA").map(p => p.Title + " | Paises: " + p.Country));

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor");

    contenedor.innerHTML = `
        <label type="text" for="inputBusqueda">Texto:</label>
        <br>
        <input type="text" id="inputBusqueda">
        <br>
        <div id="campo">
        <input type="checkbox" id="titulo" value="Title"><label for="titulo">Titulo</label>
        <input type="checkbox" id="director" value="Director"><label for="director">Director</label>
        <input type="checkbox" id="actor" value="Actors"><label for="actor">Actor</label>
        </div>
        <br>
        <div>
        <label id="pais">Countries:</label>
        <select id="paises">
        <option value="todosPaises">Todos</option>
        ${countries.map(c => `<option value="${c}">${c}</option>`)}
        </select>
        </div>
        <br>
        <div id="genero">
            <input type="checkbox" id="checkTodo"><label for="checkTodo">Todos los valores</label>
            ${genders.map(c => `<input value="${c}" id="${c}" type="checkbox"><label for="${c}">${c}</label>`).join('')}
            <button type="button" id="btnBuscador">Buscar</button>
        </div>
        <div id="resultado"></div>
        <div id="informacion"></div>
        `
    const botonCartel = document.getElementById("btnBuscador");
    botonCartel.addEventListener("click" , ()=>{
        const resultado = optenerPeliculasFiltradas();
        mostrarPeliculas(resultado);
    });

})