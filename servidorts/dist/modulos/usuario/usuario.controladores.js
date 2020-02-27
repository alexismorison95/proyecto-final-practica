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
const db_conexion_1 = require("../bbdd/db.conexion");
const funciones_1 = require("../funciones/funciones");
// ALTA USUARIO
function AltaUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = db_conexion_1.ConexionBD(req.session.rol);
        try {
            // Transaccion
            yield db.query('BEGIN');
            const queryText = 'select * from alta_usuario($1, $2, $3, $4);';
            const parametros = [
                req.body.nombrereal,
                req.body.nombreusuario,
                req.body.contrasenia,
                req.body.tipousuario
            ];
            const respuesta = yield db.query(queryText, parametros);
            yield db.query('COMMIT');
            // Envio el resultado al cliente
            res.status(200).json(respuesta.rows[0]);
        }
        catch (e) {
            // Error de la transaccion
            yield db.query('ROLLBACK');
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.AltaUsuario = AltaUsuario;
// LISTAR USUARIOS
function ListarUsuarios(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = db_conexion_1.ConexionBD(req.session.rol);
            // Consulta
            const respuesta = yield db.query('select * from usuario;');
            // Envio respuesta al cliente
            res.status(200).json(respuesta.rows);
        }
        catch (e) {
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.ListarUsuarios = ListarUsuarios;
// LISTAR USUARIO
function ListarUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = db_conexion_1.ConexionBD(req.session.rol);
            const parametros = [req.params.id];
            const respuesta = yield db.query('select * from usuario where id = $1;', parametros);
            res.status(200).json(respuesta.rows[0]);
        }
        catch (e) {
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.ListarUsuario = ListarUsuario;
// ELIMINAR USUARIO
function BajaUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = db_conexion_1.ConexionBD(req.session.rol);
        try {
            // Transaccion
            yield db.query('BEGIN');
            const queryText = 'select * from baja_usuario($1)';
            const parametros = [req.body.id];
            const respuesta = yield db.query(queryText, parametros);
            yield db.query('COMMIT');
            // Envio el resultado al cliente
            res.status(200).json(respuesta.rows[0]);
        }
        catch (e) {
            // Error de la transaccion
            yield db.query('ROLLBACK');
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.BajaUsuario = BajaUsuario;
// MODIFICAR USUARIO
function ModificarUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = db_conexion_1.ConexionBD(req.session.rol);
        try {
            // Transaccion
            yield db.query('BEGIN');
            const queryText = 'select * from modificacion_usuario($1, $2, $3, $4, $5)';
            const parametros = [
                req.body.id,
                req.body.nombrereal,
                req.body.nombreusuario,
                req.body.contrasenia,
                req.body.tipousuario
            ];
            const respuesta = yield db.query(queryText, parametros);
            yield db.query('COMMIT');
            // Envio el resultado al cliente
            res.status(200).json(respuesta.rows[0]);
        }
        catch (e) {
            // Error de la transaccion
            yield db.query('ROLLBACK');
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.ModificarUsuario = ModificarUsuario;
