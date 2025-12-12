const contenedorLista = document.querySelector('#lista-usuarios');

// Un solo listener para todo el contenedor
contenedorLista.addEventListener('click', (event) => {
    // Verificar si el click fue en un botón (o dentro de uno)
    const boton = event.target.closest('button'); // Mejor que target puro por si hay iconos dentro

    if (!boton) return; // Si no es botón, ignorar

    // Lógica según la clase o dataset del botón
    if (boton.classList.contains('btn-delete')) {
        const idUsuario = boton.dataset.id; // Acceder al data-id [cite: 2501]
        console.log(Eliminando usuario ${idUsuario});
        // Aquí llamarías a tu función de eliminar
    }

    if (boton.classList.contains('btn-edit')) {
        console.log("Editando...");
    }
});