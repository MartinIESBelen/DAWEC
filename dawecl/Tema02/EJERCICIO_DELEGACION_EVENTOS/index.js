const personas = [
    {name: "Jon", surname: "Doe", age: 18, alive: true},
    {name: "Jane", surname: "Dane", age: 20, alive: false},
    {name: "Mario", surname: "Mariolini", age: 48, alive: true},
    {name: "Francesco", surname: "Virgonilini", age: 12, alive: false}
]
const procesarPersona = (persona) => {
    const {name, surname, age, alive} = persona;
    const aliveIcon = alive ? "✓" : "x";
    return `
    <tr data-count="0"> 
    <td>${name}</td> 
    <td>${surname}</td> 
    <td>${age}</td> 
    <td>${aliveIcon}</td>
    <td><button> Borrar</button></td>
    </tr>
    `;
}

const crearTabla = (personas) => {
    return personas.map((persona) => {
        return procesarPersona(persona);
    }).join('');
};

document.addEventListener('DOMContentLoaded', () => {
    const tbodyEl = document.querySelector("tbody");
    const inputNameEl = document.querySelector("#input-name");
    const inputSurnameEl = document.querySelector("#input-surname");
    const inputAgeEl = document.querySelector("#input-age");
    const inputAliveEl = document.querySelector("#input-alive");
    const btnFormEl = document.querySelector("#btn-formulario");
    tbodyEl.innerHTML = crearTabla(personas);

    let index = null;
    tbodyEl.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        index = row.rowIndex - 1;
        inputNameEl.value = personas[index].name;
        inputSurnameEl.value = personas[index].surname;
        inputAgeEl.value = personas[index].age;
        inputAliveEl.checked = personas[index].alive;
        const allRows = tbodyEl.querySelectorAll("tr");
        allRows.forEach((row) => {
            row.classList.remove("activo");
        });
        row.classList.add("activo");
        btnFormEl.textContent = "Editar";
    });

    btnFormEl.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.textContent === "Editar") {
            personas[index].name = inputNameEl.value;
            personas[index].surname = inputSurnameEl.value;
            personas[index].age = inputAgeEl.value;
            personas[index].alive = inputAliveEl.checked;
            const celda = tbodyEl.children[index].children;
            celda[0].textContent = personas[index].name;
            celda[1].textContent = personas[index].surname;
            celda[2].textContent = personas[index].age;
            celda[3].textContent = personas[index].alive ? "✓" : "x";
        } else {
            const nuevaPersona = {
                name: inputNameEl.value,
                surname: inputSurnameEl.value,
                age: inputAgeEl.value,
                alive: inputAliveEl.checked,
            }
            personas.push(nuevaPersona);
            tbodyEl.insertAdjacentHTML("afterbegin", procesarPersona(nuevaPersona));
        }


        e.target.form.reset();
        btnFormEl.textContent = "Nuevo";
        const allRows = tbodyEl.querySelectorAll("tr");
        allRows.forEach((row) => {
            row.classList.remove("activo");
        });
    })

})