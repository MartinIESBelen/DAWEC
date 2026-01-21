
console.log(datosAcademia);
function alumnosSinRepetir() {
    const vistos = new Set();

    return datosAcademia.alumnos.filter(alumno => {
        const clave = `${alumno.nombre}-${alumno.fechaNac}`;

        if (vistos.has(clave)) return false;

        vistos.add(clave);
        return true;
    });
}
/*function alumnosSinRepetir(){
    let limpiaAlumnos = datosAcademia.alumnos.filter((a, indiceOriginal, arrayCompleto) => {
            const primerIndice = arrayCompleto.findIndex( ar =>
            a.nombre === ar.nombre && a.fechaNac === ar.fechaNac
            );
            return indiceOriginal === primerIndice;
    })

    return limpiaAlumnos;
}*/

function getListaNombres(){
    const listaNombres = document.getElementById("nombresList");

    return listaNombres.innerHTML = alumnosSinRepetir().map(a => `<li data-id="${a.id}">${a.nombre}</li>`).join('');
}

function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const cumple = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumple.getFullYear();
    const mes = hoy.getMonth() - cumple.getMonth();

    // Ajuste por si aún no ha cumplido años este año
    if (mes < 0 || (mes === 0 && hoy.getDate() < cumple.getDate())) {
        edad--;
    }
    return edad;
}

// Aplicarlo a la lista
const alumnosConEdad = alumnosSinRepetir().map(alumno => {
    return {
        ...alumno,
        edad: calcularEdad(alumno.fechaNac)
    };
});

function getAlumnosMayores(){
    let alumnosMayores = alumnosConEdad.filter(a => a.edad > 25);

    return alumnosMayores.sort((a, b) => a.nombre.localeCompare(b.nombre));
}




addEventListener("DOMContentLoaded", () => {
    getListaNombres();
})