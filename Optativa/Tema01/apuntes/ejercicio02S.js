/*
// fleet-manager.js

// ----------------------------------------------------
// (S) Singleton + (T) Tight Coupling + (U) Untestability
// ----------------------------------------------------

// ⚠️ Olor S: Patrón Singleton y Olor T: Tight Coupling a la fuente de datos.
const GlobalFleetData = (function() {
    let instance = null; // Olor S

    function init() {
        // ⚠️ Olor U: Dependencia a datos internos y globales, no inyectable.
        const d = [ // Olor I: Nombre críptico 'd'
            { id: 101, reg: 'ABC1234', mk: 'Seat', cc: 1200, status: 'ok' },
            { id: 102, reg: 'DEF5678', mk: 'Ford', cc: 1800, status: 'pendiente' },
            { id: 103, reg: 'GHI9012', mk: 'VW', cc: 1200, status: 'ok' }
        ];
        return {
            getItems: () => d.slice(), // Devuelve copia para simular inmutabilidad, pero sigue siendo un Singleton
            getById: (id) => d.find(v => v.id === id)
        };
    }

    return {
        // Acceso global a la única instancia.
        getInstance: function() {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

// ----------------------------------------------------
// (I) Indescriptive Naming + (D) Duplication
// ----------------------------------------------------

// Función acoplada al Singleton (Olor T)
function getRegs() {
    const fleet = GlobalFleetData.getInstance().getItems(); // Olor T
    let res = []; // Olor I: Nombre no descriptivo
    for (let v of fleet) {
        res.push(v.reg); // Olor I: Propiedad 'reg' críptica
    }
    return res;
}

// ⚠️ Olor D: Lógica duplicada del mapeo de datos
function mapToCleanFleet(arr) {
    let r = []; // Olor I: Nombre críptico
    for(let i = 0; i < arr.length; i++) {
        const v = arr[i];
        r.push({
            matricula: v.reg, // Olor I
            marca: v.mk, // Olor I
            cilindrada: v.cc, // Olor I
            estado: v.status
        });
    }
    return r;
}

// ----------------------------------------------------
// (P) Premature Optimization
// ----------------------------------------------------

function processFleet(vehicleList, operationType) {
    // Olor P: Optimizacion prematura / Violación del Principio de Responsabilidad Única.
    // La función hace dos cosas completamente distintas y está forzada a recibir
    // un parámetro 'operationType' para decidir qué hacer, lo cual es frágil.

    // Olor D: Se llama a la lógica duplicada de mapeo
    const cleanedFleet = mapToCleanFleet(vehicleList);

    if (operationType === 'calculateAvgCC') {
        let total = 0;
        for(let v of cleanedFleet) {
            total += v.cilindrada; // Olor I: Nombre de propiedad mal traducido/críptico
        }
        return total / cleanedFleet.length;

    } else if (operationType === 'updateStatus') {
        // Función impura que modifica el primer elemento encontrado (Side Effect)
        if (cleanedFleet.length > 0) {
            cleanedFleet[0].estado = 'revisado';
            return 'Primer vehículo marcado como revisado.'; // Side Effect, NO es Pura
        }
        return 'Flota vacía.';
    }
}

// ----------------------------------------------------
// Uso del código (NO MODIFICAR ESTAS LÍNEAS)
// ----------------------------------------------------
const legacyFleet = GlobalFleetData.getInstance().getItems();
console.log('Matrículas:', getRegs());
console.log('Cilindrada Media:', processFleet(legacyFleet, 'calculateAvgCC'));
console.log('Resultado de Actualización:', processFleet(legacyFleet, 'updateStatus'));
console.log('Verificación del Side Effect:', legacyFleet[0].status);*/


// --- 1. Fuente de Datos (Reemplaza al Singleton y al Tight Coupling) ---

/**
 * Función Pura que simula la obtención de la Flota RAW.
 * El Olor S (Singleton) y Olor T (Tight Coupling) son eliminados porque:
 * 1. No hay una instancia global.
 * 2. Esta función se llama una vez y sus datos se INYECTAN en el resto de funciones.
 * Olor I (Indescriptive Naming) corregido en propiedades.
 */
