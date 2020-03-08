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
// ALTA prestamo
function AltaPrestamo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = db_conexion_1.ConexionBD(req.session.rol);
        try {
            // Transaccion
            yield db.query('BEGIN');
            const queryText = 'select * from alta_prestamo($1, $2, $3, $4, $5);';
            const parametros = [
                req.body.fechaprestamo,
                req.body.horaprestamo,
                req.body.nroinicial,
                req.body.idexaminador,
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
exports.AltaPrestamo = AltaPrestamo;
// LISTAR prestamos
function ListarPrestamos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = db_conexion_1.ConexionBD(req.session.rol);
            // Consulta
            const respuesta = yield db.query('select * from prestamo;');
            // Envio respuesta al cliente
            res.status(200).json(respuesta.rows);
        }
        catch (e) {
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.ListarPrestamos = ListarPrestamos;
// LISTAR prestamo
function ListarPrestamo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = db_conexion_1.ConexionBD(req.session.rol);
            // Consulta
            const parametros = [req.params.id];
            const respuesta = yield db.query('select * from prestamo where id = $1;', parametros);
            // Envio respuesta al cliente
            res.status(200).json(respuesta.rows[0]);
        }
        catch (e) {
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.ListarPrestamo = ListarPrestamo;
// BAJA prestamo
function BajaPrestamo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = db_conexion_1.ConexionBD(req.session.rol);
        try {
            // Transaccion
            yield db.query('BEGIN');
            const queryText = 'select * from baja_prestamo($1, $2, $3, $4);';
            const parametros = [
                req.body.id,
                req.body.fechadevolucion,
                req.body.horadevolucion,
                req.body.nrodevolucion
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
exports.BajaPrestamo = BajaPrestamo;
