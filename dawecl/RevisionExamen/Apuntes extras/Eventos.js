/**
 * 1. EL EVENTO INICIAL: DOMContentLoaded
 * Todo tu código debe estar dentro de este evento o ser llamado por él.
 * Asegura que el HTML existe antes de intentar capturar elementos.
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM listo, inicializando eventos...");
    inicializarControles();
});

function inicializarControles() {
    // --- 2. EVENTO CLICK EN BOTÓN (Búsqueda manual) ---
    const btnBuscar = document.querySelector("#btnBuscar");
    if (btnBuscar) {
        btnBuscar.addEventListener("click", () => {
            const texto = document.querySelector("#inputBusqueda").value;
            console.log("Buscando:", texto);
            // Aquí llamarías a tu función de filtrar() y luego pintar()
        });
    }

    // --- 3. EVENTO INPUT (Búsqueda en tiempo real / Live Search) ---
    // Se dispara cada vez que el usuario escribe una letra.
    const inputFiltro = document.querySelector("#inputFiltro");
    inputFiltro.addEventListener("input", (event) => {
        const valorActual = event.target.value;
        console.log("Filtrando en vivo por:", valorActual);
        // filtrar(valorActual);
    });

    // --- 4. EVENTO CHANGE (Selects e Idiomas) ---
    // Útil para filtros de categorías o selectores de países/provincias.
    const selectPaises = document.querySelector("#selectPaises");
    selectPaises.addEventListener("change", (event) => {
        const paisSeleccionado = event.target.value;
        console.log("Cambio de país a:", paisSeleccionado);
    });

    // --- 5. EVENTO CLICK EN LISTA (UL / Categorías) ---
    // Si tienes una lista de idiomas o categorías en un <ul>
    const listaIdiomas = document.querySelector("#listaIdiomas");
    listaIdiomas.addEventListener("click", (e) => {
        // Verificamos que se clicó en un LI (o hijo del LI)
        const item = e.target.closest("li");
        if (item) {
            // Recuperar el valor de un atributo data- o del texto
            const idioma = item.dataset.lang || item.textContent;
            console.log("Idioma elegido:", idioma);

            // Ejemplo: Marcar como activo visualmente
            document.querySelectorAll("#listaIdiomas li").forEach(li => li.classList.remove("active"));
            item.classList.add("active");
        }
    });

    // --- 6. DELEGACIÓN DE EVENTOS (Para elementos dinámicos) ---
    // CRUCIAL: Si pintas botones de "Detalles" con .map(), el listener
    // debe ir en el CONTENEDOR padre, porque los botones no existen al cargar la página.
    const contenedorCartas = document.querySelector("#contenedorCartas");
    contenedorCartas.addEventListener("click", (e) => {
        // ¿El elemento clicado tiene la clase 'btn-detalles'?
        if (e.target.classList.contains("btn-detalles")) {
            const idObjeto = e.target.dataset.id;
            console.log("Abriendo detalles del ID:", idObjeto);
            mostrarDetallesEnInputs(idObjeto);
        }
    });
}

/**
 * 7. RECUPERAR DATOS Y MOSTRAR EN INPUTS
 * Típico de examen: Clic en una fila -> Los datos van a un formulario lateral.
 */
function mostrarDetallesEnInputs(id) {
    // 1. Buscamos el objeto en nuestro array global (ej: movies o provincias)
    const objetoEncontrado = movies.find(m => m.id == id);

    if (objetoEncontrado) {
        // 2. Usamos querySelector para "rellenar" los campos del formulario
        document.querySelector("#editNombre").value = objetoEncontrado.title;
        document.querySelector("#editAnio").value = objetoEncontrado.year;
        //document.getElementById()

        // 3. Si hay que tratar fechas para el input type="date" (formato YYYY-MM-DD)
        // document.querySelector("#editFecha").value = objetoEncontrado.fechaISO;

        // 4. Pintar el JSON en un <pre>
        document.querySelector("#jsonPreview").textContent = JSON.stringify(objetoEncontrado, null, 2);
    }
}

/**
 * RESUMEN DE SELECTORES (Chuleta para el examen)
 */
// - Por ID: document.querySelector("#miId")
// - Por Clase: document.querySelectorAll(".miClase") -> Devuelve una lista (NodeList)
// - Valor de un input: elemento.value
// - Texto de un div/p: elemento.textContent
// - HTML interno: elemento.innerHTML
// - Atributos personalizados: elemento.dataset.nombre (para data-nombre="valor")