/* ⚡⚡ CLEAN CODE JS - GOD MODE CHEAT SHEET ⚡⚡

   🔎 BUSCADOR RÁPIDO (CTRL + F):
   -------------------------------------------------
   ### 1  :: ARRAYS (Mutaciones, Push, Bucles)
   ### 2  :: IF / ELSE (Flechas, Guard Clauses)
   ### 3  :: FUNCIONES (Argumentos, Flags, Naming)
   ### 4  :: MAGIC NUMBERS & STRINGS
   ### 5  :: NUEVO: OBJETOS & CLASES (Primitive Obsession)
   ### 6  :: NUEVO: SEPARACIÓN LÓGICA vs I/O (Pureza)
   ### 7  :: TESTING SUITE (Copia y pega esto)
   -------------------------------------------------
*/


// ============================================================================
// ### 1 :: MANIPULACIÓN DE ARRAYS (¡PROHIBIDO MUTAR!)
// 💡 Regla de Oro: Si entran N elementos y salen N -> .map()
// 💡 Regla de Oro: Si entran N elementos y salen menos -> .filter()
// ============================================================================

// 1.1 AÑADIR SIN MUTAR (.push es el enemigo)
// ❌ BAD
function add(cart, item) {
    cart.push(item); // ☠ Modifica el array de fuera
    return cart;
}
// ✅ GOOD (Spread)
function add(cart, item) {
    return [...cart, item];
}

// 1.2 ELIMINAR SIN MUTAR (.splice es el enemigo)
// ❌ BAD
function remove(cart, index) {
    cart.splice(index, 1); // ☠ Modifica el array de fuera
    return cart;
}
// ✅ GOOD (Filter)
function remove(cart, idToRemove) {
    return cart.filter(item => item.id !== idToRemove);
}

// 1.3 TRANSFORMAR DATOS (Evita forEach si creas un array nuevo)
// ❌ BAD
const names = [];
users.forEach(user => names.push(user.name)); // ☠ Efecto secundario
// ✅ GOOD (Map)
const names = users.map(user => user.name);

// 1.4 CALCULAR UN TOTAL (Evita variables let externas)
// ❌ BAD
let total = 0;
items.forEach(item => total += item.price);
// ✅ GOOD (Reduce)
const total = items.reduce((acc, item) => acc + item.price, 0);


// ============================================================================
// ### 2 :: IF / ELSE / GUARD CLAUSES
// 💡 Regla: El "camino feliz" (return final) debe estar sin identar.
// ============================================================================

// 2.1 ELIMINAR ELSE (Validaciones primero)
// ❌ BAD (Hadouken / Arrow Code)
function login(user) {
    if (user) {
        if (user.isActive) {
            if (checkPass(user)) {
                return 'Welcome';
            } else {
                return 'Wrong Pass';
            }
        } else {
            return 'Inactive';
        }
    } else {
        return 'No User';
    }
}

// ✅ GOOD (Guard Clauses - Falla rápido)
function login(user) {
    if (!user) return 'No User';            // 1. Validación básica
    if (!user.isActive) return 'Inactive';  // 2. Estado
    if (!checkPass(user)) return 'Wrong Pass'; // 3. Lógica

    return 'Welcome'; // 4. Éxito (Happy Path)
}

// 2.2 EVITAR CONDICIONALES LARGOS
// ❌ BAD
if (status === 'open' || status === 'pending' || status === 'reopened') { ... }

// ✅ GOOD (Array includes)
const VALID_STATUSES = ['open', 'pending', 'reopened'];
if (VALID_STATUSES.includes(status)) { ... }


// ============================================================================
// ### 3 :: FUNCIONES (ARGUMENTOS Y BANDERAS)
// 💡 Regla: Máximo 3 argumentos. Si hay más -> Objeto.
// ============================================================================

// 3.1 DEMASIADOS ARGUMENTOS (Posicionales)
// ❌ BAD (¿Cuál era el tercero? ¿El email o el rol?)
function saveUser(name, email, password, role, isActive) { ... }

// ✅ GOOD (Destructuring - Orden irrelevante)
function saveUser({ name, email, password, role, isActive }) { ... }

