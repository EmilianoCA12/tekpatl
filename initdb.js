const sql = require('better-sqlite3');
const db = sql('tekpatl.db');

const Joyas = [
    { nombre: '44', costo: 5000, incremento: 100, categoria: 1, descripcion: "El anillo de pimp más cañón que vas a ver.", brillante: 1, multiTallas: 1 },
    { nombre: 'Flor Quinta', costo: 1000, incremento: 50, categoria: 1, descripcion: "Ten el poder de las 5 flores más bellas del lugar.", brillante: 1, multiTallas: 1 },
    { nombre: 'Arce', costo: 2000, incremento: 100, categoria: 1, descripcion: "El anillo con los cuernos más sabroso.", brillante: 0, multiTallas: 1 },
    { nombre: 'Nudo de bruja', costo: 950, incremento: 25, categoria: 1, descripcion: "El nudo más duro de los chavos.", brillante: 0, multiTallas: 1 },
    { nombre: 'Moebius', costo: 1000, incremento: 50, categoria: 1, descripcion: "Ten uno de los mejores objetos topológicos en tu mano.", brillante: 1, multiTallas: 1 }
];

const DImagenes = [
    { idJoya: 1, direccion: "/joyas/a1.jpg" },
    { idJoya: 2, direccion: "/joyas/a2.jpeg" },
    { idJoya: 3, direccion: "/joyas/a3.jpeg" },
    { idJoya: 4, direccion: "/joyas/a4.jpeg" },
    { idJoya: 5, direccion: "/joyas/a5.jpeg" },
    { idJoya: 1, direccion: "/joyas/a1_1.jpeg" }
];

const Administradores = [
    { nombre: "Hectorinchis", correo: "hectorin@tekpatl.com", contrasenia: "12345" },
    { nombre: "Elimiano", correo: "e@tekpatl.com", contrasenia: "12345" },
    { nombre: "Ernst", correo: "erns@tekpatl.com", contrasenia: "12345" }
];

// Crear tablas
db.prepare(`
    CREATE TABLE IF NOT EXISTS Joyas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        costo FLOAT NOT NULL,
        incremento FLOAT NOT NULL,
        categoria INT NOT NULL,
        descripcion TEXT NOT NULL,
        brillante INT NOT NULL,
        multiTallas INT NOT NULL
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS DImagenes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        idJoya INTEGER NOT NULL,
        direccion TEXT UNIQUE NOT NULL,
        FOREIGN KEY (idJoya) REFERENCES Joyas(id)
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS Cliente (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        correo TEXT NOT NULL,
        contrasenia TEXT,
        numeroTelefono INT NOT NULL,
        invitado INT NOT NULL
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS Pedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        idCliente INTEGER,
        estatus INTEGER NOT NULL,
        total FLOAT NOT NULL,
        codigo TEXT NOT NULL,
        FOREIGN KEY (idCliente) REFERENCES Cliente(id)
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS DetallePedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        idJoya INTEGER NOT NULL,
        idPedido INTEGER NOT NULL,
        talla INTEGER NOT NULL,
        color INTEGER NOT NULL,
        cantidad INTEGER NOT NULL,
        subTotal FLOAT NOT NULL,
        FOREIGN KEY (idPedido) REFERENCES Pedido(id),
        FOREIGN KEY (idJoya) REFERENCES Joyas(id)
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS Administrador (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        correo TEXT NOT NULL,
        contrasenia TEXT NOT NULL
    )
`).run();

async function initData() {
    const stmtJoyas = db.prepare(`
        INSERT INTO Joyas VALUES (
            null, @nombre, @costo, @incremento, @categoria, @descripcion, @brillante, @multiTallas
        )
    `);
    Joyas.forEach(joya => stmtJoyas.run(joya));

    const stmtImgs = db.prepare(`
        INSERT INTO DImagenes VALUES (null, @idJoya, @direccion)
    `);
    DImagenes.forEach(img => stmtImgs.run(img));

    const stmtAdmins = db.prepare(`
        INSERT INTO Administrador VALUES (null, @nombre, @correo, @contrasenia)
    `);
    Administradores.forEach(admin => stmtAdmins.run(admin));
}

initData();