// --- LISTA DE LIBROS ---
const libros = [
    { titulo: "Cien años de soledad", genero: "Realismo mágico", autores: ["Gabriel García Márquez"], paginas: 471, fechaPublicacion: "1967/01/01" },
    { titulo: "El Hobbit", genero: "Fantasía", autores: ["J.R.R. Tolkien"], paginas: 310, fechaPublicacion: "1937/10/13" },
    { titulo: "1984", genero: "Ciencia ficción", autores: ["George Orwell"], paginas: 328, fechaPublicacion: "1949/06/26" },
    { titulo: "Good Omens", genero: "Fantasía", autores: ["Neil Gaiman", "Terry Pratchett"], paginas: 432, fechaPublicacion: "1990/08/07" },
    { titulo: "La sombra del viento", genero: "Misterio", autores: ["Carlos Ruiz Zafón"], paginas: 565, fechaPublicacion: "2001/11/03" },
    { titulo: "Fundación", genero: "Ciencia ficción", autores: ["Isaac Asimov"], paginas: 255, fechaPublicacion: "1951/04/22" }
];

// Saca los libros con mas de x cantidad e paginas
function librosMasDeXPaginas(listaLibros, numeroPaginas) {
    console.log(`Libros con más de ${numeroPaginas} páginas:`);
    return listaLibros.filter(l => l.paginas > numeroPaginas).map(l => l.titulo);
}

//Saca los titulos de los libros con una fecha de salida
function librosMasDeXFechas(listaLibros, fecha) {
    const fechaRef = new Date(fecha);
    return listaLibros
        .filter(l => new Date(l.fechaPublicacion) < fecha)
        .map(l => l.titulo);
}

//Filtra los libros con un autor
function librosConUnAutor(libros) {
    console.log("Libros con un único autor:");
    return libros.filter(l => l.autores.length === 1).map(l => l.titulo);
}

//Contar el numero de libros que tiene cada autor
function contarLibrosPorAutor(listaLibros) {

    const contador = libros.reduce((acc, libro) => {
        libro.autores.forEach((autor) => {acc[autor] = (acc[autor] || 0) + 1
        });
        return acc;
    }, {});

    return contador;
}

function renderizarTitulos(listaTitulos, id) {
    return document.getElementById("listaTitulos").innerHTML += listaTitulos.join("<br>")
}

// Pintar contador de libros por autor
function renderizarLista(lista) {
    const div = document.createElement("div");
    div.innerHTML = lista.join("<br>") + "<br><br>";
    document.body.appendChild(div);
}

function renderizarContador(contador) {
    const div = document.createElement("div");
    const texto = Object.entries(contador)
        .map(([autor, cantidad]) => `${autor}: ${cantidad}`)
        .join("<br>");
    div.innerHTML = texto + "<br><br>";
    document.body.appendChild(div);
}

// --- Ejecución ---

const titulosPaginas = librosMasDeXPaginas(libros, 400);
renderizarLista(titulosPaginas);

const titulosAntiguos = librosMasDeXFechas(libros, "2000/01/01");
renderizarLista(titulosAntiguos);

const titulosUnAutor = librosConUnAutor(libros);
renderizarLista(titulosUnAutor);

const contador = contarLibrosPorAutor(libros);
renderizarContador(contador);



document.addEventListener("DOMContentLoaded", () => {


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