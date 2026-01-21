// --- VARIABLES GLOBALES (Declaradas pero no inicializadas) ---
// Las declaramos aquí con 'let' para que las funciones puedan verlas,
// pero no les damos valor todavía porque el HTML no existe.
let carrito = [];
let productsContainer;
let tableBody;
let totalGlobalSpan;

// --- FUNCIONES (La lógica no cambia) ---

function cargarProductos() {
    productsContainer.innerHTML = "";

    products.forEach(function(p) {
        // ... (resto del código de crear tarjeta igual que antes) ...
        const card = document.createElement("div");
        card.classList.add("col-3", "d-flex", "flex-column", "p-2");

        card.innerHTML = `
            <div class="border border-dark rounded h-100 d-flex flex-column">
                <img src="${p.imagen}" class="card-img-top p-2" style="height: 200px; object-fit: contain;">
                <div class="p-3 d-flex flex-column flex-grow-1">
                    <h4>${p.nombre}</h4>
                    <p>Precio: ${parseFloat(p.precio).toFixed(2)} €</p>
                    <p>Stock: <span id="stock-display-${p.id}">${p.stock}</span></p>
                    <div class="mt-auto">
                        <input class="form-control mb-2" type="number" 
                            id="input-cantidad-${p.id}" min="1" max="${p.stock}" value="1">
                        <button class="btn btn-success w-100 btn-comprar" data-id="${p.id}">
                            Comprar
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.appendChild(card);

        const input = document.querySelector(`#input-cantidad-${p.id}`);
        input.addEventListener("input", function(e) { validarInput(e.target); });
    });
}

function validarInput(input) {
    let value = parseInt(input.value);
    const max = parseInt(input.max);
    if (isNaN(value) || value < 1 || value > max) {
        input.classList.add("is-invalid");
        return false;
    } else {
        input.classList.remove("is-invalid");
        return true;
    }
}

function agregarAlCarrito(id) {
    const input = document.querySelector(`#input-cantidad-${id}`);
    if (!validarInput(input)) { alert("Error"); return; }

    const cantidad = parseInt(input.value);
    const producto = products.find(function(p) { return p.id === id; });

    if (producto.stock < cantidad) { alert("Sin stock"); return; }

    producto.stock -= cantidad;

    const itemCarrito = carrito.find(function(it) { return it.id === id; });
    if (itemCarrito) {
        itemCarrito.cantidad += cantidad;
    } else {
        carrito.push({ ...producto, cantidad: cantidad });
    }

    actualizarVistaProducto(producto);
    renderizarCarrito();
    input.value = 1;
}

function modificarCantidadCarrito(id, cambio) {
    const item = carrito.find(function(it) { return it.id === id; });
    const prod = products.find(function(p) { return p.id === id; });
    if (!item) return;

    if (cambio > 0 && prod.stock === 0) { alert("Sin stock"); return; }
    if (cambio < 0 && item.cantidad <= 1) return;

    item.cantidad += cambio;
    prod.stock -= cambio;

    actualizarVistaProducto(prod);
    renderizarCarrito();
}

function eliminarDelCarrito(id) {
    const item = carrito.find(function(it) { return it.id === id; });
    const prod = products.find(function(p) { return p.id === id; });

    prod.stock += item.cantidad;
    carrito = carrito.filter(function(it) { return it.id !== id; });

    actualizarVistaProducto(prod);
    renderizarCarrito();
}

function renderizarCarrito() {
    tableBody.innerHTML = "";
    let total = 0;
    carrito.forEach(function(item) {
        total += item.precio * item.cantidad;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <button class="btn btn-sm btn-primary me-1 btn-restar" data-id="${item.id}">-</button>
                <span class="fw-bold mx-1">${item.cantidad}</span>
                <button class="btn btn-sm btn-primary ms-1 btn-sumar" data-id="${item.id}">+</button>
            </td>
            <td>${item.nombre}</td>
            <td>${parseFloat(item.precio).toFixed(2)}</td>
            <td>${(item.precio * item.cantidad).toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm btn-eliminar" data-id="${item.id}">Eliminar</button></td>
        `;
        tableBody.appendChild(tr);
    });
    totalGlobalSpan.innerText = total.toFixed(2);
}

function actualizarVistaProducto(producto) {
    const stockDisplay = document.querySelector(`#stock-display-${producto.id}`);
    const input = document.querySelector(`#input-cantidad-${producto.id}`);
    if (stockDisplay) stockDisplay.innerText = producto.stock;
    if (input) input.max = producto.stock;
}

// --- INICIALIZACIÓN (AQUÍ ESTÁ LA CLAVE) ---

document.addEventListener("DOMContentLoaded", function() {
    // 1. Ahora que el HTML existe, capturamos los elementos
    productsContainer = document.querySelector("#productos");
    tableBody = document.querySelector("tbody");
    totalGlobalSpan = document.querySelector("#total");

    // 2. Inicializamos la App
    cargarProductos();
    totalGlobalSpan.innerText = "0.00";

    // 3. DELEGACIÓN DE EVENTOS (Ahora es seguro hacerlo aquí)

    // Evento para el contenedor de productos (Comprar)
    productsContainer.addEventListener("click", function(e) {
        if (e.target.classList.contains("btn-comprar")) {
            const id = parseInt(e.target.dataset.id);
            agregarAlCarrito(id);
        }
    });

    // Evento para la tabla del carrito (+, -, Eliminar)
    tableBody.addEventListener("click", function(e) {
        const btn = e.target;
        if (!btn.dataset.id) return;

        const id = parseInt(btn.dataset.id);

        if (btn.classList.contains("btn-restar")) {
            modificarCantidadCarrito(id, -1);
        } else if (btn.classList.contains("btn-sumar")) {
            modificarCantidadCarrito(id, 1);
        } else if (btn.classList.contains("btn-eliminar")) {
            eliminarDelCarrito(id);
        }
    });
});