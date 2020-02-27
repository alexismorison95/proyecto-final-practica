import { Request, Response } from "express";
import { ConexionBD } from "../bbdd/db.conexion";
import { NotificarError } from "../funciones/funciones";

// ALTA prestamo
export async function AltaPrestamo(req: Request, res: Response) {

    const db = ConexionBD(req.session.rol);

    try {
        // Transaccion
        await db.query('BEGIN');

        const queryText = 'select * from alta_prestamo($1, $2, $3, $4, $5);';
        const parametros = [
            req.body.fechaprestamo, 
            req.body.horaprestamo,
            req.body.nroinicial, 
            req.body.idexaminador, 
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

// LISTAR prestamos
export async function ListarPrestamos(req: Request, res: Response) {

    try {
        const db = ConexionBD(req.session.rol);

        // Consulta
        const respuesta = await db.query('select * from prestamo;');

        // Envio respuesta al cliente
        res.status(200).json(respuesta.rows);
    } 
    catch (e) {
        NotificarError(e, res);
    }

}

// LISTAR prestamo
export async function ListarPrestamo(req: Request, res: Response) {

    try {
        const db = ConexionBD(req.session.rol);

        // Consulta
        const parametros = [req.params.id];
        const respuesta = await db.query('select * from prestamo where id = $1;', parametros);

        // Envio respuesta al cliente
        res.status(200).json(respuesta.rows[0]);
    } 
    catch (e) {
        NotificarError(e, res);
    }

}

// BAJA prestamo
export async function BajaPrestamo(req: Request, res: Response) {

    const db = ConexionBD(req.session.rol);

    try {
        // Transaccion
        await db.query('BEGIN');

        const queryText = 'select * from baja_prestamo($1, $2, $3, $4);';
        const parametros = [
            req.body.id,                           
            req.body.fechadevolucion, 
            req.body.horadevolucion, 
            req.body.nrodevolucion
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