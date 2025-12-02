
document.addEventListener('DOMContentLoaded', event => {

    const tabla = document.querySelector('table')
    const btnFila = document.querySelector('button[id="btnF"]')
    const btnColumna = document.querySelector('button[id="btnC"]')

    function generarColumna(){
        if(!tabla)return;
        let numFil = tabla.rows.length;

        for(let i = 0; i < numFil; i++){
            tabla.rows[i].insertCell();
        }
    }

    function generarFila(){
        if(!tabla)return;
        let numCol = tabla.rows[0].cells.length;
        const nuevaFila = tabla.insertRow();

        for(let i = 0; i < numCol; i++){
            nuevaFila.insertCell();
        }
    }

    btnFila.addEventListener('click', generarFila);
    btnColumna.addEventListener('click', generarColumna);

})


