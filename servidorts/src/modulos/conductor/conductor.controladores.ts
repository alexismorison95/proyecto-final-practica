import { Request, Response } from "express";
import { ConexionBD } from "../bbdd/db.conexion";


// ALTA CONDUCTOR
export async function AltaConductor(req: Request, res: Response) {

    const db = ConexionBD(req.session.rol);

    try {
        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from alta_conductor($1, $2, $3);';
        const parametros = [
            req.body.dni, 
            req.body.nombre, 
            req.body.apellido
        ];
        const respuesta = await db.query(queryText, parametros);
        await db.query('COMMIT');

        // Envio el resultado al cliente
        res.status(200).json(respuesta.rows[0]);

    } 
    catch (e) {
        // Error de la transaccion
        await db.query('ROLLBACK');

        let error = (e as Error).message;
        console.log(error);

        // Envio el error al cliente
        res.status(500).json({res: "Error interno del servidor." + error});
    }

}


// LISTAR CONDUCTORES
export async function ListarConductores(req: Request, res: Response) {

    try {
        const db = ConexionBD(req.session.rol);

        // Consulta
        const respuesta = await db.query('select * from conductor;');

        // Envio respuesta al cliente
        res.status(200).json(respuesta.rows);
    } 
    catch (e) {
        // Capturo el error al tratar de conectarse a la bbdd
        let error = (e as Error).message;
        console.log(error);
        
        // Envio el error al cliente
        res.status(500).json({res: "Error interno del servidor." + error});
    }

}


// LISTAR CONDUCTOR
export async function ListarConductor(req: Request, res: Response) {

    try {
        const db = ConexionBD(req.session.rol);

        const parametros = [req.params.dni];
        const respuesta = await db.query('select * from conductor where dni = $1;', parametros);

        res.status(200).json(respuesta.rows[0]);
    } 
    catch (e) {
        // Capturo el error al tratar de conectarse a la bbdd
        let error = (e as Error).message;
        console.log(error);
        
        // Envio el error al cliente
        res.status(500).json({res: "Error interno del servidor." + error});
    }

}
