const sql = require('better-sqlite3');
const db = sql('tekpatl.db');

// Mostrar Joyas
let filas = db.prepare('SELECT * FROM Joyas').all();
console.log("📿 Joyas registradas:");
filas.forEach((joya) => {
  console.log(`ID: ${joya.id}, Nombre: ${joya.nombre}, Costo: ${joya.costo}, Incremento: ${joya.incremento}, Categoria: ${joya.categoria}, Descripción: ${joya.descripcion}`);
});

// Mostrar Imágenes
filas = db.prepare('SELECT * FROM DImagenes').all();
console.log("\n🖼️ Imágenes registradas:");
filas.forEach((imagen) => {
  console.log(`ID: ${imagen.id}, idJoya: ${imagen.idJoya}, Dirección: ${imagen.direccion}`);
});

// Mostrar Administradores
filas = db.prepare('SELECT * FROM Administrador').all();
console.log("\n👨‍💼 Administradores registrados:");
filas.forEach((admin) => {
  console.log(`ID: ${admin.id}, Nombre: ${admin.nombre}, Correo: ${admin.correo}, Contraseña: ${admin.contrasenia}`);
});

// Mostrar Clientes
filas = db.prepare('SELECT * FROM Cliente').all();
console.log("\n🙋 Clientes registrados:");
filas.forEach((cliente) => {
  console.log(`ID: ${cliente.id}, Nombre: ${cliente.nombre}, Correo: ${cliente.correo}, Teléfono: ${cliente.numeroTelefono}, Invitado: ${cliente.invitado}`);
});

// Mostrar Pedidos
filas = db.prepare('SELECT * FROM Pedido').all();
console.log("\n📦 Pedidos registrados:");
filas.forEach((pedido) => {
  console.log(`ID: ${pedido.id}, ID Cliente: ${pedido.idCliente}, Total: ${pedido.total}, Estatus: ${pedido.estatus}, Código: ${pedido.codigo}`);
});

// Mostrar DetallePedido
filas = db.prepare('SELECT * FROM DetallePedido').all();
console.log("\n🧾 Detalles de pedidos:");
filas.forEach((detalle) => {
  console.log(`ID: ${detalle.id}, ID Joya: ${detalle.idJoya}, ID Pedido: ${detalle.idPedido}, Talla: ${detalle.talla}, Color: ${detalle.color}, Cantidad: ${detalle.cantidad}, Subtotal: ${detalle.subTotal}`);
});