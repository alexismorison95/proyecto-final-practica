import { Request, Response } from "express";
import { ConexionBD } from "../bbdd/db.conexion";
import { NotificarError, Transaccion } from "../funciones/funciones";

// ALTA prueba
export async function AltaPrueba(req: Request, res: Response) {

    const db = ConexionBD(req.session.rol);

    try {
        // Transaccion
        await db.query('BEGIN');

        const queryText = 'select * from alta_prueba($1, $2, $3, $4, $5, $6, $7, $8, $9);';
        const parametros = [
            req.body.fecha, 
            req.body.hora, 
            req.body.nromuestra, 
            req.body.resultado, 
            req.body.nroacta, 
            req.body.nroretencion, 
            req.body.dniconductor, 
            req.body.iddominio, 
            req.body.idprestamo
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

// LISTAR pruebas
export async function ListarPruebas(req: Request, res: Response) {

    try {
        const db = ConexionBD(req.session.rol);

        // Consulta
        const respuesta = await db.query('select * from prueba;');

        // Envio respuesta al cliente
        res.status(200).json(respuesta.rows);
    } 
    catch (e) {
        NotificarError(e, res);
    }

}

// LISTAR prueba
export async function ListarPrueba(req: Request, res: Response) {

    try {
        const db = ConexionBD(req.session.rol);

        // Consulta
        const parametros = [req.params.id];
        const respuesta = await db.query('select * from prueba where id = $1;', parametros);

        // Envio respuesta al cliente
        res.status(200).json(respuesta.rows[0]);
    } 
    catch (e) {
        NotificarError(e, res);
    }

}

// LISTAR PRUEBAS NO VERIFICADAS
export async function ListarPruebasNoVerificadas(req: Request, res: Response) {

    try {
        const db = ConexionBD(req.session.rol);

        // Consulta
        const respuesta = await db.query('select * from prueba where verificado=false;');

        // Envio respuesta al cliente
        res.status(200).json(respuesta.rows);
    } 
    catch (e) {
        NotificarError(e, res);
    }

}

// MODIFICAR prueba
export async function ModificarPrueba(req: Request, res: Response) {

    const db = ConexionBD(req.session.rol);

    try {
        // Transaccion
        await db.query('BEGIN');

        const queryText = 'select * from modificacion_prueba($1, $2, $3)';
        const parametros = [
            req.body.id, 
            req.body.rechazado, 
            req.body.descripcionrechazo
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