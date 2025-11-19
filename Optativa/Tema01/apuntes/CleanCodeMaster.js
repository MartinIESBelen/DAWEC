/* 🔥🔥 CLEAN CODE JS - MASTER CHEAT SHEET (EXAMEN) 🔥🔥
   Basado en tus documentos: Magic Numbers, Nested Ifs, Side Effects, Pure Functions.

   🔎 GUÍA RÁPIDA DE REFACTORIZACIÓN (SI VES ESTO -> HAZ ESTO):
   1. ¿Numeros/Strings sueltos? -> Crea CONSTANTES (UPPER_CASE).
   2. ¿Más de 2/3 argumentos? -> Pasa un OBJETO como argumento.
   3. ¿Argumento 'boolean' (true/false)? -> Divide la función en dos.
   4. ¿If/Else anidados (flecha)? -> Invierte condición y RETURN (Guard Clause).
   5. ¿.push(), .splice() o = ? -> Usa SPREAD OPERATOR [...] o {...}.
   6. ¿Usa variables de fuera? -> Pásalas como PARÁMETRO.
*/

// ==============================================================================
// 1. NAMING & MAGIC NUMBERS (Documento 04)
// 🚩 Síntoma: Ves números o strings literales que no sabes qué significan.
// ==============================================================================
let user = [
    {   name:"juan",
        accessLevel: 1,},
    {   name:"juan",
        accessLevel: 1,},
    {   name:"juan",
        accessLevel: 1,},
]

function restart() {

}

// ❌ BAD: ¿Qué es 86400000? ¿Qué es 'admin'?
setTimeout(restart, 86400000);
if (user.accessLevel === 5) { "..."}

// ✅ GOOD: Constantes descriptivas (SCREAMING_SNAKE_CASE)
const MILLISECONDS_PER_DAY = 86_400_000;
const ADMIN_ACCESS_LEVEL = 5;

setTimeout(restart, MILLISECONDS_PER_DAY);
if (user.accessLevel === ADMIN_ACCESS_LEVEL) { "..." }

// ❌ BAD: Nombres genéricos o abreviados
let d; // ¿Día? ¿Distancia?
let data = ['Juan', 'Ana'];

// ✅ GOOD: Pronunciables y buscables
let daysSinceCreation;
let userNames = ['Juan', 'Ana'];


// ==============================================================================
// 2. FUNCIONES: ARGUMENTOS Y FLAGS (Documentos 01 y 02)
// 🚩 Síntoma: Función con 3+ argumentos o que recibe un booleano.
// ==============================================================================

// ❌ BAD: Lista larga de argumentos (difícil recordar el orden)
function createMenu(title, body, buttonText, cancellable) { "..." }

// ✅ GOOD: Objeto como parámetro (Destructuring)
function createMenu({ title, body, buttonText, cancellable }) { "..." }

createMenu({
    title: 'Home',
    body: 'Welcome',
    buttonText: 'OK',
    cancellable: true
});

// --- FLAG ARGUMENTS (El parámetro booleano del mal) ---

// ❌ BAD: La función hace 2 cosas distintas según el flag
function renderUser(user, isAdmin) {
    function renderAdmin(user) {

    }

    if (isAdmin) {
        renderAdmin(user);
    } else {
        renderNormalUser(user);
    }
}

// ✅ GOOD: Divide y vencerás. Funciones explícitas.
function renderAdminUser(user) {" ..." }
function renderNormalUser(user) { "..." }


// ==============================================================================
// 3. GUARD CLAUSES & NESTED IF/ELSE (Documentos 03 y 05)
// 🚩 Síntoma: Código con forma de flecha (>), muchos `else`.
// ==============================================================================

// ❌ BAD: Ejemplo "Validar Contraseña" (del Doc 05) - Difícil de leer
function validarContrasena(pass) {
    if (pass) {
        if (pass.length >= 8) {
            if (/\d/.test(pass)) {
                return "Válida";
            } else {
                return "Debe tener un número";
            }
        } else {
            return "Mínimo 8 caracteres";
        }
    } else {
        return "No puede estar vacía";
    }
}

// ✅ GOOD: Guard Clauses (Aplanar el código)
// Estrategia: Validar lo MALO primero, retornar error, y seguir.
function validarContrasena(pass) {
    if (!pass) return "No puede estar vacía";
    if (pass.length < 8) return "Mínimo 8 caracteres";
    if (!/\d/.test(pass)) return "Debe tener un número";

    return "Válida"; // El "Happy Path" al final
}

// --- TERNARIOS (Documento 03) ---
// Úsalos para asignaciones simples, evita if/else redundantes.

// ❌ BAD
let age;
let message;
if (age >= 18) {
    message = 'Adulto';
} else {
    message = 'Menor';
}

// ✅ GOOD
const message = (age >= 18) ? 'Adulto' : 'Menor';


// ==============================================================================
// 4. EVITAR EFECTOS SECUNDARIOS (Documento 07)
// 🚩 Síntoma: Usar `.push()`, `.pop()` o modificar propiedades `obj.prop = x`.
// ⚠️ CRÍTICO: Si modificas el input, afectas a quien llamó la función (Bug del Carrito).
// ==============================================================================

// ❌ BAD: Muta el array original (Side Effect)
const cart = ['Manzana'];

function addToCart(currentCart, item) {
    currentCart.push(item); // ☠️ ¡Modifica el array original fuera de la función!
    return currentCart;
}

// ✅ GOOD: Inmutabilidad con Spread Operator (Crea copia nueva)
function addToCart(currentCart, item) {
    return [...currentCart, item]; // ✨ Crea un NUEVO array con lo anterior + item
}

// ❌ BAD: Mutar objetos
function approve(user) {
    user.verified = true; // ☠️ Modifica el objeto original
}

// ✅ GOOD: Copia con spread
function approve(user) {
    return { ...user, verified: true }; // ✨ Nuevo objeto
}


// ==============================================================================
// 5. TRANSPARENCIA REFERENCIAL & FUNCIONES PURAS (Documento 06)
// 🚩 Síntoma: Usar variables globales, `Date.now()`, `Math.random()` dentro.
// Regla: Misma entrada -> SIEMPRE Misma salida.
// ==============================================================================

// ❌ BAD: Depende de variable externa (Impura)
let globalTax = 21;
function calculateTotal(price) {
    return price + (price * globalTax / 100); // Si globalTax cambia, el resultado cambia
}

// ✅ GOOD: Dependencia explícita (Pura)
function calculateTotal(price, taxRate) {
    return price + (price * taxRate / 100);
}

// ❌ BAD: Depende del tiempo actual (Impura, difícil de testear)
function isOfferExpired(offerDate) {
    const now = Date.now(); // ☠️ Oculto dentro
    return offerDate < now;
}

// ✅ GOOD: Inyectar la dependencia (Pura)
function isOfferExpired(offerDate, currentDate) {
    return offerDate < currentDate;
}


// ==============================================================================
// 6. LIMPIEZA GENERAL (Documento 02)
// 🚩 Síntoma: Comentarios innecesarios, código muerto.
// ==============================================================================

// ❌ BAD: Comentarios de "diario" o código comentado
// 2023-10-01: Arreglado el bug por Pepe
// function old() { ... }
function sum(a, b) {
    return a + b; // Suma a y b
}

// ✅ GOOD: El código se explica solo. Borra lo viejo (para eso está Git).
function sum(a, b) {
    return a + b;
}