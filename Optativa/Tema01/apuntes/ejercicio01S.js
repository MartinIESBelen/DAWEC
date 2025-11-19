// Variable externa que simula el estado global de un sistema de caché
let globalUserCache = [];

function processUserLogin(userData, minPasswordLength) {
    if (userData) {
        if (userData.email && userData.password) {
            if (userData.password.length >= minPasswordLength) {
                // Lógica de autenticación (simulada)
                if (userData.email.includes('admin')) {
                    globalUserCache.push(userData.email); // ¡Efecto secundario!
                    return 'Acceso concedido como administrador';
                } else {
                    return 'Acceso concedido como usuario estándar';
                }
            } else {
                return 'Error: La contraseña es demasiado corta.';
            }
        } else {
            return 'Error: Correo o contraseña no proporcionados.';
        }
    } else {
        return 'Error: Datos de usuario no definidos.';
    }
}

function processUserLoginClean(userData, minPasswordLength) {
    //Pongo primero las conficiones mas restrictivas
    if (!userData) return 'Error: Datos de usuario no definidos.';

    if(!userData.email || !userData.password) return 'Error: Correo o contraseña no proporcionados.';

    if (userData.password.length < minPasswordLength) return 'Error: La contraseña es demasiado corta.';

    if (userData.email.includes('admin')) {
        return 'Acceso concedido como administrador';
    }
    return 'Acceso concedido como usuario estandar';
}

// Un número literal que no explica su significado.
const authResult = processUserLogin({ email: 'test@mail.com', password: '123' }, 8);
console.log(authResult);
const authResultClean = processUserLoginClean({ email: 'test@mail.com', password: '123' }, 8);
console.log(authResultClean);

const PRECIO_MIN_DESCUENTO = 500;
const DESCUENTO_MIN = 0.95;
const DESCUENTO_MAX = 0.85;

const errores =[
    {
        codigo: "CODE_404",
        mensaje:"Recurso no encontrado."
    },
    {
        codigo: "CODE_404",
        mensaje:"Recurso no encontrado."
    },

]

function calculateDiscountedPrice(total) {
    if (total > 500) {
        return total * 0.85; // Descuento 15%
    } else {
        return total * 0.95; // Descuento 5%
    }
}

function getSystemStatus(errorCode) {
    switch (errorCode) {
        case "CODE_404":
            return "Recurso no encontrado";
        case "CODE_500":
            return "Error interno del servidor";
        default:
            return "Estado desconocido";
    }
}

function calcularDiscountedPriceClean(total) {
    return total > PRECIO_MIN_DESCUENTO ? total * DESCUENTO_MAX : total * DESCUENTO_MIN;
}

function getSystemStatusClean(listaErrores, errorCode) {
    const error = listaErrores.find(e => e.codigo === errorCode);

    return error ? error.mensaje : "Estado desconocido";
}

console.log(calculateDiscountedPrice(600));
console.log(getSystemStatus("CODE_404"));

console.log(calcularDiscountedPriceClean(600));
console.log(getSystemStatusClean(errores,"CODE_404"));