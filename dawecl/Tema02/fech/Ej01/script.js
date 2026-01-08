
const API_BASE = "https://api.github.com/users/";

const btnBuscar = document.getElementById("btnBuscar");
const salida = document.getElementById("datos");

btnBuscar.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        mostrarError("Introduce un nombre de usuario");
        return;
    }
    obtenerUsuario(username);
});


async function obtenerUsuario(username) {
    limpiarSalida();

    try {
        const userResp = await fetch(API_BASE + username);

        if (!userResp.ok) {
            throw new Error("El usuario no existe");
        }

        const userData = await userResp.json();

        const followers = await obtenerLista(userData.followers_url);
        const following = await obtenerLista(userData.following_url.replace("{/other_user}", ""));

        mostrarUsuario(userData, followers, following);

    } catch (error) {
        mostrarError(error.message);
    }
}


async function obtenerLista(url) {
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("No se pudo acceder a la lista");
        const lista = await resp.json();

        // Obtener datos individuales (fecha creación)
        const detalles = await Promise.all(
            lista.map(async user => {
                try {
                    const r = await fetch(user.url);
                    if (!r.ok) throw new Error();
                    const d = await r.json();
                    return {
                        nombre: d.login,
                        creado: d.created_at
                    };
                } catch {
                    return {
                        nombre: user.login,
                        creado: "No disponible"
                    };
                }
            })
        );

        return detalles;
    } catch {
        return [];
    }
}


function mostrarUsuario(user, followers, following) {
    salida.innerHTML = `
        <h3>${user.login}</h3>
        <p><strong>Cuenta creada:</strong> ${formatearFecha(user.created_at)}</p>

        <h4>Seguidores (${followers.length})</h4>
        ${crearLista(followers)}

        <h4>Sigue a (${following.length})</h4>
        ${crearLista(following)}
    `;
}


function crearLista(lista) {
    if (lista.length === 0) return "<p>No disponible</p>";

    return `
        <ul>
            ${lista.map(u =>
        `<li>${u.nombre} – ${formatearFecha(u.creado)}</li>`
    ).join("")}
        </ul>
    `;
}

function formatearFecha(fechaISO) {
    if (!fechaISO || fechaISO === "No disponible") return "No disponible";
    const f = new Date(fechaISO);
    return f.toLocaleDateString();
}

function mostrarError(msg) {
    salida.innerHTML = `<p class="error">${msg}</p>`;
}

function limpiarSalida() {
    salida.innerHTML = "";
}
