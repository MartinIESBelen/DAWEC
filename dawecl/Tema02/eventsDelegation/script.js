
function handleMouseMove(event){
    const infoCaja = document.getElementById("información");

    const elemento = event.target;

    infoCaja.innerHTML = `
    <p><strong>Cordenadas</strong> (${event.clientX}, ${event.clientY})</p>
    <p><strong>Nombre</strong> (${elemento.tagName.trim()})</p>
    <p><strong>id</strong> (${elemento.id})</p>
    <p><strong>Texto:</strong> (${elemento.textContent})</p>
`;
}

function destacarElemento(event){
    event.target.classList.add('destacar');
}

function limpiarElemento(event){
    event.target.classList.remove('destacar');
}

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseover', destacarElemento);
document.addEventListener('mousemove', limpiarElemento);