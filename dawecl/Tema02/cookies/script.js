const X_MINUTOS = 90;
const Y_MILISEGUNDOS = 9000;

function manejadorDeLogin(){
    let nombre = document.getElementById("nombre").value;
    if(!nombre || nombre.trim() === ""){
        alert("Debe escribir un nombre")
        return;
    }

    if(!docCookies.hasItem("reincidente")){
        console.log("Hola " + nombre + " encantado de conocerte.");
        docCookies.setItem("reincidente", "true", Infinity);
    }else{
        console.log("Hola de nuevo");
        ocultarFormulario(nombre);
    }

    docCookies.setItem("nombre", nombre, 600);
}

function ocultarFormulario(nombre){
    let form = document.querySelector("#formLogin");

    form.innerHTML = `<p>¡Bienvenido de nuevo <strong>${nombre}</strong> !</p>`;
}

function comprobarPresencia() {
    // Solo preguntamos si el usuario está logueado (existe la cookie nombre)
    if (docCookies.hasItem("nombre")) {

        setTimeout(() => {
            // Volvemos a verificar antes de lanzar el confirm por si expiró justo antes
            if (!docCookies.hasItem("nombre")) return;

            const sigueAqui = confirm("¿Sigues allí?");

            if (sigueAqui) {
                console.log("Usuario confirmado. Extendiendo sesión...");
                let nombreActual = docCookies.getItem("nombre");

                // Extendemos la cookie otros X minutos
                docCookies.setItem("nombre", nombreActual, X_MINUTOS);

                // Programamos la siguiente pregunta
                comprobarPresencia();
            } else {
                console.log("Sesión finalizada por el usuario.");
                docCookies.removeItem("nombre");
                location.reload(); // Recargamos para mostrar el login de nuevo
            }
        }, Y_MILISEGUNDOS);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    comprobarPresencia()
    let btnRegistro = document.querySelector("#btnRegistro");
    let btnEnviar = document.querySelector("#btnEnviar");
    let textArea = document.querySelector("#textArea");

    btnRegistro.addEventListener("click", manejadorDeLogin );

    btnEnviar.addEventListener("click", function(){
        console.log("formulario enviado");
    })

    if(textArea){
        if(docCookies.hasItem("text")){
            textArea.value = docCookies.getItem("text");
        }
        textArea.addEventListener("input", function(){
            docCookies.setItem("text", textArea.value);
        })
    }


})

