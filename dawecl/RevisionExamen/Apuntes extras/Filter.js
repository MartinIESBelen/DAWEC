/**
 * DATOS DE PRUEBA (Mock Data)
 */
const movies = [
    { title: "Inception", year: 2010, genres: ["Sci-Fi", "Action"], rating: 8.8, director: "Christopher Nolan" },
    { title: "The Matrix", year: 1999, genres: ["Sci-Fi"], rating: 8.7, director: "Lana Wachowski" },
    { title: "Interstellar", year: 2014, genres: ["Sci-Fi", "Drama"], rating: 8.6, director: "Christopher Nolan" },
    { title: "Pulp Fiction", year: 1994, genres: ["Crime", "Drama"], rating: 8.9, director: "Quentin Tarantino" }
];

// --- 1. FILTRADO POR TEXTO (Buscador simple) ---
// Se suele usar .includes() y pasar todo a minúsculas
function filterByText(list, text) {
    const query = text.toLowerCase();
    return list.filter(item => item.title.toLowerCase().includes(query));
}

// --- 2. FILTRADO POR MÚLTIPLES CAMPOS (Buscador avanzado) ---
// ¿El texto está en el título O en el director?
function filterByMultipleFields(list, text) {
    const query = text.toLowerCase();
    return list.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.director.toLowerCase().includes(query)
    );
}

// --- 3. FILTRADO POR PERTENENCIA A ARRAY (Checkboxes de Género) ---
// Muy común en exámenes: "Dime las pelis que tengan AL MENOS UNO de estos géneros"
function filterByGenres(list, selectedGenres) {
    if (selectedGenres.length === 0) return list; // Si no hay nada marcado, mostramos todo

    return list.filter(movie =>
        // .some() devuelve true si al menos un elemento cumple la condición
        movie.genres.some(g => selectedGenres.includes(g))
    );
}

// --- 4. FILTRADO POR RANGO (Números o Fechas) ---
function filterByRating(list, minRating) {
    return list.filter(movie => movie.rating >= minRating);
}

// --- 5. FILTRADO DINÁMICO (Basado en lo que el usuario elija en Checkboxes) ---
// A veces te dan un array con los nombres de las propiedades donde buscar: ["title", "director"]
function filterBySelectedKeys(list, text, keys) {
    const query = text.toLowerCase();
    return list.filter(item => {
        // .some() aquí recorre las llaves ("title", "director", etc.)
        return keys.some(key => {
            return item[key].toLowerCase().includes(query);
        });
    });
}

// --- 6. EL FILTRO MAESTRO (Combinar todo: AND logic) ---
// En el examen, lo ideal es crear una función que aplique todos los filtros a la vez
function masterFilter(list, config) {
    return list.filter(movie => {
        // Cada condición debe ser verdadera para que el objeto pase el filtro
        const matchText = movie.title.toLowerCase().includes(config.text.toLowerCase());
        const matchGenre = config.genres.length === 0 || movie.genres.some(g => config.genres.includes(g));
        const matchYear = movie.year >= config.minYear;

        return matchText && matchGenre && matchYear;
    });
}

/**
 * EJEMPLOS DE USO EN CONSOLA
 */
console.log("--- Películas de Nolan ---");
console.table(filterByText(movies, "Nolan"));

console.log("--- Géneros Sci-Fi o Drama ---");
console.table(filterByGenres(movies, ["Sci-Fi", "Drama"]));

console.log("--- Filtro Maestro (Texto 'In' + Año > 2000) ---");
const config = { text: "In", genres: [], minYear: 2000 };
console.table(masterFilter(movies, config));