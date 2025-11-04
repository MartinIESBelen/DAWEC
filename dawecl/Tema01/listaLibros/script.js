document.addEventListener("DOMContentLoaded", () => {

    // --- LISTA DE LIBROS ---
    const libros = [
        { titulo: "Cien años de soledad", genero: "Realismo mágico", autores: ["Gabriel García Márquez"], paginas: 471, fechaPublicacion: 1967 },
        { titulo: "El Hobbit", genero: "Fantasía", autores: ["J.R.R. Tolkien"], paginas: 310, fechaPublicacion: 1937 },
        { titulo: "1984", genero: "Ciencia ficción", autores: ["George Orwell"], paginas: 328, fechaPublicacion: 1949 },
        { titulo: "Good Omens", genero: "Fantasía", autores: ["Neil Gaiman", "Terry Pratchett"], paginas: 432, fechaPublicacion: 1990 },
        { titulo: "La sombra del viento", genero: "Misterio", autores: ["Carlos Ruiz Zafón"], paginas: 565, fechaPublicacion: 2001 },
        { titulo: "Fundación", genero: "Ciencia ficción", autores: ["Isaac Asimov"], paginas: 255, fechaPublicacion: 1951 }
    ];

    // --- FUNCIONES DE CONSOLA ---
    function librosMasDeXPaginas(x) {
        console.log(`Libros con más de ${x} páginas:`);
        libros.filter(l => l.paginas > x).forEach(l => console.log(`- ${l.titulo}`));
    }

    function librosMasDeXAnios(x) {
        const anioActual = new Date().getFullYear();
        console.log(`Libros publicados hace más de ${x} años:`);
        libros.filter(l => anioActual - l.fechaPublicacion > x).forEach(l => console.log(`- ${l.titulo}`));
    }

    function librosConUnAutor() {
        console.log("Libros con un único autor:");
        libros.filter(l => l.autores.length === 1).forEach(l => console.log(`- ${l.titulo}`));
    }

    function contarLibrosPorAutor() {
        const contador = {};
        libros.forEach(l => {
            l.autores.forEach(a => {
                contador[a] = (contador[a] || 0) + 1;
            });
        });
        console.log("Número de libros por autor:");
        for (let autor in contador) {
            console.log(`${autor}: ${contador[autor]}`);
        }
    }

    // --- LLAMADAS DE PRUEBA EN CONSOLA ---
    librosMasDeXPaginas(400);
    librosMasDeXAnios(30);
    librosConUnAutor();
    contarLibrosPorAutor();

    // --- CREAR ELEMENTOS HTML DINÁMICAMENTE ---
    const contenedor = document.createElement("div");
    contenedor.style.padding = "20px";
    document.body.appendChild(contenedor);

    const titulo = document.createElement("h1");
    titulo.textContent = "Lista de Libros";
    contenedor.appendChild(titulo);

    // --- CONTROL DE ORDENACIÓN ---
    const ordenarPor = document.createElement("select");
    const opcionesOrden = ["Título", "Género", "Fecha de publicación"];
    opcionesOrden.forEach(op => {
        const option = document.createElement("option");
        option.value = op;
        option.textContent = op;
        ordenarPor.appendChild(option);
    });
    contenedor.appendChild(ordenarPor);

    const btnOrdenar = document.createElement("button");
    btnOrdenar.textContent = "Ordenar";
    btnOrdenar.style.marginLeft = "10px";
    contenedor.appendChild(btnOrdenar);

    // --- RADIO BUTTONS DE GÉNERO ---
    const generos = [...new Set(libros.map(l => l.genero))];
    const filtroGenero = document.createElement("div");
    filtroGenero.style.margin = "20px 0";

    const labelFiltro = document.createElement("label");
    labelFiltro.textContent = "Filtrar por género:";
    filtroGenero.appendChild(labelFiltro);

    generos.forEach((g, i) => {
        const label = document.createElement("label");
        label.style.marginLeft = "10px";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "genero";
        radio.value = g;
        if (i === 0) radio.checked = true;

        label.appendChild(radio);
        label.appendChild(document.createTextNode(g));
        filtroGenero.appendChild(label);
    });
    contenedor.appendChild(filtroGenero);

    // --- TABLA DE LIBROS ---
    const tabla = document.createElement("table");
    tabla.border = "1";
    tabla.style.borderCollapse = "collapse";
    tabla.style.width = "100%";
    contenedor.appendChild(tabla);

    function crearTabla(librosMostrar) {
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Género</th>
                    <th>Autores</th>
                    <th>Páginas</th>
                    <th>Fecha de publicación</th>
                </tr>
            </thead>
        `;

        const tbody = document.createElement("tbody");

        librosMostrar.forEach(l => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${l.titulo}</td>
                <td>${l.genero}</td>
                <td>${l.autores.join(", ")}</td>
                <td>${l.paginas}</td>
                <td>${l.fechaPublicacion}</td>
            `;
            tbody.appendChild(fila);
        });

        tabla.appendChild(tbody);
    }

    // --- EVENTOS ---
    btnOrdenar.addEventListener("click", () => {
        let criterio = ordenarPor.value;
        let librosOrdenados = [...libros];

        if (criterio === "Título") {
            librosOrdenados.sort((a, b) => a.titulo.localeCompare(b.titulo));
        } else if (criterio === "Género") {
            librosOrdenados.sort((a, b) => a.genero.localeCompare(b.genero));
        } else if (criterio === "Fecha de publicación") {
            librosOrdenados.sort((a, b) => a.fechaPublicacion - b.fechaPublicacion);
        }

        const generoSeleccionado = document.querySelector('input[name="genero"]:checked').value;
        const filtrados = librosOrdenados.filter(l => l.genero === generoSeleccionado);

        crearTabla(filtrados);
    });

    // --- Mostrar tabla inicial ---
    crearTabla(libros.sort((a, b) => a.titulo.localeCompare(b.titulo)));
});