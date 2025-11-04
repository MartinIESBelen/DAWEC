
function calcularTotalProducto(comanda) {
    const IMPUESTO_POR_PRODUCTO = 1.15;

    let total = 0;
    for (let i = 0; i < comanda.listaProductos.length; i++) {
        let producto = comanda.listaProductos[i];
        total += producto.price * producto.quantity * IMPUESTO_POR_PRODUCTO; // 15% de impuesto incluido
    }
    return total;
}

function aplicarDescuentos(comanda, total){
    if (comanda.coupon) {
        if (comanda.coupon.type === 'percent') {
// Descuento porcentual
            total = total * (1 - comanda.coupon.value / 100);
        } else if (comanda.coupon.type === 'fixed') {
// Descuento fijo
            total = total - comanda.coupon.value;
        }
    }
    return total;
}

function sumarPrecioEnvio(comanda, total) {
    const TASA_ENVIO_LOCAL = 10;
    const TASA_ENVIO_EXTRANGERO = 25;

    if(!comanda.shipping) return total;

    const pais = comanda.shipping.country;
    return pais === "US" ? total += TASA_ENVIO_LOCAL : total += TASA_ENVIO_EXTRANGERO;
}

function mostrarPrecioTotal(total) {
    console.log("Total Sucio:", total);
}

// Ejemplo de uso:
const sampleOrder = {
    listaProductos: [{ price: 50, quantity: 2 }, { price: 100, quantity: 1 }],
    coupon: { type: 'percent', value: 10 }, // 10% de descuento
    shipping: { country: 'CA' }
};

let total = calcularTotalProducto(sampleOrder);
total = aplicarDescuentos(sampleOrder, total)
total = sumarPrecioEnvio(sampleOrder, total)
mostrarPrecioTotal(total);