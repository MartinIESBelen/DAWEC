
const personas = [
    {
        name: "John",
        surname: "smith",
        age: 33,
        alive: true,
    },
    {
        name: "Albert",
        surname: "Camus",
        age: 40,
        alive: false,
    },
    {
        name: "Clark",
        surname: "Kent",
        age: 34,
        alive: true,
    },
    {
        name: "Vam",
        surname: "Gogh",
        age: 37,
        alive: false,
    }
]

function listarInfoColumns(listObject){
    return listObject.map( (e, index) => {
        return `
                <tr data-index="${index}">
                    <td>${e.name}</td>
                    <td>${e.age}</td>
                    <td>${e.surname}</td>
                    <td>${e.alive}</td>
                </tr>`
    }).join("");
}

function aniadir


document.addEventListener('DOMContentLoaded', ()=>{
    let contenedor = document.getElementById('cuerpoTabla');

    contenedor.innerHTML = listarInfoColumns(personas);

    document.addEventListener('oclick', (event)=>{

    })
});