import { Pool } from "pg";
import { datosConexion } from "./db.datos";


/**
 * Funcion que retorna una conexion con postgreSQL por medio de un rol especificado
 * @param rol 
 */
export function ConexionBD(rol: string) {

    // Creo una conexion y la retorno
    // Creo un pool ya que en internet dice que permite mejor concurrencia en la bbdd
    // Y ademas tarda menos tiempo en conectarse
    const pool = new Pool({
        user: rol,
        host: datosConexion.host,
        database: datosConexion.database,
        password: datosConexion.password,
        port: datosConexion.port
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