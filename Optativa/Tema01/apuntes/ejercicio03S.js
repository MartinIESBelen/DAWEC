const products = () => {
    return[
        { id: 1, name: "Laptop", price: 1200, category: "tech", stock: 5 },
        { id: 2, name: "Mouse", price: 20, category: "tech", stock: 30 },
        { id: 3, name: "Café", price: 5, category: "food", stock: 100 },
        { id: 4, name: "Té", price: 3, category: "food", stock: 50 },
    ];
}

function estandarizarProductos(rawProductos){
    return rawProductos.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category,
        stock: p.stock,
    }))
}

function aniadirProducto(productos, newProducto){
    return [...productos,newProducto];
}

function aplicarDescuento(productos, descuento){
    return productos.map(p => ({
        ...p,
            price: p.price * descuento
    }));
}

function filtrarPorNombre(productos, nombre){
    return productos.filter(p => p.name.toLowerCase().includes(nombre.toLowerCase()) );
}

function ordernarPorPrecio(productos, orden){
    let copia = [...productos];

       return  copia.sort((a, b) =>
           orden === "DESC" ? b.price - a.price: a.price - b.price
       );

}

function actualizarStock(productos, ventas){
    return productos.map(p => ({
          ...p,
          stock: p.stock - ventas,
    }));
}

const listaProductos = products();

const listaProEstandarizada = estandarizarProductos(listaProductos);

console.log(listaProEstandarizada);
let nuevaLista = aniadirProducto(listaProEstandarizada, { id: 6, name: "PS5", price: 600, category: "tech", stock: 10 });
console.log(nuevaLista);
console.log(aplicarDescuento(listaProEstandarizada, 0.85));
console.log(filtrarPorNombre(nuevaLista, "ps5"));
console.log(ordernarPorPrecio(listaProEstandarizada, "ASC"));
console.log(actualizarStock(listaProEstandarizada, 3));

/*
// Singleton global para almacenar los productos y los resultados (MAL)
export const P = {
    pr: [],
    r: []
};

// Carga de productos acoplada y dependiente del Singleton (TIGHT COUPLING)
export function load(arr) {
    arr.forEach(p => P.pr.push(p)); // mutación
}



// Función gigante que lo hace todo (MAL NOMBRE, NO TESTEABLE)
export function x(c, d, o, n) {
    // c = category
    // d = discount
    // o = order
    // n = name search

    // duplicación de código y mutación
    let F = [];
    for (let i = 0; i < P.pr.length; i++) {
        if (P.pr[i].category === c || c === undefined) {
            F.push(P.pr[i]);  // mutación innecesaria
        }
    }

    // aplicar descuento (mutación directa)
    F.forEach(p => {
        p.price = p.price - (p.price * d);
    });

    // filtrar por nombre (duplicación)
    if (n) {
        let temp = [];
        for (let j = 0; j < F.length; j++) {
            if (F[j].name.includes(n)) {
                temp.push(F[j]);
            }
        }
        F = temp;
    }

    // premature optimization (ordenamiento manual)
    if (o === "ASC") {
        for (let i = 0; i < F.length; i++) {
            for (let j = i + 1; j < F.length; j++) {
                if (F[j].price < F[i].price) {
                    let t = F[i];
                    F[i] = F[j];
                    F[j] = t;
                }
            }
        }
    }

    // guardar en singleton (TIGHT COUPLING)
    P.r = F;
    return F;
}

// actualizar stock (mutación + mal acoplamiento)
export function u(id, s) {
    for (let i = 0; i < P.pr.length; i++) {
        if (P.pr[i].id === id) {
            P.pr[i].stock -= s;
        }
    }
}*/
