let peliculas = [];
let contenedorCarteles;
let contenedorEntradas;
let contenedorPrecio;

function generarCarteles(){
peliculas = cartelera;

const carteles = document.createElement("div")
peliculas.forEach(p => {
    carteles.classList.add("col-3", "d-flex", "flex-column", "p-2");
    carteles.innerHTML += `
                <div class="cartel">
                    <img src="${p.poster}">
                    <h3>${p.titulo}</h3>
                    <p>Precio:</p>
                    <p>${p.precio} €</p>
                    <br>
                    <p>$Stock:${p.butacas}</p>
                    <input id="input-catidad-${p.id}" min="1" max="${p.butacas}" type="number">
                    <button class="btn" value="comprar" onclick="agregarAlCarrito(p.id)">Comprar</button>
                </div>
    `
})

    contenedorCarteles.appendChild(carteles);

let input = document.getElementById(`input-cantidad-${p.id}`);
 input.addEventListener("input", (e) => validarInput(e.target));
}

function validarInput (input) {
 let max = parseInt(input.max);
 let value = parseInt(input.value);

 if(isNaN(max) || value < 1 || value > max){
     input.classList.add("is-invalid");
     return false;
 }
 input.classList.remove("is-invalid");
 return true;
}

function agregarAlCarrito (id) {
    const input = document.getElementById(`input-cantidad-${id}`);

let value = parseInt(input.value);
let pelicula = cartelera.find(p => p.id === id);

if(!validarInput(input)){
    alert("Cantidad invalida o stock insuficiente");
    return;
}

if(pelicula.butacas < value){
    alert("Lo sentimos no hay mas butacas disponibles");
    return;
}
pelicula.butacas -= value;

const peliCarrito = peliculas.find(p => p.id === id);

if(peliCarrito){
    peliCarrito.cantidad += value;
}else{
    peliculas.push({ ...pelicula, butacas: value});
}
actualizarVistaPeliculas(pelicula);
}

actualizarVistaPeliculas()


function modificarCantidadEntradas(id, cambio){

    let pelicula = cartelera.find(p => p.id === id);
    let peliculaItem = peliculas.find(p => p.id === id);

    if(!peliculaItem){return}

    if(peliculaItem.butacas === 0 && cambio > 0){alert("No quedan entradas"); return;}
    if(cambio < 0 && peliculaItem.butacas <= 1){return;}

    peliculaItem.butacas += cambio;
    pelicula.butacas -= cambio;

    actualizarVistaPeliculas(pelicula);
    generarVistaCarrito();
}
function generarVistaCarrito(pelicula){
    contenedorEntradas.innerHTML += `
                <div class="entrada">
                <button id="${pelicula.id}Restar" class="btn">-</button>
                <
</div>
            `
}

document.addEventListener("DOMContentLoaded", () => {
    contenedorCarteles = document.querySelector("#contenedor-peliculas");
    contenedorEntradas = document.querySelector("#lista-tickets");
    contenedorPrecio = document.querySelector("#precio-final");

    generarCarteles()
    contenedorPrecio.innerHTML = "0.00";


});