
const API_KEY = "d5c5dbcffeb844fd802124534260801";
const API_BASE = "https://api.weatherapi.com/v1/current.json";

const btnBuscar = document.getElementById("btnBuscar");
const salida = document.getElementById("datos");

btnBuscar.addEventListener("click", () => {
    const localizacion = document.getElementById("localizacion").value.trim();
    if (!localizacion) {
        mostrarError("Introduce una localización");
        return;
    }
    obtenerTiempo(localizacion);
});

// Obtener los datos
async function obtenerTiempo(localizacion) {
    limpiarSalida();

    const url = `${API_BASE}?key=${API_KEY}&q=${localizacion}&lang=es`;

    try {
        const resp = await fetch(url);

        if (!resp.ok) {
            console.error("Error HTTP:", resp.status);
            throw new Error("La localización no se encontró");
        }

        const datos = await resp.json();
        mostrarTiempo(datos);

    } catch (error) {
        console.error("Error al obtener el tiempo:", error.message);
        mostrarError(error.message);
    }
}

//Mostrar los datos
function mostrarTiempo(datos) {
    const iconUrl = "https:" + datos.current.condition.icon;

    salida.innerHTML = `
        <img src="${iconUrl}" alt="Icono del tiempo">
        <div>${datos.location.name}
             (${datos.current.condition.text}).
             <strong>Temp:</strong> ${datos.current.temp_c} °C</div>
    `;
}

// utilidades
function mostrarError(msg) {
    salida.innerHTML = `<p class="error">${msg}</p>`;
}

function limpiarSalida() {
    salida.innerHTML = "";
}

