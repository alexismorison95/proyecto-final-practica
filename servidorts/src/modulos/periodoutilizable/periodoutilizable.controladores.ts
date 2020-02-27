import { Request, Response } from "express";
import { ConexionBD } from "../bbdd/db.conexion";
import { NotificarError, Transaccion } from "../funciones/funciones";

// ALTA periodoutilizable
export async function AltaPeriodoUtilizable(req: Request, res: Response) {

    const db = ConexionBD(req.session.rol);

    try {
        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from alta_periodoutilizable($1, $2, $3, $4);';
        const parametros = [
            req.body.fechainicio, 
            req.body.fechavencimiento,
            req.body.nroingreso, 
            req.body.idequipo
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

// LISTAR periodoutilizable
export async function ListarPeriodosUtilizables(req: Request, res: Response) {

    try {
        const db = ConexionBD(req.session.rol);

        // Consulta
        const respuesta = await db.query('select * from periodoutilizable;');

        // Envio respuesta al cliente
        res.status(200).json(respuesta.rows);
    } 
    catch (e) {
        NotificarError(e, res);
    }

}

// LISTAR periodoutilizable
export async function ListarPeriodoUtilizable(req: Request, res: Response) {

    try {
        const db = ConexionBD(req.session.rol);

        // Consulta
        const parametros = [req.params.id];
        const respuesta = await db.query('select * from periodoutilizable where id = $1;', parametros);

        // Envio respuesta al cliente
        res.status(200).json(respuesta.rows[0]);
    } 
    catch (e) {
        NotificarError(e, res);
    }

}

// BAJA periodoutilizable
export async function BajaPeriodoUtilizable(req: Request, res: Response) {

    const db = ConexionBD(req.session.rol);

    try {
        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from baja_periodoutilizable($1)';
        const parametros = [
            req.body.id
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