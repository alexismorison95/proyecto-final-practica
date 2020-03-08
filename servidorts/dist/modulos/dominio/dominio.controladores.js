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
// ALTA DOMINIO
function AltaDominio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = db_conexion_1.ConexionBD(req.session.rol);
        try {
            // Transaccion
            const queryText = 'select * from alta_dominio($1, $2);';
            const parametros = [
                req.body.id,
                req.body.descripcion
            ];
            const respuesta = yield funciones_1.Transaccion(db, queryText, parametros);
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
exports.AltaDominio = AltaDominio;
// LISTAR DOMINIOS
function ListarDominios(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = db_conexion_1.ConexionBD(req.session.rol);
            // Consulta
            const respuesta = yield db.query('select * from dominio;');
            // Envio respuesta al cliente
            res.status(200).json(respuesta.rows);
        }
        catch (e) {
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.ListarDominios = ListarDominios;
// LISTAR DOMINIO
function ListarDominio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = db_conexion_1.ConexionBD(req.session.rol);
            // Consulta
            const parametros = [req.params.id];
            const respuesta = yield db.query('select * from dominio where id = $1;', parametros);
            // Envio respuesta al cliente
            res.status(200).json(respuesta.rows[0]);
        }
        catch (e) {
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.ListarDominio = ListarDominio;
// MODIFICAR DOMINIO
function ModificarDominio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = db_conexion_1.ConexionBD(req.session.rol);
        try {
            // Transaccion
            yield db.query('BEGIN');
            const queryText = 'select * from modificacion_dominio($1, $2)';
            const parametros = [
                req.body.id,
                req.body.descripcion
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
exports.ModificarDominio = ModificarDominio;
