//Antes de corregir.
/*
let cart = [];
function addItemToCart(item) {
    cart.push({ item, date: Date.now() });
}
function applyDiscount(cart, discount) {
    cart.forEach(item => {
        item.item.price -= item.item.price * discount;
    });
}
function calculateTotal() {
    return cart.reduce((total, entry) => total + entry.item.price, 0);
}*/

let cart = [];
function addItemToCart(cart,item) {

    const entry = {
        item:{...item},
        date:Date.now()
    };

    return [...cart, entry];
}
function applyDiscount(cart, discount) {
    /*cart.forEach(item => {
        item.item.price -= item.item.price * discount;
    });*/

    return cart.map(entry =>{
        const discountedPrice = entry.item.price - entry.item.price * discount;

        return {
            ...entry,
            item: {
                ...entry.item,
                price: discountedPrice
            }

        }
    })
}
function calculateTotal(cart) {
    return cart.reduce((total, entry) => total + entry.item.price, 0);
}

// Ejemplo de uso
const item1 = { name: "Camiseta", price: 20 };
const item2 = { name: "Pantalón", price: 30 };
addItemToCart(cart, item1);
addItemToCart(cart, item2);
applyDiscount(cart, 0.1); // Aplica un 10% de descuento
console.log(calculateTotal()); // Total del carrito
console.log(cart); // Estado del carrito
console.log(item1, item2); // Estado de los ítems originales
