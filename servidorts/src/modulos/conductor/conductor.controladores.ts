import { Request, Response } from "express";
import { ConexionBD } from "../bbdd/db.conexion";
import { NotificarError } from "../funciones/funciones";


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

        NotificarError(e, res);
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
        NotificarError(e, res);
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
        NotificarError(e, res);
    }

}

// MODIFICAR CONDUCTOR
export async function ModificarConductor(req: Request, res: Response) {

    const db = ConexionBD(req.session.rol);

    try {
        
    } 
    catch (e) {
        
    }

}
