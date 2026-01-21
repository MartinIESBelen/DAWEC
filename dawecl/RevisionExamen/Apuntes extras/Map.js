/**
 * DATOS DE PRUEBA (Basados en tus archivos)
 */
const movies = [
    { title: "Inception", year: 2010, genres: ["Sci-Fi", "Action"], rating: 8.8, director: "Christopher Nolan", date: "2010-07-16" },
    { title: "The Matrix", year: 1999, genres: ["Sci-Fi"], rating: 8.7, director: "Lana Wachowski", date: "1999-03-31" },
    { title: "Pulp Fiction", year: 1994, genres: ["Crime", "Drama"], rating: 8.9, director: "Quentin Tarantino", date: "1994-10-14" }
];

// --- 1. EXTRACCIÓN DE DATOS (Mapeo simple) ---
// Útil para sacar una lista de títulos o categorías para un filtro
const movieTitles = movies.map(movie => movie.title);
// Resultado: ["Inception", "The Matrix", "Pulp Fiction"]

// --- 2. TRANSFORMACIÓN DE OBJETOS ---
// Crear una nueva lista con solo un par de campos y la fecha formateada
const simplifiedMovies = movies.map(movie => {
    const [year, month, day] = movie.date.split("-");
    return {
        nombre: movie.title.toUpperCase(),
        estreno: `${day}/${month}/${year}`,
        puntuacion: movie.rating
    };
});

// --- 3. GENERACIÓN DE HTML (El caso más común en exámenes) ---
// Convertir cada objeto en una "Card" de HTML para inyectar en el DOM
function generateMovieCards(list) {
    return list.map(movie => `
        <div class="card" id="movie-${movie.year}">
            <h2>${movie.title}</h2>
            <p>Director: ${movie.director}</p>
            <div class="badges">
                ${movie.genres.map(g => `<span class="badge">${g}</span>`).join('')}
            </div>
        </div>
    `).join(''); // Importante el .join('') para convertir el array en un solo string
}

// --- 4. MAPEO CON CONDICIONALES ---
// Modificar una propiedad basándose en una condición (ej: añadir calificación cualitativa)
const moviesWithRank = movies.map(movie => ({
    ...movie, // Copiamos todas las propiedades originales
    rank: movie.rating >= 8.8 ? "Obra Maestra" : "Excelente"
}));

// --- 5. MAPEO ANIDADO (Listas dentro de listas) ---
// Imagina que tienes las provincias y quieres sacar solo los nombres de los pueblos
// Usando dataProvincias del archivo provincias.js
const allTowns = dataProvincias[0].provinces.map(prov => {
    return prov.towns.map(town => town.label);
}).flat(); // .flat() aplana el array de arrays en uno solo
// Resultado: ["Abla", "Adra", "Almería", "Gallardos, Los", "Cádiz", ...]

/**
 * TIPS PARA EL EXAMEN
 */

// Tip A: Siempre usa .join('') al final de un map si vas a meter el resultado en un .innerHTML
// Si no lo usas, verás comas "," entre tus elementos HTML.

// Tip B: El objeto original NO cambia.
// Si haces movies.map(...), 'movies' sigue igual. Esto es vital para no romper los datos.

// Tip C: Uso de desestructuración para limpieza
const cleanList = movies.map(({ title, director }) => `<li>${title} - ${director}</li>`).join('');

console.log("--- Títulos extraídos ---");
console.log(movieTitles);

console.log("--- Ejemplo de HTML de Card ---");
console.log(generateMovieCards([movies[0]]));