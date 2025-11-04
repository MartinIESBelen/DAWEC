import {countries} from "./filtrospelis.js";
import {genders} from "./filtrospelis.js";
import {pelis} from "./filmList.js";

function buscarTitulo(peliculas, nombre){
    return peliculas.filter(peli => peli.Title.toLowerCase().includes(nombre.toLowerCase()));
}

function buscarDirector(peliculas, director){
    return pelis.filter(peli => peli.Director.toLowerCase().includes(director.toLowerCase()));
}

function buscarActores(pelis, actor){
    return pelis.filter(peli => peli.Actors.toLowerCase().includes(actor.toLowerCase()));
}

console.log(buscarTitulo(pelis, "Avatar"));

console.log(buscarDirector(pelis, "Christopher Nolan"));

console.log((buscarActores(pelis, "Bryan Cranston")))

function filtrarPorGenero(peliculas, generos){
    const peliculasFiltradas = peliculas.filter(p => {
        const generosPelis = p.Genre.toLowerCase().split(",").map(g=>g.trim());
        return generos.some(g => generosPelis.includes(g.toLowerCase()));
    })

    return peliculasFiltradas.sort((a, b) => a.Title.localeCompare(b.Title))
}

const pelisPorGenero = filtrarPorGenero(pelis, ["Action", "Adventure"]);

console.log(pelisPorGenero.map(p => p.Title))

function filtrarPorPaises(peliculas, pais){
    const listaFiltrada = peliculas.filter(p => {
        return p.Country.some(c => c.toLowerCase() === pais.toLowerCase())
    });

    return listaFiltrada.sort((a, b) => a.Title.localeCompare(b.Title));
}

console.log(filtrarPorPaises(pelis, "USA").map(p => p.Title + " | Paises: " + p.Country));

/*function tipoBusqueda(categoria){
    if(categoria === undefined){
        console.log("categoria no valida");
        return null;
    }

    if(categoria ==="titulo"){
        return "titulo";
    }
    if(categoria === "director"){
        return "director";
    }
    if(categoria === "actores"){
        return "actores";
    }
}


const contenedor = document.createElement("div");
document.body.appendChild(contenedor);

const titulo = document.createElement("h1");
titulo.innerHTML = "Peliculas";
document.body.appendChild(titulo);

let inputBuscador = document.createElement("input");
inputBuscador.placeholder = `Buscar por ${tipoBusqueda()}`;*/
