// --- 1. CONFIGURACIÓN Y REGEX ---
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^[0-9]{9}$/;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#registroForm");

    // --- 2. EVENTO SUBMIT ---
    form.addEventListener("submit", (e) => {
        // EVITAR que el formulario se envíe y recargue la página
        e.preventDefault();

        // Limpiar errores previos antes de validar
        limpiarErrores();

        // Ejecutar validación
        const esValido = validar();

        if (esValido) {
            procesarEnvio();
        }
    });
});

// --- 3. LÓGICA DE VALIDACIÓN ---
function validar() {
    let validacionCorrecta = true;

    // Recuperar valores usando querySelector
    const nombre = document.querySelector("#nombre");
    const email = document.querySelector("#email");
    const telefono = document.querySelector("#telefono");
    const categoria = document.querySelector("#categoria");

    // VALIDAR NOMBRE (No vacío)
    if (nombre.value.trim() === "") {
        mostrarError(nombre, "err-nombre", "El nombre es obligatorio.");
        validacionCorrecta = false;
    }

    // VALIDAR EMAIL (No vacío y formato Regex)
    if (email.value.trim() === "") {
        mostrarError(email, "err-email", "El email es obligatorio.");
        validacionCorrecta = false;
    } else if (!regexEmail.test(email.value)) {
        mostrarError(email, "err-email", "Formato de email no válido.");
        validacionCorrecta = false;
    }

    // VALIDAR TELÉFONO (Formato Regex si no está vacío)
    if (telefono.value.trim() !== "" && !regexTelefono.test(telefono.value)) {
        mostrarError(telefono, "err-telefono", "Debe tener exactamente 9 números.");
        validacionCorrecta = false;
    }

    // VALIDAR SELECT (Debe haber elegido algo distinto a vacío)
    if (categoria.value === "") {
        mostrarError(categoria, "err-categoria", "Debes elegir una categoría.");
        validacionCorrecta = false;
    }

    return validacionCorrecta;
}

// --- 4. FUNCIONES AUXILIARES DE UI ---

function mostrarError(input, idError, mensaje) {
    // Añadir clase de borde rojo al input
    input.classList.add("input-error");
    // Escribir el mensaje en el div correspondiente
    document.getElementById(idError).textContent = mensaje;
}

function limpiarErrores() {
    // Quitar bordes rojos de todos los inputs
    document.querySelectorAll("input, select").forEach(el => {
        el.classList.remove("input-error");
    });
    // Vaciar todos los mensajes de error
    document.querySelectorAll(".error-message").forEach(el => {
        el.textContent = "";
    });
    // Ocultar banner de éxito
    document.getElementById("successBanner").style.display = "none";
}

function procesarEnvio() {
    // Recuperar datos para crear el objeto final (Tratamiento de datos para JSON)
    const nuevoUsuario = {
        timestamp: new Date().toISOString(),
        perfil: {
            nombre: document.querySelector("#nombre").value,
            contacto: {
                email: document.querySelector("#email").value,
                tel: document.querySelector("#telefono").value
            }
        },
        rol: document.querySelector("#categoria").value
    };

    console.log("Objeto validado y listo:", nuevoUsuario);

    // Mostrar banner de éxito
    const banner = document.getElementById("successBanner");
    banner.style.display = "block";

    // Opcional: Mostrar JSON en consola o en un campo del HTML
    // document.querySelector("#jsonOutput").textContent = JSON.stringify(nuevoUsuario, null, 2);
}