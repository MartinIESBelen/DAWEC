import { pelis } from "./filmList.js";
import { countries, genders } from "./filtrospelis.js";

// --- Variables de Estado y Configuración ---
const avgRating = pelis.reduce((acc, p) => acc + parseFloat(p.imdbRating), 0) / pelis.length;
let currentHighlightedId = null;

// --- Funciones de Utilidad y Filtrado ---

const getSelectedFields = () => {
    const fields = [];
    if (document.querySelector("#chTitulo").checked) fields.push("Title");
    if (document.querySelector("#chDirector").checked) fields.push("Director");
    if (document.querySelector("#chActores").checked) fields.push("Actors");
    return fields;
};

const getSelectedGenres = () => {
    const checkboxes = document.querySelectorAll(".genre-checkbox:checked");
    return Array.from(checkboxes).map(cb => cb.value);
};

const filtrarPeliculas = () => {
    const texto = document.querySelector("#filtro").value.toLowerCase();
    const campos = getSelectedFields();
    const generosSeleccionados = getSelectedGenres();
    const paisSeleccionado = document.querySelector("#sltPaises").value;

    return pelis.filter(p => {
        // 1. Filtro por Texto y Campos
        // Si no hay campos seleccionados, buscamos en el título por defecto o en ninguno
        const cumpleTexto = campos.length === 0 ? true : campos.some(c =>
            p[c] && p[c].toLowerCase().includes(texto)
        );

        // 2. Filtro por Género (Debe tener alguno de los seleccionados)
        const pGenres = p.Genre.split(", ");
        const cumpleGenero = generosSeleccionados.length === 0 ||
            generosSeleccionados.some(g => pGenres.includes(g));

        // 3. Filtro por País
        const cumplePais = !paisSeleccionado || p.Country.includes(paisSeleccionado);

        return cumpleTexto && cumpleGenero && cumplePais;
    });
};

// --- Funciones de Renderizado ---

const createBadge = (text, color = "bg-primary") =>
    `<span class="badge rounded-pill ${color} me-1 mb-1">${text}</span>`;

const cartelPelicula = (p) => {
    const ratingIcon = parseFloat(p.imdbRating) >= avgRating ? "👍" : "👎";

    // Formateamos los elementos separados (badge pills)
    const genres = p.Genre.split(", ").map(g => createBadge(g, "bg-success")).join("");
    const actors = p.Actors.split(", ").map(a => createBadge(a, "bg-info text-dark")).join("");
    const countries = p.Country.split(", ").map(c => createBadge(c, "bg-secondary")).join("");
    const languages = p.Language.split(", ").map(l => createBadge(l, "bg-dark")).join("");

    return `
        <div class="col-md-4 mb-4">
            <div class="card h-100 movie-card shadow-sm" id="card-${p.imdbID}" style="transition: all 0.3s ease">
                <img src="${p.Images[0]}" class="card-img-top" alt="${p.Title}" style="height: 250px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${p.Title}</h5>
                    <p class="card-text"><strong>Calificación:</strong> ${p.imdbRating} ${ratingIcon}</p>
                    <div class="mb-2"><strong>Géneros:</strong><br>${genres}</div>
                    <div class="mb-2"><strong>Actores:</strong><br>${actors}</div>
                    <div class="mb-2"><strong>Países:</strong><br>${countries}</div>
                    <div class="mb-3"><strong>Idiomas:</strong><br>${languages}</div>
                    
                    <button class="btn btn-outline-primary w-100 btn-details" data-id="${p.imdbID}">Details</button>
                    
                    <div class="details-section mt-3 d-none">
                        <hr>
                        <pre class="bg-light p-2 border rounded" style="font-size: 0.75rem; max-height: 200px; overflow-y: auto;">${JSON.stringify(p, null, 2)}</pre>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const renderizarCartelera = () => {
    const filtradas = filtrarPeliculas();
    const contenedor = document.getElementById("resultados");
    const contador = document.getElementById("contador");

    if (filtradas.length > 0) {
        contador.innerHTML = `<div class="alert alert-info">Se han encontrado ${filtradas.length} películas.</div>`;
        contenedor.innerHTML = filtradas.map(p => cartelPelicula(p)).join("");
    } else {
        contador.innerHTML = "";
        contenedor.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    No se han encontrado películas que coincidan con los criterios de búsqueda.
                </div>
            </div>`;
    }
};

// --- Inicialización de Controles ---

const initInputs = () => {
    // Géneros ordenados alfabéticamente
    const genContenedor = document.getElementById("generos-container");
    const sortedGenders = [...genders].sort((a, b) => a.localeCompare(b));

    genContenedor.innerHTML = `
        <div class="form-check form-check-inline mb-2 w-100 border-bottom pb-2">
            <input class="form-check-input" type="checkbox" id="todos-generos">
            <label class="form-check-label fw-bold" for="todos-generos">Seleccionar Todos</label>
        </div>
        <div class="row px-3">
            ${sortedGenders.map(g => `
                <div class="form-check col-6 col-md-3">
                    <input class="form-check-input genre-checkbox" type="checkbox" value="${g}" id="gen-${g}">
                    <label class="form-check-label" for="gen-${g}">${g}</label>
                </div>
            `).join("")}
        </div>
    `;

    // Países (en el orden definido en filtrospelis.js)
    const sltPaises = document.getElementById("sltPaises");
    sltPaises.innerHTML = `<option value="">Cualquier país</option>` +
        countries.map(c => `<option value="${c}">${c}</option>`).join("");
};

// --- Gestión de Eventos ---

document.addEventListener("DOMContentLoaded", () => {
    initInputs();

    // Mostrar todo al cargar la página por primera vez
    renderizarCartelera();

    // 1. Control del Click en el botón BUSCAR
    const btnBuscar = document.getElementById("btnBuscar");
    btnBuscar.addEventListener("click", () => {
        renderizarCartelera();
    });

    // 2. Soporte para buscar al pulsar "Enter" en el input de texto
    document.getElementById("filtro").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            renderizarCartelera();
        }
    });

    // 3. Lógica del checkbox "Seleccionar Todos" para géneros
    document.getElementById("generos-container").addEventListener("change", (e) => {
        if (e.target.id === "todos-generos") {
            const isChecked = e.target.checked;
            document.querySelectorAll(".genre-checkbox").forEach(cb => {
                cb.checked = isChecked;
            });
        }
    });

    // 4. Delegación de eventos para el botón Details de las Cards
    document.getElementById("resultados").addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-details")) {
            const id = e.target.dataset.id;
            const card = document.getElementById(`card-${id}`);
            const details = card.querySelector(".details-section");

            // Si hay otra tarjeta resaltada, la volvemos a su estado original
            if (currentHighlightedId && currentHighlightedId !== id) {
                const prevCard = document.getElementById(`card-${currentHighlightedId}`);
                if (prevCard) {
                    prevCard.classList.remove("bg-warning-subtle", "border-warning");
                    prevCard.querySelector(".details-section").classList.add("d-none");
                    prevCard.querySelector(".btn-details").textContent = "Details";
                }
            }

            // Cambiar estado de la tarjeta actual
            const isOpening = details.classList.contains("d-none");

            if (isOpening) {
                card.classList.add("bg-warning-subtle", "border-warning");
                details.classList.remove("d-none");
                e.target.textContent = "Hide Details";
                currentHighlightedId = id;
            } else {
                card.classList.remove("bg-warning-subtle", "border-warning");
                details.classList.add("d-none");
                e.target.textContent = "Details";
                currentHighlightedId = null;
            }
        }
    });
});