
// 1. OBTENER CARGAS (Corregido 'optener' a 'obtener')
function obtenerCargasSinRepetir(){
    return [...new Set(flota.flatMap(v => v.cargas))];
}

function generarOptioCargas(){
    const select = document.getElementById("sltFiltro");
    const tipos = obtenerCargasSinRepetir();
    const defaultOption = '<option value="todasCargas">Todas las cargas</option>';
    const options = tipos.map(t => `<option value="${t}">${t}</option>`).join("");
    select.innerHTML = defaultOption + options;
}

// 2. GENERAR CARTELES (Corregido el innerHTML)
function generarCarteles(listaVehiculos){
    const contenedor = document.querySelector("#contenedorVehiculos");

    // CORRECCIÓN: Usamos '=' en vez de '+=' para limpiar lo anterior
    contenedor.innerHTML = listaVehiculos.map(v => {
        // Añadí estilos inline para que se vea decente sin CSS externo
        return `<div style="border: 1px solid #ccc; padding: 10px; margin: 10px; width: 200px; display:inline-block; vertical-align: top;">
                    <h3>${v.id}</h3>
                    <p>(${v.modelo})</p>
                    <p><strong>Estado: </strong>${v.estado}</p>
                    <p><strong>Bateria: </strong>${v.bateria}</p>
                    <p><strong>Autonomía: </strong>${v.autonomia_km} km</p>
                    <p><strong>Cargas: </strong>${v.cargas.join(' | ')}</p>
                </div>`;
    }).join('');

    // Mensaje si no hay resultados
    if(listaVehiculos.length === 0){
        contenedor.innerHTML = "<p>No hay vehículos que coincidan.</p>";
    }
}

// 3. FILTROS INDIVIDUALES

function filtrarPorCarga(lista){
    const filtro = document.getElementById("sltFiltro").value;

    if(filtro === "todasCargas"){
        return lista;
    }
    // CORRECCIÓN: El includes verifica si la carga seleccionada está en el array del vehículo
    return lista.filter(v => v.cargas.includes(filtro));
}

function filtrarPorEstado(lista){
    // Obtenemos el radio button marcado
    const radioSeleccionado = document.querySelector("input[name='estado']:checked");

    // Si no hay nada marcado, devolvemos la lista entera
    if (!radioSeleccionado) return lista;

    const valor = radioSeleccionado.value;

    // Lógica según el value del HTML
    if(valor === "Todos"){
        return lista;
    }
    if(valor === "Disponibles"){
        return lista.filter(v => v.estado === "Disponible");
    }
    if(valor === "Fuera de servicio"){
        // Agrupamos los estados malos
        return lista.filter(v => v.estado === "No Disponible" || v.estado === "En Mantenimiento");
    }
    return lista;
}

function filtrarPorKM(lista){
    const input = document.getElementById("asignacionInteligente").value;
    const kmRequerido = parseInt(input) || 0; // Si está vacío es 0

    // CORRECCIÓN: Debe ser mayor o igual (>=), no estricto (===)
    return lista.filter(v => v.autonomia_km >= kmRequerido);
}

// 4. ORQUESTADOR (Master Filter)
function filtrarVehiculos(){
    let listaProcesada = [...flota]; // Copia original

    // Aplicamos filtros en cadena
    listaProcesada = filtrarPorCarga(listaProcesada);
    listaProcesada = filtrarPorEstado(listaProcesada);
    listaProcesada = filtrarPorKM(listaProcesada);

    generarCarteles(listaProcesada);
}

// 5. REPORTE FINANCIERO (Corregido)
function generarReportes(){
    // Calculamos el total sumando el historial de cada vehículo
    const gastoTotal = flota.reduce((totalFlota, vehiculo) => {
        // Sumamos los mantenimientos de ESTE vehículo
        const totalVehiculo = vehiculo.historial_mantenimiento.reduce((acc, m) => acc + m.costo, 0);
        return totalFlota + totalVehiculo;
    }, 0);

    alert(`El costo total acumulado de mantenimiento de la flota es: ${gastoTotal} €`);
}

// 6. EVENTOS
document.addEventListener('DOMContentLoaded',() => {
    generarOptioCargas();
    generarCarteles(flota);

    // Marcar "Todos" por defecto
    document.querySelector("#rdTodos").checked = true;

    // Evento Select Carga
    document.querySelector("#sltFiltro").addEventListener("change", filtrarVehiculos);

    // Evento Botón Buscar (KM)
    document.querySelector("#buscar").addEventListener("click", filtrarVehiculos);

    // Eventos Radio Buttons (Estado) - Hay que asignarlo a TODOS los radios
    const radios = document.querySelectorAll("input[name='estado']");
    radios.forEach(r => r.addEventListener("change", filtrarVehiculos));

    // Evento Reporte
    document.querySelector("#btnGeberarReporte").addEventListener("click", generarReportes);
});