const salaries =
    {   "John":100,
        "Pete":300,
        "Doe":400,
        "Mary":250,
        "Raul":10   };

function sumaSalarios(){
    let totalSalarios = 0;
    for (const salario of Object.values(salaries)) {
        totalSalarios += salario;
    }
    return totalSalarios;
}

/*
const ordenarSalarios = Object.key(salaries)
    .sort().reduce((obj,key) =>{ obj[key] =salaries[key];
return obj;}, {});

console.log(ordenarSalarios);
*/

const nombresOrdenados = Object.keys(salaries).sort();

for(const nombre of nombresOrdenados){
    console.log(`${nombre}:${salaries[nombre]}`);
}
console.log(sumaSalarios());

