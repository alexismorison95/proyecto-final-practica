import { Request, Response, NextFunction } from "express";
import { Pool } from "pg";

// ARCHIVO PARA DEFINIR FUNCIONES REUTILIZABLES


/**
 * Funcion para mostrar un error por consola y enviarla al cliente.
 * Esta funcion se llama en la parte Catch de los Try Catch.
 * @param e 
 * @param res 
 */
export function NotificarError(e: any, res: Response): void {

    let error = (e as Error).message;
    console.log(error);
    
    // Envio el error al cliente
    res.status(500).json({res: "Error interno del servidor." + error});

}


/**
 * Funcion para autenticar que un usuario tenga una sesion activa si quiere navegar 
 * entre las rutas del servidor.
 * @param req 
 * @param res 
 * @param next 
 */
export function Auth(req: Request, res: Response, next: NextFunction) {
    
    if (req.session.id_usuario) {
        return next();
    }
    else {
        return res.status(401).json({res: "Debe iniciar sesion"});
    }

}


/**
 * Funcion para realizar una transaccion a la base de datos PostgreSQL.
 * Retorna la respuesta a la consulta SQL.
 * @param db 
 * @param queryText 
 * @param parametros 
 */
export async function Transaccion(db: Pool, queryText: string, parametros: any) {

    await db.query('BEGIN');
    const respuesta = await db.query(queryText, parametros);
    await db.query('COMMIT');

    return respuesta;

}