//Ej1
const TABLE = document.getElementById("age-tabla");
//document.querySelector('.age-tabla');

let labels = TABLE.querySelectorAll("label");


let tds = TABLE.querySelectorAll("td");
let tdAge = Array.from(tds).find(td => td.textContent === "Age");
let tdAgeExist = Array.from(tds).some(td => td.textContent === "Age");
console.log(tdAge);
console.log(tdAgeExist);

let nombreName = document.getElementsByName("search")[0];

let formulario = document.querySelector('form[name="search"]');

let primerInput = document.querySelector('form[name="search"] input');
//forSearch.querySelector("input")

let ultimoInput = document.querySelector('form[name="search"] input:last-child');
//forSearch.querySelector("input:last-child")

//Ej2
const LINKS = document.querySelectorAll('a');

//Contar el número de enlaces
let countLinks = LINKS.length;
console.log(countLinks);

//Encontrar el penultimo enlace
let penultimoLink = LINKS[countLinks -2]
console.log(penultimoLink);

//Numero de links del instituto
let instituteLink = Array.form(LINKS).find(l => l.textContent === "IES Belén");
let countInstituteLink = instituteLink.length;
console.log(countInstituteLink);

//Apuntamos al ultimo parrafo
const PARAGRAF_THIRD = document.querySelector('div[id="contenedor2"] p:last-child');

//Contamos el numero de links del ultimo parrafo
const LINKS_THIRD = PARAGRAF_THIRD.querySelectorAll('a');
let countThirdsLinks = LINKS_THIRD.length;
console.log(countThirdsLinks);


