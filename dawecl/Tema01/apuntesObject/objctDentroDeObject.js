// Lista de ejemplo
const productos = [
    {
        id: 1,
        name: "Laptop",
        price: 1200,
        tags: ["tech", "portable"],
        manufacturer: { name: "Dell", country: "USA" }
    },
    {
        id: 2,
        name: "Mouse",
        price: 20,
        tags: ["tech", "peripheral"],
        manufacturer: { name: "Logitech", country: "Switzerland" }
    },
    {
        id: 3,
        name: "Café",
        price: 5,
        tags: ["food", "beverage"],
        manufacturer: { name: "Starbucks", country: "USA" }
    },
];
function addItem(list, newItem) {
    // Retorna una nueva lista con el nuevo objeto
    return [...list, { ...newItem }];
}

// Ejemplo:
const productos2 = addItem(productos, {
    id: 4,
    name: "PS5",
    price: 600,
    tags: ["tech", "console"],
    manufacturer: { name: "Sony", country: "Japan" }
});

function removeItemById(list, id) {
    return list.filter(item => item.id !== id);
}

// Ejemplo:
const productosSinMouse = removeItemById(productos2, 2);

function filterByField(list, field, value) {
    return list.filter(item => {
        const fieldValue = item[field];
        if (Array.isArray(fieldValue)) {
            return fieldValue.includes(value);
        }
        if (typeof fieldValue === "object") {
            return Object.values(fieldValue).includes(value);
        }
        return fieldValue === value;
    });
}

// Ejemplo: filtrar por tag "tech"
const techProducts = filterByField(productos2, "tags", "tech");

// Ejemplo: filtrar por manufacturer country
const usaProducts = filterByField(productos2, "manufacturer", "USA");

function sortByField(list, field, ascending = true) {
    const copy = [...list];
    return copy.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        if (typeof aValue === "string") return ascending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        return ascending ? aValue - bValue : bValue - aValue;
    });
}

// Ejemplo: ordenar por price ascendente
const sortedByPrice = sortByField(productos2, "price");

// Ejemplo: ordenar por name descendente
const sortedByNameDesc = sortByField(productos2, "name", false);

function updateItemById(list, id, updatedFields) {
    return list.map(item => item.id === id ? { ...item, ...updatedFields } : item);
}

// Ejemplo: actualizar precio de la Laptop
const updatedList = updateItemById(productos2, 1, { price: 1100 });
