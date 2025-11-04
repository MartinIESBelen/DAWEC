

const person ={
    "nombre":"Noon",
    "edad":6,
    "aficiones":["Deporte", "Lectura", "Viajar"],
    "emancipado":true
}

function pintarFormulario(person){
    let tarjeta = document.createElement("form");
    tarjeta.className = 'tarjeta';
    const botones = Object.values(person)[2]
        .map(af => `<button type="button">${af}</button>`)
        .join('');

    tarjeta.innerHTML = `
    
    <label for="nombre">Nombre</label>
    <input type="text" id="nombre" value="${Object.values(person)[0]}">
    <br>
    <label for="edad" >Edad</label>
    <input type="text" id="edad" value="${Object.values(person)[1]}">
    <br>
    <label for="aficiones">Aficiones:</label>
    <div>
        ${botones}
    </div>
    <label for="emancipado">Emancipado:</label>
    <input id="emancipado" type="checkbox" ${Object.values(person)[3] ? 'checked' : ''}></input>
    
    <br>
    <button type="submit">Enviar</button>
    `

    document.body.appendChild(tarjeta);
}

pintarFormulario(person);