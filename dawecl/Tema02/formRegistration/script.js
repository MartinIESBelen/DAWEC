const foodFlavors ={
    Pizza:["barbacoa", "peperoni", "hawaiana"],
    Burger:["double cheese", "diabola", "Bacon"],
    Campero:["pollo", "tortilla", "completo"]
}

function validarName(name){
    if(name.trim().length < 7 && name.length > 35|| !name || name === numbers){
        return false;
    }
    return true;
}

function validarEdad(edad){
    if(!edad === numbers){
        return false;
    }
    return true;
}


// Referencia del input
const form = document.querySelector('form');


// 1. Evento FOCUS: El usuario hace clic en el input
form.addEventListener('focus', (e) => {
    if(e.target.id === 'name'){
        document.getElementById('helpMessageName').classList.remove('hidden');
        console.log('El input de Nombre ha recibido el foco.');
        return;
    }
    if(e.target.id === 'edad'){
        document.getElementById('helpMessageAge').classList.remove('hidden');
        console.log('El input de edad ha recibido el foco.');
        return;
    }
    document.getElementById('helpMessageFlavor').classList.add('hidden');
    console.log('El input de flavor ha recibido el foco.');
    // Muestra el mensaje de ayuda

});

// 2. Evento BLUR: El usuario sale del input
form.addEventListener('blur', (e) => {
    // Oculta el mensaje de ayuda
    if(e.target.id === 'name'){
        document.getElementById('helpMessageName').classList.add('hidden');
        console.log('El input de Nombre ha perdido el foco.');
        return;
    }
    if(e.target.id === 'edad'){
        document.getElementById('helpMessageAge').classList.add('hidden');
        console.log('El input de edad ha perdido el foco.');
        return;
    }
    document.getElementById('helpMessageFlavor').classList.add('hidden');
    console.log('El input de flavor ha perdido el foco.');
});

