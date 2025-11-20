let list = []; let sum = 0; let cont = 0;

function createi(name, pre) {
    if (name == "" || pre < 0 || pre > 10) {
        console.log("Datos incorrectos");
        return;
    }
    let found = false;
    for (let i = 0; i < list.length; i++) {
        if (list[i].name == name) { found = true; break; }
    }
    if (found) { console.log("Alumno ya existe"); return; }

    list.push({name: name, pre: pre});
    sum = 0;
    for (let i = 0; i < list.length; i++) {
        sum = sum + list[i].pre;
    }
    cont = list.length;
    console.log("Alumno añadido correctamente");
}

function comprobarAlumno(listaAlumnos, nombre) {
    return listaAlumnos.some(a => a.nombre === nombre);
}



function remove(name) {
    let found = false;
    let pos = -1;
    for (let i = 0; i < list.length; i++) {
        if (list[i].name == name) { found = true; pos = i; break; }
    }
    if (!found) { console.log("Alumno no encontrado",name); return; }

    list.splice(pos, 1);
    sum = 0;
    for (let i = 0; i < list.length; i++) {
        sum = sum + list[i].pre;
    }
    cont = list.length;
    console.log("Alumno eliminado", name);
}

function show() {
    console.log("=== LISTADO DE ALUMNOS ===");
    if (list.length == 0) { console.log("No hay alumnos"); return; }
    for (let i = 0; i < list.length; i++) {
        sum = sum + list[i].pre;
        let estado = list[i].pre;
        if (estado < 1) {
            estado = "puffff";
        } else {
            if (estado < 3) {
                estado = "Insuficiente";
            } else {
                if (estado < 5) {
                    estado = "Deficiente";
                } else {
                    if (estado < 6) {
                        estado = "Satisfactorio";
                    } else {
                        if (estado < 7) {
                            estado = "OK";
                        } else {
                            if (estado < 8.5) {
                                estado = "Bueno";
                            } else {
                                estado = "Muy bueno";
                            }
                        }
                    }
                }
            }
        }
        console.log(`${list[i].name} - Nota: ${list[i].pre} (${estado})`);
    }
    let media = sum / cont;
    let mensaje = media >= 7 ? "¡Clase destacada!" : "A mejorar";
    console.log(`Media de la clase: ${media.toFixed(2)} → ${mensaje}`);
}

createi("Martin", 7);
createi("Jose", 9);

console.log(show());

remove("Martin");

console.log(show());