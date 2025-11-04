
//Calculadora
export const impuestoBase = 0.10;
export const descuento1 = 0.10;
export const descuento2 = 0.05;

export function doCalc(listaProductos, codigoDescuento) {
    if (!Array.isArray(listaProductos) || listaProductos.length === 0) return 0;

    const total = listaProductos.reduce((accumulador, producto) => accumulador + producto.price, 0);

    let descuento = 0;
    if (codigoDescuento === 'WELCOME') {
        descuento = descuento1;
    }
    else if (codigoDescuento === 'SUMMER'){
        descuento = descuento2;
    }

    const precioConDescuento = total * (1 - descuento);
    return precioConDescuento * (1 + impuestoBase);
}