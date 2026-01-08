const cargarProductos = () => {
    productsContainer = document.querySelector("#productos");
    products.forEach(p => {
        let producto = document.createElement("div");

        producto.classList.add("col-3", "d-flex", "flex-column", "border", "border-dark", "rounded", "p-0", "m-3");

        producto.innerHTML = `
			<img src="${p.imagen}" height="200px">
			<div class="p-3">
				<h4>${p.nombre}</h4>
				<p>Precio: ${parseFloat(p.precio).toFixed(2)} €</p><span id="stock${p.id}"></span>
				<input class="cantidad form-control mb-3" type="number" name="cantidad" id="cantidad${p.id}" min="1" max="${p.stock}" value="1">
				<button class="comprar btn btn-success" id="comprar${p.id}">Comprar</button>
			</div>
		`;

        productsContainer.appendChild(producto);
    });
}

const controlInput = (e) => {
    const i = e.target;

    i.value = i.value.replace(/\D/, ""); // Cuando está en la última posición, elimina el value completo

    let value = parseInt(i.value);
    let max = parseInt(i.max);

    console.log("Max", max);

    if (value > 0 && value <= max) {
        i.classList.remove("is-invalid")
    } else {
        i.classList.add("is-invalid")
    }
}

const addCarrito = (e) => {
    e.preventDefault();
    if (e.target.previousElementSibling.classList.contains("is-invalid")) {
        alert("La cantidad no es válida");
    } else {
        const tbody = document.querySelector("tbody");
        let tr = document.createElement("tr");

        let producto;
        products.forEach(p => {
            if (e.target.parentElement.firstElementChild.innerHTML === p.nombre) {
                producto = p;
            }
        });

        console.log("Antes de añadir al carrito", producto);

        let cantidad = document.querySelector(`#cantidad${producto.id}`).value;

        // Crear fila
        tr.innerHTML = `
		<td>
			<button class="btn btn-sm btn-primary me-2" id="menos${producto.id}">-</button>
			<span id="cantidadCarrito${producto.id}">${cantidad}</span>
			<button class="btn btn-sm btn-primary ms-2" id="mas${producto.id}">+</button>
		</td>
		<td> ${producto.nombre} </td>
		<td> ${parseFloat(producto.precio).toFixed(2)}</td>
		<td id="total${producto.id}"> ${parseFloat(producto.precio).toFixed(2) * cantidad}</td>
		<td>
			<button class="eliminar btn btn-danger">Eliminar</button>
		</td>
		`;
        tbody.appendChild(tr);

        producto.stock -= cantidad;

        document.querySelector(`#cantidad${producto.id}`).max = producto;

        console.log("Después de añadir al carrito", producto);

        // Restar cantidad
        document.querySelector(`#menos${producto.id}`).addEventListener("click", () => {
            console.log(document.querySelector(`#cantidadCarrito${producto.id}`).innerHTML);

            if (document.querySelector(`#cantidadCarrito${producto.id}`).innerHTML > 1) {
                document.querySelector(`#cantidadCarrito${producto.id}`).innerHTML--;
                producto.stock++;

                document.querySelector(`#total${producto.id}`).innerHTML = parseFloat(producto.precio).toFixed(2) * cantidad;

                console.log("Al restar la cantidad en el carrito", producto);
            }
        });

        // Sumar cantidad
        document.querySelector(`#mas${producto.id}`).addEventListener("click", () => {
            console.log(document.querySelector(`#cantidadCarrito${producto.id}`).innerHTML);

            if (producto.stock > 0) {
                document.querySelector(`#cantidadCarrito${producto.id}`).innerHTML++;
                producto.stock--;

                document.querySelector(`#total${producto.id}`).innerHTML = parseFloat(producto.precio).toFixed(2) * cantidad;

                console.log("Al sumar la cantidad en el carrito", producto);
            }
        });

        // Eliminar fila
        document.querySelectorAll(".eliminar").forEach(b =>
            b.addEventListener("click", (e) => {
                let trBorrar = e.target.parentElement.parentElement;

                producto.stock += parseInt(document.querySelector(`#cantidadCarrito${producto.id}`).innerHTML);

                tbody.removeChild(trBorrar);

                console.log("Al borrar la fila del carrito", producto);
            })
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    document.querySelectorAll(".cantidad").forEach(e => e.addEventListener("input", controlInput));
    document.querySelectorAll(".comprar").forEach(e => e.addEventListener("click", addCarrito));
});