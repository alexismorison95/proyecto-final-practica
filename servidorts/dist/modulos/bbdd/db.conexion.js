"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const db_datos_1 = require("./db.datos");
/**
 * Funcion que crea una conexion con postgreSQL por medio de un rol especificado.
 * Retorna un pool para poder realizar consultas a la base de datos.
 * @param rol
 */
function ConexionBD(rol) {
    // Creo una conexion y la retorno
    const pool = new pg_1.Pool({
        user: rol,
        host: db_datos_1.datosConexion.host,
        database: db_datos_1.datosConexion.database,
        password: db_datos_1.datosConexion.password,
        port: db_datos_1.datosConexion.port
    });
    // Si se conecto correctamente
    pool.on('connect', () => {
        console.log("Conectado a PostgreSQL como", rol);
    });
    // Si hubo un error
    pool.on('error', err => {
        console.log(err);
        process.exit(0);
    });
    return pool;
}
exports.ConexionBD = ConexionBD;
