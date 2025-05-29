const sql = require('better-sqlite3');
const db = sql('tekpatl.db');

let filas = db.prepare('SELECT * FROM Joyas').all();

console.log("Joyas registradas:");
filas.forEach((joya) => {
    console.log(`ID: ${joya.id}, Nombre: ${joya.nombre}, Costo: ${joya.costo}, Incremento: ${joya.incremento}, Categoria: ${joya.categoria}, Descripción: ${joya.descripcion}`);
});

filas = db.prepare('SELECT * FROM DImagenes').all();

console.log("Imagenes registradas:");
filas.forEach((imagen) => {
    console.log(`ID: ${imagen.id}, idJoya: ${imagen.idJoya}, direccion: ${imagen.direccion}`);
});