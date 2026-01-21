/**
 * 1. MÉTODO "EXAMEN" (MANUAL CON SPLIT)
 * Es el más seguro si la fecha viene en formato YYYY-MM-DD y solo quieres reordenar.
 * No dependes de zonas horarias ni del objeto Date.
 */
function formatWithSplit(dateString) {
    // Supongamos que dateString es "2024-05-20"
    const parts = dateString.split("-"); // ["2024", "05", "20"]
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}/${month}/${year}`; // Resultado: "20/05/2024"
}

/**
 * 2. MÉTODO NATIVO (toLocaleDateString)
 * Ideal si quieres resultados rápidos con nombres de meses o días en español.
 */
function formatToLocale(dateString) {
    const dateObj = new Date(dateString);

    // Opciones para personalizar el formato
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return dateObj.toLocaleDateString('es-ES', options);
    // Resultado: "20 de mayo de 2024"
}

/**
 * 3. MÉTODO CON PADSTART (CONSTRUCCIÓN MANUAL)
 * Útil cuando creas la fecha desde cero y quieres asegurar que el mes/día tenga 2 dígitos.
 */
function formatCustom(dateObj) {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const year = dateObj.getFullYear();

    return `${day}-${month}-${year}`; // Resultado: "20-05-2024"
}

/**
 * 4. MÉTODO PARA ORDENAR ARRAYS POR FECHA
 * En el examen, si te piden ordenar un array de objetos por fecha, usa esto:
 */
function sortDataByDate(array, key) {
    return array.sort((a, b) => {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return dateA - dateB; // De más antigua a más moderna
    });
}

/**
 * 5. MÉTODO "FECHA RELATIVA" (DÍAS TRANSCURRIDOS)
 * A veces piden calcular cuánto tiempo ha pasado.
 */
function getDaysDifference(pastDate) {
    const today = new Date();
    const start = new Date(pastDate);

    const diffInMs = today - start;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return `Han pasado ${diffInDays} días`;
}

// === EJEMPLOS DE USO PARA PRÁCTICA ===
const mockDate = "2024-12-31";

console.log("Split:", formatWithSplit(mockDate));
console.log("Locale:", formatToLocale(mockDate));
console.log("Calculo días:", getDaysDifference("2024-01-01"));