// 3.2 FLAG ARGUMENTS (Booleanos misteriosos)
// ❌ BAD (Viola principio de responsabilidad única)
function createFile(name, isTemp) {
    if (isTemp) { /* ... / } else { / ... */ }
}
// ✅ GOOD (Dos funciones claras)
function createPermanentFile(name) { ... }
function createTempFile(name) { ... }


// ============================================================================
// ### 4 :: MAGIC NUMBERS Y STRINGS
// 💡 Regla: Si tienes que explicar qué es el número, necesita una constante.
// ============================================================================

// ❌ BAD
setTimeout(run, 86400000); // ¿Qué es esto?
if (user.role === 'AD') { ... } // ¿Qué es AD?

// ✅ GOOD
const MILLISECONDS_IN_DAY = 86_400_000;
setTimeout(run, MILLISECONDS_IN_DAY);

const ROLE_ADMIN = 'AD';
if (user.role === ROLE_ADMIN) { ... }


// ============================================================================
// ### 5 :: NUEVO: OBJETOS & PRIMITIVE OBSESSION (Del PDF 01)
// 💡 Regla: Agrupa datos relacionados en objetos.
// ============================================================================

// 5.1 PRIMITIVE OBSESSION (Muchos datos sueltos que viajan juntos)
// ❌ BAD
const x = 10;
const y = 20;
const z = 5;
function move(x, y, z) { ... }

// ✅ GOOD (Objeto Coordenada)
const point = { x: 10, y: 20, z: 5 };
function move(point) { ... }

// 5.2 MAPAS/DICCIONARIOS EN LUGAR DE SWITCH
// ❌ BAD
function getColor(fruit) {
    switch(fruit) {
        case 'apple': return 'red';
        case 'banana': return 'yellow';
        default: return 'unknown';
    }
}
// ✅ GOOD
const FRUIT_COLORS = {
    apple: 'red',
    banana: 'yellow'
};
function getColor(fruit) {
    return FRUIT_COLORS[fruit] || 'unknown';
}


// ============================================================================
// ### 6 :: NUEVO: SEPARAR LÓGICA vs I/O (Del PDF 06 y 07)
// 💡 Regla: Las funciones que CALCULAN no deben GUARDAR ni IMPRIMIR.
// ============================================================================

// ❌ BAD (Mezcla cálculo con efecto secundario)
function calculateAndPrint(price) {
    const result = price * 1.21;
    console.log("El precio es: " + result); // ⚠ Side Effect (I/O)
    document.getElementById('price').innerHTML = result; // ⚠ Side Effect (DOM)
}

// ✅ GOOD (Separación de Responsabilidades)
// 1. Función Pura (Solo calcula)
function calculateTax(price) {
    return price * 1.21;
}

// 2. Función Impura (Maneja la UI/Consola)
function displayPrice(price) {
    const finalPrice = calculateTax(price);
    console.log("El precio es: " + finalPrice);
}


// ============================================================================
// ### 7 :: TESTING SUITE (COPIAR AL FINAL DEL EXAMEN)
// 💡 Instrucciones: Pega esto abajo, cambia 'tuFuncion' y los datos.
// ============================================================================

// --- DATOS DUMMY ---
const mockData = [10, 20, 30];

// --- CASOS DE PRUEBA ---
const testCases = [
    { input: mockData, expected: 60, desc: "Suma normal" },
    { input: [],       expected: 0,  desc: "Array vacío" },
    { input: [5],      expected: 5,  desc: "Un elemento" }
];

// --- RUNNER ---
function runTests(cases) {
    console.log("%c🧪 TEST RUNNER INICIADO", "color: violet; font-weight: bold");
    cases.forEach((t, i) => {
        try {
            // 👇👇 CAMBIA 'tuFuncion' POR EL NOMBRE DE TU FUNCIÓN 👇👇
            const result = tuFuncion(t.input);

            const passed = JSON.stringify(result) === JSON.stringify(t.expected);
            if (passed) console.log(✅ Test ${i+1} (${t.desc}): PASSED);
        else console.error(❌ Test ${i+1} (${t.desc}): FAILED. Exp: ${t.expected}, Got: ${result});
        } catch (e) { console.error(💥 Error en Test ${i+1}:, e); }
    });
}
// runTests(testCases); // Descomentar para correr