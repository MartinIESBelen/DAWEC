const empleados = [
    {nombre: "Laura", edad: 32, salario: 2800},
    {nombre: "José", edad: 45, salario: 3100},
    {nombre: "Ana", edad: 28, salario: 3250}
];

/**
 * 🧠 Añade o crea un atributo. Si el valor es un array, lo inserta dentro del objeto.
 * Si el atributo ya existe y es array, lo amplía.
 * Si es valor único, lo asigna.
 * @param {Array} lista - lista de objetos
 * @param {String} clave - nombre del nuevo atributo
 * @param {Any|Array} valor - valor o array de valores
 * @param {String|null} nombreEmpleado - opcional: para modificar uno solo
 */
function agregarAtributo(lista, clave, valor, nombreEmpleado = null) {
    if (!Array.isArray(lista) || lista.length === 0) {
        console.warn("⚠ Lista vacía o no válida.");
        return;
    }

    // ✅ Si se indica un empleado concreto
    if (nombreEmpleado) {
        const empleado = lista.find(e => e.nombre.toLowerCase() === nombreEmpleado.toLowerCase());
        if (!empleado) {
            console.warn(⚠ Empleado
            '${nombreEmpleado}'
            no
            encontrado.
        )
            ;
            return;
        }

        // Si el valor es un array y no existe la propiedad, la crea como array
        if (Array.isArray(valor)) {
            if (!Array.isArray(empleado[clave])) {
                empleado[clave] = [];
            }
            empleado[clave].push(...valor);
        } else {
            // Si no es array, asigna directamente
            empleado[clave] = valor;
        }

        console.table(lista);
        return;
    }

    // ✅ Si se aplica a todos los empleados
    lista.forEach((obj, i) => {
        if (Array.isArray(valor)) {
            if (!Array.isArray(obj[clave])) {
                obj[clave] = [];
            }
            // Si el array de valores tiene el mismo largo que la lista, asigna el correspondiente
            if (valor.length === lista.length) {
                obj[clave].push(valor[i]);
            } else {
                // Si el array es común para todos
                obj[clave].push(...valor);
            }
        } else {
            obj[clave] = valor;
        }
    });

    console.table(lista);
}

/**
 * 🧹 Elimina un atributo o borra un valor de un array interno si coincide
 * @param {Array} lista - lista de objetos
 * @param {String} clave - atributo a eliminar
 * @param {String|null} nombreEmpleado - opcional: uno concreto
 * @param {Any|null} valor - opcional: eliminar valor específico dentro del array
 */
function eliminarAtributo(lista, clave, nombreEmpleado = null, valor = null) {
    if (!Array.isArray(lista) || lista.length === 0) {
        console.warn("⚠ Lista vacía o no válida.");
        return;
    }

    const eliminarDe = nombreEmpleado
        ? lista.filter(e => e.nombre.toLowerCase() === nombreEmpleado.toLowerCase())
        : lista;

    eliminarDe.forEach(obj => {
        if (!obj.hasOwnProperty(clave)) return;

        // Si hay un valor a eliminar dentro del array
        if (valor !== null && Array.isArray(obj[clave])) {
            obj[clave] = obj[clave].filter(v => v !== valor);
            if (obj[clave].length === 0) delete obj[clave];
        } else {
            delete obj[clave];
        }
    });

    console.table(lista);
}

// 🧪 Ejemplos de uso:

console.log("📋 Lista original:");
console.table(empleados);

// ➕ Añadir tareas (array) a un empleado concreto
agregarAtributo(empleados, "tareas", ["Reunión", "Informe"], "Laura");

// ➕ Añadir más tareas (se acumulan en el array existente)
agregarAtributo(empleados, "tareas", ["Entrevista"], "Laura");

// ➕ Añadir un atributo común (texto) a todos
agregarAtributo(empleados, "departamento", "Ventas");

// ➕ Añadir un array igual para todos (por ejemplo, beneficios)
agregarAtributo(empleados, "beneficios", ["Seguro médico", "Gym"]);

// ➖ Eliminar valor concreto del array interno
eliminarAtributo(empleados, "tareas", "Laura", "Informe");

// ➖ Eliminar atributo completo
eliminarAtributo(empleados, "beneficios");


/*
<input type="checkbox" id="modoOscuro"/>
<label htmlFor="modoOscuro">Activar modo oscuro</label>

<script>
    const checkbox = document.getElementById("modoOscuro");

    checkbox.addEventListener("change", (event) => {
    if (event.target.checked) {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    console.log("✅ Modo oscuro activado");
} else {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    console.log("☀️ Modo oscuro desactivado");
}
});
</script>*/
