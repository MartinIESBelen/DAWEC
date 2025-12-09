
function tablaProducto(producto) {
    document.getElementById("productos").innerHTML +=
    `
    <div class="producto">
        <img class="productoImage" src=${producto.imagen}>
        <h3>${producto.nombre}</h3>
        <p>Precio: ${producto.precio} €</p>
        <input type="number" name="cantidad" id="cantidad">
        <button id="comprar${producto.id}">Comprar</button>
    </div>
    `;
}

function generarProducto(productos) {
    productos.forEach(p => tablaProducto(p));
}

function llenarCarrito(producto){
    document.getElementById("carritos").innerHTML +=
    `
    <div class="elemento">
        <button id="menos${producto.id}">-</button>
        <
        <button id="mas${producto.id}">+</button>
        
    </div>
    `;
}



document.addEventListener("DOMContentLoaded", () =>{
    generarProducto(productos);

    let btnComprar = document.getElementById("comprar");
    btnComprar.addEventListener("click", function(){

    })
})

