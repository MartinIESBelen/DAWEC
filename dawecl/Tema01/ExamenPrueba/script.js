import {genders} from "./filtrospelis.js";
import {pelis} from "./filmList.js";
import {countries} from "./filtrospelis.js";

/*function buscarTitulo(peliculas, nombre){
    return peliculas.filter(peli => peli.Title.toLowerCase().includes(nombre.toLowerCase()));
}

function buscarDirector(peliculas, director){
    return pelis.filter(peli => peli.Director.toLowerCase().includes(director.toLowerCase()));
}

function buscarActores(pelis, actor){
    return pelis.filter(peli => peli.Actors.toLowerCase().includes(actor.toLowerCase()));
}*/

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
        return p.Country.some(c => c.toLowerCase() === pais.toLowerCase())
    });
    return listaFiltrada.sort((a, b) => a.Title.localeCompare(b.Title));
}

//console.log(filtrarPorPaises(pelis, "USE"));

function agruparGeneros(){
    return Array.from(document.querySelectorAll("#genero input[type='checkbox']:checked"))
        .map(s => s.value);
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
    let listaGeneros = filtrarPorGenero(pelis, generos);
    let listaCampos = filtrarPorCampo(pelis, campos, text);

    //let resultado =[...new Set([...listaGeneros, ...listaCampos])] ;

    return  [...listaGeneros, ...listaCampos]
        .filter((p, index, self) =>
            index === self.findIndex(o => o.Title === p.Title)
        );
}

function mostrarPeliculas(resultado){
    /*console.log("✔ Función mostrarPeliculas ejecutada");
    const generos = agruparGeneros();
    const campos = agruparCampos();
    const text = document.getElementById("inputBusqueda").value;
    let listaGeneros = filtrarPorGenero(pelis, generos);
    let listaCampos = filtrarPorCampo(pelis, campos, text);

    //let resultado =[...new Set([...listaGeneros, ...listaCampos])] ;

    let resultado = [...listaGeneros, ...listaCampos]
        .filter((p, index, self) =>
            index === self.findIndex(o => o.Title === p.Title)
        );*/

    document.getElementById("resultado").innerHTML =
        resultado.map(p => `<p>${p.Title}</p>
                            <img width="300" height="230" src="${optenerImagen(p)}""></img>
                            <button type="button" class="btnInfo" data-titulo="${p.Title}">Información</button>
                            <br>
                            <p>${p.Genre.split(",")
                                        .map(g => `<label style="background-color: blue">${g}</label>`)
                                        .join(" ")}</p>`)
                    .join("");

    const botones = document.querySelectorAll(".btnInfo");
    botones.forEach(botone => {
        botone.addEventListener("click", () =>{
            let titulo = botone.dataset.titulo;
            const peli = pelis.find(p => p.Title === titulo);
            mostrarInformacionPeli(peli);})
    })
}

function mostrarInformacionPeli(peli){
    document.getElementById("informacion").innerHTML =
        `<div>
        <p>${peli.Title}</p>
        <p>${peli.Year}</p>
        <p>${peli.Rated}</p>
        <p>${peli.Released}</p>
        <p>${peli.Runtime}</p>
        <p>${peli.Genre}</p>
        <p>${peli.Director}</p>
        <p>${peli.Writer}</p>
        <p>${peli.Actors}</p>
        <p>${peli.Plot}</p>
        <p>${peli.Language}</p>
        <p>${peli.Country.map(c => `<label>${c}</label>`).join("")}</p>
        <p>${peli.Awards}</p>
        <p>${peli.Poster}</p>
        <p>${peli.Metascore}</p>
        <p>${peli.imdbRating}</p>
        <p>${peli.imdbVotes}</p>
        <p>${peli.imdbID}</p>
        <p>${peli.Type}</p>
        <p>${peli.Response}</p>
        </div>`;
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