import { Request, Response } from "express";
import { ConexionBD } from "../bbdd/db.conexion";
import { NotificarError } from "../funciones/funciones";


// ALTA USUARIO
export async function AltaUsuario(req: Request, res: Response) {

    const db = ConexionBD(req.session.rol);

    try {
        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from alta_usuario($1, $2, $3, $4);';
        const parametros = [
            req.body.nombrereal, 
            req.body.nombreusuario, 
            req.body.contrasenia, 
            req.body.tipousuario
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

// LISTAR USUARIOS
export async function ListarUsuarios(req: Request, res: Response) {

    try {
        const db = ConexionBD(req.session.rol);

        // Consulta
        const respuesta = await db.query('select * from usuario;');

        // Envio respuesta al cliente
        res.status(200).json(respuesta.rows);
    } 
    catch (e) {
        NotificarError(e, res);
    }

}

// LISTAR USUARIO
export async function ListarUsuario(req: Request, res: Response) {

    try {
        const db = ConexionBD(req.session.rol);

        const parametros = [req.params.id];
        const respuesta = await db.query('select * from usuario where id = $1;', parametros);

        res.status(200).json(respuesta.rows[0]);
    } 
    catch (e) {
        NotificarError(e, res);
    }

}

// ELIMINAR USUARIO
export async function BajaUsuario(req: Request, res: Response) {

    const db = ConexionBD(req.session.rol);

    try {
        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from baja_usuario($1)';
        const parametros = [req.body.id];
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

// MODIFICAR USUARIO
export async function ModificarUsuario(req: Request, res: Response) {

    const db = ConexionBD(req.session.rol);

    try {
        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from modificacion_usuario($1, $2, $3, $4, $5)';
        const parametros = [
            req.body.id, 
            req.body.nombrereal, 
            req.body.nombreusuario, 
            req.body.contrasenia, 
            req.body.tipousuario
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