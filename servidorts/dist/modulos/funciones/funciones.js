"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// ARCHIVO PARA DEFINIR FUNCIONES REUTILIZABLES
/**
 * Funcion para mostrar un error por consola y enviarla al cliente.
 * Esta funcion se llama en la parte Catch de los Try Catch.
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
 * entre las rutas del servidor.
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
/**
 * Funcion para realizar una transaccion a la base de datos PostgreSQL.
 * Retorna la respuesta a la consulta SQL.
 * @param db
 * @param queryText
 * @param parametros
 */
function Transaccion(db, queryText, parametros) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.query('BEGIN');
        const respuesta = yield db.query(queryText, parametros);
        yield db.query('COMMIT');
        return respuesta;
    });
}
exports.Transaccion = Transaccion;
