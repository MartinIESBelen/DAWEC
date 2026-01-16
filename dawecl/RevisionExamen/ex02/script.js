import {datosUE} from "./JA_uecountries.js";

function ordenarAlfabetacamentePaises(){

    return [...datosUE].sort((a,b) => a.pais.localeCompare(b.pais));
}

function idiomasSinRepetir(){
    let idiomas = new Set();

    datosUE.forEach(p => {
        if(p.idiomas?.oficial){
            p.idiomas.oficial.split(", ").forEach(i => idiomas.add(i.toLowerCase().trim()));
        }

        if(p.idiomas?.otros_idiomas){
            p.idiomas.otros_idiomas.split(", ").forEach(i => idiomas.add(i.toLowerCase().trim()));
        }
    })

    return [...idiomas];
}

function ordenarAlfabetacamenteIdiomas(){
    return idiomasSinRepetir().sort((a,b) => a.localeCompare(b));
}

function listaNombrePaises(){

    return ordenarAlfabetacamentePaises().map(n => n.pais);
}

function pintarCheckBoxesIdiomas(){
    let contenedor = document.getElementById("listaPaisesRadio");

     contenedor.innerHTML = ordenarAlfabetacamenteIdiomas().map(i => `
                <label>
                    <input type="radio" name="pais" value="${i}">
                    ${i}
                </label>
            `).join("");
}

function sumarPoblacionPorIdioma(){

}

function pintarTablaPaises(){
    let contenedor = document.getElementById("tablaPaises");

    contenedor.innerHTML += ordenarAlfabetacamentePaises().map(p => `
                <tr>
                    <td>${p.pais}</td>
                    <td>${p.capital}</td>
                    <td>${p.poblacion_nacional}</td>
                    <td>${p.fecha_adhesion}</td>
                </tr>    
    `).join("");
}


addEventListener("DOMContentLoaded", () =>{
    pintarCheckBoxesIdiomas()
    pintarTablaPaises()
})