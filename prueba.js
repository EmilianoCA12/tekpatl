const sql = require('better-sqlite3');
const db = sql('tekpatl.db');

// JOYAS
let filas = db.prepare('SELECT * FROM Joyas').all();
console.log("Joyas registradas:");
filas.forEach((joya) => {
    console.log(`ID: ${joya.id}, Nombre: ${joya.nombre}, Costo: ${joya.costo}, Incremento: ${joya.incremento}, Categoria: ${joya.categoria}, Descripción: ${joya.descripcion}`);
});

// IMÁGENES
filas = db.prepare('SELECT * FROM DImagenes').all();
console.log("\nImágenes registradas:");
filas.forEach((imagen) => {
    console.log(`ID: ${imagen.id}, idJoya: ${imagen.idJoya}, dirección: ${imagen.direccion}`);
});

// CLIENTES
filas = db.prepare('SELECT * FROM Cliente').all();
console.log("\nClientes registrados:");
filas.forEach((cliente) => {
    console.log(`ID: ${cliente.id}, Nombre: ${cliente.nombre}, Correo: ${cliente.correo}, Tel: ${cliente.numeroTelefono}, Invitado: ${cliente.invitado}`);
});

// PEDIDOS
filas = db.prepare('SELECT * FROM Pedido').all();
console.log("\nPedidos registrados:");
filas.forEach((pedido) => {
    console.log(`ID: ${pedido.id}, ClienteID: ${pedido.idCliente}, Estatus: ${pedido.estatus}, Total: $${pedido.total}`);
});

// DETALLE PEDIDO
filas = db.prepare('SELECT * FROM DetallePedido').all();
console.log("\nDetalles de pedidos registrados:");
filas.forEach((detalle) => {
    console.log(`ID: ${detalle.id}, PedidoID: ${detalle.idPedido}, Talla: ${detalle.talla}, Color: ${detalle.color}, Cantidad: ${detalle.cantidad}, Subtotal: $${detalle.subTotal}`);
});

// Función para mostrar estructura de una tabla
function mostrarEstructura(tabla) {
    console.log(`\n📦 Estructura de la tabla '${tabla}':`);
    const columnas = db.prepare(`PRAGMA table_info(${tabla})`).all();
    columnas.forEach(col => {
        console.log(`- ${col.name} (${col.type})${col.pk ? " [PK]" : ""}${col.notnull ? " [NOT NULL]" : ""}`);
    });
}

// Función para mostrar filas de una tabla
function mostrarFilas(tabla) {
    const filas = db.prepare(`SELECT * FROM ${tabla}`).all();
    console.log(`\n📋 Registros en '${tabla}':`);
    if (filas.length === 0) {
        console.log("   (sin registros)");
    } else {
        filas.forEach(fila => console.log(fila));
    }
}

// Tablas a revisar
const tablas = ['Joyas', 'DImagenes', 'Cliente', 'Pedido', 'DetallePedido'];

for (const tabla of tablas) {
    mostrarEstructura(tabla);
    mostrarFilas(tabla);
}