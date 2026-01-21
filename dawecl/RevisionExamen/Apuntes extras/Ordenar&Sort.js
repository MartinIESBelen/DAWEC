/**
 * DATOS DE PRUEBA
 */
const movies = [
    { title: "Inception", year: 2010, genres: ["Sci-Fi", "Action"], rating: 8.8, date: "2010-07-16" },
    { title: "The Matrix", year: 1999, genres: ["Sci-Fi"], rating: 8.7, date: "1999-03-31" },
    { title: "Interstellar", year: 2014, genres: ["Sci-Fi", "Drama"], rating: 8.6, date: "2014-11-07" },
    { title: "Pulp Fiction", year: 1994, genres: ["Crime", "Drama"], rating: 8.9, date: "1994-10-14" },
    { title: "Avatar", year: 2009, genres: ["Action", "Adventure"], rating: 7.8, date: "2009-12-18" }
];

// ==========================================
// 1. QUITAR REPETIDOS (Unicidad)
// ==========================================

/**
 * Caso A: Valores simples (Strings/Numbers)
 * El truco del "Set" es el más rápido y moderno.
 */
const categories = ["Acción", "Drama", "Acción", "Comedia", "Drama"];
const uniqueCategories = [...new Set(categories)];
// Resultado: ["Acción", "Drama", "Comedia"]

/**
 * Caso B: Extraer géneros únicos de la lista de películas
 * Como 'genres' es un array dentro del objeto, usamos .flatMap() primero.
 */
const getUniqueGenres = (list) => {
    const allGenres = list.flatMap(m => m.genres); // Une todos los arrays en uno solo
    return [...new Set(allGenres)];
};
// Resultado: ["Sci-Fi", "Action", "Drama", "Crime", "Adventure"]

// ==========================================
// 2. ORDENACIÓN (Sorting)
// ==========================================

/**
 * Caso A: Ordenar Strings (Alfabético)
 * IMPORTANTE: Usa siempre .localeCompare() para evitar problemas con tildes o Ñ.
 */
const sortTitles = (list) => {
    return [...list].sort((a, b) => a.title.localeCompare(b.title));
};

/**
 * Caso B: Ordenar Números (Rating)
 * (a - b) para ascendente, (b - a) para descendente.
 */
const sortByRating = (list) => {
    return [...list].sort((a, b) => b.rating - a.rating); // De mayor a menor nota
};

/**
 * Caso C: Ordenar Fechas
 * Convertimos el string a objeto Date para poder restar.
 */
const sortByDate = (list) => {
    return [...list].sort((a, b) => new Date(a.date) - new Date(b.date));
};

// ==========================================
// 3. COMBO: QUITAR REPETIDOS + ORDENAR
// ==========================================

/**
 * Típico de examen: "Genera la lista de géneros para los checkboxes,
 * sin repetir y por orden alfabético".
 */
const finalGenres = [...new Set(movies.flatMap(m => m.genres))].sort((a, b) => a.localeCompare(b));
// Resultado: ["Action", "Adventure", "Crime", "Drama", "Sci-Fi"]

// ==========================================
// 4. TRUCO PARA EL EXAMEN: CLONAR EL ARRAY
// ==========================================
/**
 * .sort() modifica el array original. Si quieres mantener los datos originales intactos
 * para otros filtros, usa el "spread operator" [...] antes de ordenar.
 */
const original = [10, 5, 8];
const ordenado = [...original].sort((a, b) => a - b);

console.log("Original intacto:", original); // [10, 5, 8]
console.log("Copia ordenada:", ordenado); // [5, 8, 10]

/**
 * EJEMPLOS DE USO REAL
 */
console.log("--- Géneros únicos y ordenados ---");
console.log(finalGenres);

console.log("--- Películas por nota (desc) ---");
console.table(sortByRating(movies));

console.log("--- Películas por fecha (asc) ---");
console.table(sortByDate(movies));