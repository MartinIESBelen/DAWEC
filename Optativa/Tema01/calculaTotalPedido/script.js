const TASA_ENVIO_LOCAL = 10;
const TASA_ENVIO_EXTRANGERO = 25;
const IMPUESTO_POR_PRODUCTO = 1.15;

function calcularTotalProducto(comanda) {


    let total = 0;
    for (let i = 0; i < comanda.listaProductos.length; i++) {
        let producto = comanda.listaProductos[i];
        total += producto.price * producto.quantity * IMPUESTO_POR_PRODUCTO; // 15% de impuesto incluido
    }
    return total;
}

function aplicarDescuentos(comanda, total){

    /*if (comanda.coupon) {
        if (comanda.coupon.type === 'percent') {

            total = total * (1 - comanda.coupon.value / 100);
        } else if (comanda.coupon.type === 'fixed') {

            total = total - comanda.coupon.value;
        }
    }
    return total;*/
    return comanda.coupon.type ==='precent' ? total * (1-comanda.coupon.value / 100) : total - comanda.coupon.value;
}

function sumarPrecioEnvio(comanda, total) {


    if(!comanda.shipping) return total;

    const pais = comanda.shipping.country;
    return pais === "US" ? total += TASA_ENVIO_LOCAL : total += TASA_ENVIO_EXTRANGERO;
}

function mostrarPrecioTotal(total) {
    console.log("Total Sucio:", total);
}


const sampleOrder = {
    listaProductos: [{ price: 50, quantity: 2 }, { price: 100, quantity: 1 }],
    coupon: { type: 'percent', value: 10 },
    shipping: { country: 'CA' }
};

let total = calcularTotalProducto(sampleOrder);
total = aplicarDescuentos(sampleOrder, total)
total = sumarPrecioEnvio(sampleOrder, total)
mostrarPrecioTotal(total);