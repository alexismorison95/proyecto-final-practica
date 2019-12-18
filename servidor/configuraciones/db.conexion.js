// import { Pool } from 'pg';
const Pool = require('pg').Pool;

// Conexion con la BBDD con los datos de db.datos.js, donde es necesario el rol del usuario
const conexion = (rol) => {

    const datos = require('./db.datos');

    const pool = new Pool({
        user: rol,
        host: datos.host,
        password: datos.password,
        database: datos.database,
        port: datos.port
    });

    return pool;

}

module.exports = conexion;