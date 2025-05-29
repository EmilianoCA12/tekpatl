import sql from 'better-sqlite3';

const db = sql('tekpatl.db');

export function getAnillos() {
    const mostrar = db.prepare('SELECT * FROM Joyas WHERE categoria = 1').all();

    const stmt = db.prepare('SELECT * FROM DImagenes WHERE idJoya = ?');

    for(let i = 0; i < mostrar.length; i += 1){
        const indice = mostrar[i].id;
        const imagen = stmt.all(indice);
        mostrar[i].direccion = imagen[0].direccion;
    }
    
    return mostrar;
}

export function getCollares() {
    const mostrar = db.prepare('SELECT * FROM Joyas WHERE categoria = 2').all();

    const stmt = db.prepare('SELECT * FROM DImagenes WHERE idJoya = ?');

    for(let i = 0; i < mostrar.length; i += 1){
        const indice = mostrar[i].id;
        const imagen = stmt.all(indice);
        mostrar[i].direccion = imagen[0].direccion;
    }
    
    return mostrar;
}

export function getAretes() {
    const mostrar = db.prepare('SELECT * FROM Joyas WHERE categoria = 3').all();

    const stmt = db.prepare('SELECT * FROM DImagenes WHERE idJoya = ?');

    for(let i = 0; i < mostrar.length; i += 1){
        const indice = mostrar[i].id;
        const imagen = stmt.all(indice);
        mostrar[i].direccion = imagen[0].direccion;
    }
    
    return mostrar;
}

export function getDijes() {
    const mostrar = db.prepare('SELECT * FROM Joyas WHERE categoria = 4').all();

    const stmt = db.prepare('SELECT * FROM DImagenes WHERE idJoya = ?');

    for(let i = 0; i < mostrar.length; i += 1){
        const indice = mostrar[i].id;
        const imagen = stmt.all(indice);
        mostrar[i].direccion = imagen[0].direccion;
    }
    
    return mostrar;
}

export function getAnillo(slug) {
    return db.prepare('SELECT * FROM Joyas WHERE id = ?').get(slug);
}

export function getImagenesAnillos(slug) {
    return db.prepare('SELECT * FROM DImagenes WHERE idJoya = ?').all(slug);
}