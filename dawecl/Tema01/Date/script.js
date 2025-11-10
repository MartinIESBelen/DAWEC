
function decolverMes(fecha){
    let mes = fecha.getMonth();
    console.log(mes);
    return mes;
}

let mes = decolverMes(new Date());

function mesesStrting(mes){
    switch(mes){
        case 0: return "Enero";
        break;
        case 1:return "Febrero";
        break;
        case 2:return "Marzo";
        break;
        case 3:return "Abril";
        break;
        case 4:return "Mayo";
        break;
        case 5:return "Junio";
        break;
        case 6:return "Julio";
        break;
        case 7:return "Agosto";
        break;
        case 8:return "Septiembre";
        break;
        case 9:return "Octubre";
        break;
        case 10:return "Noviembre";
        break;
        case 11:return "Diciembre";
        default: return "Mes invalido"
    }

}

let mesString = mesesStrting(mes)

console.log(mesString);

function pintarFormato(fecha){
    let mes = decolverMes(fecha);
    let mesString = mesesStrting(mes);
    let hora = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;

    console.log(`${mesString}. Ahora: ${hora}`);
    return `${mesString}. Ahora: ${hora}`;
}

pintarFormato(new Date());

function contarDias(fecha){
    let fechaActual = new Date().toLocaleDateString();

    let diasTranscurridos = (Date.parse(`${fechaActual}`) -  Date.parse("2025, 8, 15")) / (1000 * 60 * 60 * 24);
    return diasTranscurridos;
}

console.log(contarDias(new Date(2025, 8, 15)));