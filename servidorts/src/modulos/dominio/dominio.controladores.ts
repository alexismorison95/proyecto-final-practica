import { Request, Response } from "express";
import { ConexionBD } from "../bbdd/db.conexion";
import { NotificarError } from "../funciones/funciones";

// ALTA DOMINIO
export async function AltaDominio(req: Request, res: Response) {

    const db = ConexionBD(req.session.rol);

    try {
        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from alta_dominio($1, $2);';
        const parametros = [
            req.body.id, 
            req.body.descripcion
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

// LISTAR DOMINIOS
export async function ListarDominios(req: Request, res: Response) {

    try {
        const db = ConexionBD(req.session.rol);

        // Consulta
        const respuesta = await db.query('select * from dominio;');

        // Envio respuesta al cliente
        res.status(200).json(respuesta.rows);
    } 
    catch (e) {
        NotificarError(e, res);
    }

}

// LISTAR DOMINIO
export async function ListarDominio(req: Request, res: Response) {

    try {
        const db = ConexionBD(req.session.rol);

        // Consulta
        const parametros = [req.params.id];
        const respuesta = await db.query('select * from dominio where id = $1;', parametros);

        // Envio respuesta al cliente
        res.status(200).json(respuesta.rows[0]);
    } 
    catch (e) {
        NotificarError(e, res);
    }

}

// MODIFICAR DOMINIO
export async function ModificarDominio(req: Request, res: Response) {

    const db = ConexionBD(req.session.rol);

    try {
        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from modificacion_dominio($1, $2)';
        const parametros = [
            req.body.id, 
            req.body.descripcion
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