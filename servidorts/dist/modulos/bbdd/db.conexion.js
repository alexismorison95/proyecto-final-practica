"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const db_datos_1 = require("./db.datos");
/**
 * Funcion que retorna una conexion con postgreSQL por medio de un rol especificado
 * @param rol
 */
function ConexionBD(rol) {
    // Creo una conexion y la retorno
    // Creo un pool ya que en internet dice que permite mejor concurrencia en la bbdd
    // Y ademas tarda menos tiempo en conectarse
    const pool = new pg_1.Pool({
        user: rol,
        host: db_datos_1.datosConexion.host,
        database: db_datos_1.datosConexion.database,
        password: db_datos_1.datosConexion.password,
        port: db_datos_1.datosConexion.port
    });
    pool.on('connect', () => {
        console.log("Conectado a PostgreSQL como", rol);
    });
    pool.on('error', err => {
        console.log(err);
        process.exit(0);
    });
    return pool;
}
exports.ConexionBD = ConexionBD;
