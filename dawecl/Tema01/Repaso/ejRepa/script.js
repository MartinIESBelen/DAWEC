import { empleados } from './empleadosList.js';

// Lista de acciones disponibles
const campos = [
    "Mostrar todos",
    "Filtrar por departamento",
    "Buscar por nombre",
    "Mostrar contratados después de una fecha",
    "Mostrar con salario mayor a",
    "Ordenar por salario",
    "Ordenar por antigüedad"
];

//Muestra todos los empleados en tabla
function mostrarTodo(listaEmpleados) {
    console.table(listaEmpleados);
    return listaEmpleados;
}

//Filtra por campo genérico (nombre, departamento)
function filtrarPorCampo(listaEmpleados, campo, valor) {
    const resultado = listaEmpleados.filter(e =>
        String(e[campo]).toLowerCase().includes(valor.toLowerCase())
    );
    console.table(resultado);
    return resultado;
}

//Agrupa todas las fechas de contratación
function agruparFechas(listaEmpleados) {
    return listaEmpleados.map(e => new Date(e.fechaContratacion));
}

//Filtra empleados contratados después de una fecha
function filtrarFechaContratos(listaEmpleados, fecha) {
    const fechaFiltro = new Date(fecha);
    const resultado = listaEmpleados.filter(
        e => new Date(e.fechaContratacion) > fechaFiltro
    );
    console.table(resultado);
    return resultado;
}

//Agrupa todos los salarios
function agruparSalarios(listaEmpleados) {
    return listaEmpleados.map(e => e.salario);
}

//Filtra empleados con salario mayor a X
function mostrarSalarioMayor(listaEmpleados, salarioFiltro) {
    const resultado = listaEmpleados.filter(e => e.salario > salarioFiltro);
    console.table(resultado);
    return resultado;
}

//Ordena empleados por salario (descendente)
function ordenarSalarios(listaEmpleados) {
    const resultado = [...listaEmpleados].sort((a, b) => b.salario - a.salario);
    console.table(resultado);
    return resultado;
}

//Ordena empleados por antigüedad (ascendente)
function ordenarPorAntiguedad(listaEmpleados) {
    const resultado = [...listaEmpleados].sort(
        (a, b) => new Date(a.fechaContratacion) - new Date(b.fechaContratacion)
    );
    console.table(resultado);
    return resultado;
}

// Formatea fecha en formato DD/MM/YYYY
function formatearFecha(fecha) {
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

// Crea el selector dinámico de acciones
function generarSelector() {
    const htmlSelector = document.getElementById('filtros');

    htmlSelector.innerHTML = `
    <label for="campo">Seleccione una acción:</label>
    <select id="campo">
      ${campos.map(op => `<option value="${op}">${op}</option>`).join("")}
    </select>
    <input type="text" id="valor" placeholder="Introduce un valor si aplica...">
    <button id="aplicar">Aplicar</button>
  `;
}

// Muestra los empleados filtrados/ordenados según la opción elegida
function mostrarEmpleados() {
    const listaEmpleados = empleados;
    const accion = document.getElementById("campo").value;
    const valor = document.getElementById("valor").value.trim();
    let resultado = [];

    switch (accion) {
        case "Mostrar todos":
            resultado = mostrarTodo(listaEmpleados);
            break;

        case "Filtrar por departamento":
            resultado = filtrarPorCampo(listaEmpleados, "departamento", valor);
            break;

        case "Buscar por nombre":
            resultado = filtrarPorCampo(listaEmpleados, "nombre", valor);
            break;

        case "Mostrar contratados después de una fecha":
            resultado = filtrarFechaContratos(listaEmpleados, valor);
            break;

        case "Mostrar con salario mayor a":
            resultado = mostrarSalarioMayor(listaEmpleados, Number(valor));
            break;

        case "Ordenar por salario":
            resultado = ordenarSalarios(listaEmpleados);
            break;

        case "Ordenar por antigüedad":
            resultado = ordenarPorAntiguedad(listaEmpleados);
            break;

        default:
            console.warn("Opción no reconocida");
    }

    // Mostrar en el contenedor
    const salida = document.getElementById("salida");
    salida.innerHTML = resultado.map(e => `
    <p>
      <strong>${e.nombre}</strong> (${e.departamento})<br>
      Edad: ${e.edad} años<br>
      Salario: ${e.salario} €<br>
      Contratación: ${formatearFecha(new Date(e.fechaContratacion))}
    </p>
  `).join("");
}

// Inicializar interfaz cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('contenedor');

    container.innerHTML = `
    <h1>Gestión de empleados</h1>
    <div id="filtros"></div>
    <div id="salida"></div>
  `;

    generarSelector();

    document.getElementById('aplicar').addEventListener('click', mostrarEmpleados);
});