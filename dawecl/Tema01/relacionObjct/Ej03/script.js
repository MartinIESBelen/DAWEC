
const libros = [
    {
        titulo: "Cien años de soledad",
        genero: "Realismo mágico",
        autores: ["Gabriel García Márquez"],
        paginas: 471,
        fechaPublicacion: "1967-05-30"
    },
    {
        titulo: "El señor de los anillos",
        genero: "Fantasía épica",
        autores: ["J. R. R. Tolkien"],
        paginas: 1216,
        fechaPublicacion: "1954-07-29"
    },
    {
        titulo: "Neuromante",
        genero: "Ciencia ficción",
        autores: ["William Gibson"],
        paginas: 271,
        fechaPublicacion: "1984-07-01"
    },
    {
        titulo: "Los pilares de la Tierra",
        genero: "Histórica",
        autores: ["Ken Follett"],
        paginas: 1043,
        fechaPublicacion: "1989-09-01"
    },
    {
        titulo: "Good Omens",
        genero: "Comedia fantástica",
        autores: ["Neil Gaiman", "Terry Pratchett"],
        paginas: 412,
        fechaPublicacion: "1990-05-01"
    }
];

function mostrarInfo(personas){
    let contenedor = document.createElement("div");
    contenedor.className = "contenedor";

    contenedor.innerHTML= `
           
           <p>${Object.values(libros)[0]}</p>
           
          
`;

}

function filtro(){

}