import { Pool } from "pg";
import { datosConexion } from "./db.datos";


/**
 * Funcion que crea una conexion con postgreSQL por medio de un rol especificado.
 * Retorna un pool para poder realizar consultas a la base de datos.
 * @param rol 
 */
export function ConexionBD(rol: string): Pool {

    // Creo una conexion y la retorno
    const pool = new Pool({
        user: rol,
        host: datosConexion.host,
        database: datosConexion.database,
        password: datosConexion.password,
        port: datosConexion.port
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