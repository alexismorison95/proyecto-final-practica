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
// ALTA periodoutilizable
function AltaPeriodoUtilizable(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = db_conexion_1.ConexionBD(req.session.rol);
        try {
            // Transaccion
            yield db.query('BEGIN');
            const queryText = 'select * from alta_periodoutilizable($1, $2, $3, $4);';
            const parametros = [
                req.body.fechainicio,
                req.body.fechavencimiento,
                req.body.nroingreso,
                req.body.idequipo
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
exports.AltaPeriodoUtilizable = AltaPeriodoUtilizable;
// LISTAR periodoutilizable
function ListarPeriodosUtilizables(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = db_conexion_1.ConexionBD(req.session.rol);
            // Consulta
            const respuesta = yield db.query('select * from periodoutilizable;');
            // Envio respuesta al cliente
            res.status(200).json(respuesta.rows);
        }
        catch (e) {
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.ListarPeriodosUtilizables = ListarPeriodosUtilizables;
// LISTAR periodoutilizable
function ListarPeriodoUtilizable(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = db_conexion_1.ConexionBD(req.session.rol);
            // Consulta
            const parametros = [req.params.id];
            const respuesta = yield db.query('select * from periodoutilizable where id = $1;', parametros);
            // Envio respuesta al cliente
            res.status(200).json(respuesta.rows[0]);
        }
        catch (e) {
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.ListarPeriodoUtilizable = ListarPeriodoUtilizable;
// BAJA periodoutilizable
function BajaPeriodoUtilizable(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = db_conexion_1.ConexionBD(req.session.rol);
        try {
            // Transaccion
            yield db.query('BEGIN');
            const queryText = 'select * from baja_periodoutilizable($1)';
            const parametros = [
                req.params.id
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
exports.BajaPeriodoUtilizable = BajaPeriodoUtilizable;
