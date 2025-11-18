//1
function decolverMes(fecha){
    let mes = fecha.getMonth();
    console.log(mes);
    return mes;
}

//2
let mes = decolverMes(new Date());

function mesesStrting(mes){
    switch(mes){
        case 0: return "Enero";

        case 1:return "Febrero";

        case 2:return "Marzo";

        case 3:return "Abril";

        case 4:return "Mayo";

        case 5:return "Junio";

        case 6:return "Julio";

        case 7:return "Agosto";

        case 8:return "Septiembre";

        case 9:return "Octubre";

        case 10:return "Noviembre";

        case 11:return "Diciembre";
        default: return "Mes invalido"
    }

}

function transformarMesesString(mes){
    const mesesTexto = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    if(mes < 0 || mes > 11){
        return null
    }
    return mesesTexto[mes];
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

//3
function contarDias(fecha){
    let fechaInicio = new Date(fecha);
    let fechaActual = new Date();

    let diasTranscurridos = Math.floor((fechaActual.getTime() -  fechaInicio.getTime()) / (1000 * 60 * 60 * 24));

    //Mostrar numero de dias transcurridos
    console.log(`Desde el ${fechaInicio.toLocaleDateString()} han trasncurrido ${diasTranscurridos} dias`);

    //Mostrar numero de lunes transcurridos
    console.log(`Han pasado ${Math.round((diasTranscurridos / 7))}`);

    let fechaLunes =[]
    let comprobarLunes = fechaInicio;

    while(fechaActual >= comprobarLunes){
        if(comprobarLunes.getDay() === 1){
            fechaLunes.push(new Date(comprobarLunes));
        }
        comprobarLunes.setDate(comprobarLunes.getDate()+1);
    }

    //Mostrar fecha de cada lunes
    console.log(`Estas son las fechas de cada lunes:`);
    fechaLunes.forEach(f => console.log(f.toLocaleDateString()));

    return diasTranscurridos;
}

contarDias("2025-8-15");

//4
function encontrarLunes(fecha){
    let fechaInicio = new Date(fecha);
    let fechaActual = new Date();

    let fechaLunes = []


    for(let anio = fechaInicio.getFullYear(); anio >= fechaActual.getFullYear(); anio--){
        let comprobarLunes = new Date(anio, 8, 15)
        if(comprobarLunes.getDay() === 1){
            fechaLunes.push(anio);
        }
    }
    console.log(`Los años donde el 15 de septiembre caerá en lunes son:`)
    fechaLunes.forEach(f => console.log(f));

}

encontrarLunes("2070-01-01")

const diasNoLectivos = {
    finSemana : [6, 0],
    vacaciones : [],
    diasFestivos : []
}

/*
function esLectivoONo(fecha){
    let fechaInicio = new Date(fecha);

    if(diasNoLectivos.finSemana.includes(fechaInicio.getDay())
        && diasNoLectivos.vacaciones.includes(fechaInicio)
        && diasNoLectivos.diasFestivos.includes(fechaInicio)){
        console.log(`El ${fechaInicio.toLocaleDateString()} no es un dia lectivo`)
    }else {
        console.log(`El ${fechaInicio.toLocaleDateString()} es un dia lectivo`)
    }
    console.log()

}*/
