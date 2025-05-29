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