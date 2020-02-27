"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ARCHIVO PARA DEFINIR FUNCIONES REUTILIZABLES
/**
 * Funcion para mostrar un error por consola y enviarla al cliente.
 * Esta funcion se llama en la parte Catch de los Try Catch
 * @param e
 * @param res
 */
function NotificarError(e, res) {
    let error = e.message;
    console.log(error);
    // Envio el error al cliente
    res.status(500).json({ res: "Error interno del servidor." + error });
}
exports.NotificarError = NotificarError;
/**
 * Funcion para autenticar que un usuario tenga una sesion activa si quiere navegar
 * entre las rutas del servidor
 * @param req
 * @param res
 * @param next
 */
function Auth(req, res, next) {
    if (req.session.id_usuario) {
        return next();
    }
    else {
        return res.status(401).json({ res: "Debe iniciar sesion" });
    }
}
exports.Auth = Auth;