const getRawVehicles = () => {
    return [
        { id: 101, matricula: 'ABC1234', marca: 'Seat', cilindradaCC: 1200, status: 'ok' },
        { id: 102, matricula: 'DEF5678', marca: 'Ford', cilindradaCC: 1800, status: 'pending' },
        { id: 103, matricula: 'GHI9012', marca: 'VW', cilindradaCC: 1200, status: 'ok' }
    ];
};

// --- 2. Funciones de Transformación (DRY y Nomenclatura) ---

/**
 * Olor D (Duplication) y Olor I (Indescriptive Naming) corregidos.
 * Función Pura única para estandarizar el objeto.
 * Se asume que los datos RAW ya están limpios, pero mantenemos el mapeo
 * para estandarizar el formato de la aplicación si fuera necesario.
 */
const mapRawVehicleToProduct = (rawVehicle) => {
    return {
        id: rawVehicle.id,
        matricula: rawVehicle.matricula,
        marca: rawVehicle.marca,
        cilindradaCC: rawVehicle.cilindradaCC, // Nombre claro
        estado: rawVehicle.status,
    };
};

/**
 * Función Pura que devuelve una lista de matrículas a partir de la flota.
 * Olor T (Tight Coupling) corregido: La flota se INYECTA (Input).
 */
const getVehicleRegistrationNumbers = (cleanFleet) => {
    return cleanFleet.map(vehicle => vehicle.matricula);
};


// --- 3. Lógica de Negocio (Responsabilidad Única y Pureza) ---

/**
 * Olor P (Premature Optimization) corregido: Lógica de cálculo separada.
 * Función Pura: Calcula la media sin Side Effects.
 */
const calculateAverageCC = (cleanFleet) => {
    if (cleanFleet.length === 0) return 0;

    const totalCC = cleanFleet.reduce((sum, vehicle) => sum + vehicle.cilindradaCC, 0);
    return totalCC / cleanFleet.length;
};

/**
 * Olor P (Premature Optimization) corregido: Lógica de actualización separada.
 * Función Pura: Devuelve un NUEVO array (Inmutabilidad), evitando el Side Effect.
 */
const updateVehicleStatus = (cleanFleet, vehicleId, newStatus) => {
    // La inmutabilidad garantiza que la función sea Pura
    return cleanFleet.map(vehicle => {
        if (vehicle.id === vehicleId) {
            return {
                ...vehicle, // Copia todas las propiedades del vehículo original
                estado: newStatus, // Modifica solo el estado
            };
        }
        return vehicle;
    });
};

// --- Uso del Código Refactorizado (Flow de la Aplicación) ---
console.log('--- Flota Refactorizada ---');

// 1. Inyección de Dependencias: Obtenemos los datos RAW
const rawData = getRawVehicles();

// 2. Transformamos los datos RAW a la flota limpia (Olor I e D corregidos)
const cleanFleet = rawData.map(mapRawVehicleToProduct);

// 3. Uso de funciones puras y desacopladas (Olor T y U corregidos)
console.log('Matrículas:', getVehicleRegistrationNumbers(cleanFleet));

// 4. Lógica de Cálculo (Olor P corregido)
console.log('Cilindrada Media:', calculateAverageCC(cleanFleet));

// 5. Lógica de Actualización (Olor P y Side Effect corregidos - Inmutabilidad)
const vehicleIdToUpdate = 101;
const updatedFleet = updateVehicleStatus(cleanFleet, vehicleIdToUpdate, 'revisado');

console.log(`\nEstado del vehículo ${vehicleIdToUpdate} en la Flota Original (debe ser 'ok'):`, cleanFleet.find(v => v.id === vehicleIdToUpdate).estado);
console.log(`Estado del vehículo ${vehicleIdToUpdate} en la Flota Nueva (debe ser 'revisado'):`, updatedFleet.find(v => v.id === vehicleIdToUpdate).estado);