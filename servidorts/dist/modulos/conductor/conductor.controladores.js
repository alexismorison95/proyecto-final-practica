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
// ALTA CONDUCTOR
function AltaConductor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = db_conexion_1.ConexionBD(req.session.rol);
        try {
            // Transaccion
            yield db.query('BEGIN');
            const queryText = 'select * from alta_conductor($1, $2, $3);';
            const parametros = [
                req.body.dni,
                req.body.nombre,
                req.body.apellido
            ];
            const respuesta = yield db.query(queryText, parametros);
            yield db.query('COMMIT');
            res.status(200).json(respuesta.rows[0]);
        }
        catch (e) {
            // Error de la transaccion
            yield db.query('ROLLBACK');
            let error = e.message;
            console.log(error);
            // Envio el error al cliente
            res.status(500).json({ res: "Error interno del servidor." + error });
        }
    });
}
exports.AltaConductor = AltaConductor;
// LISTAR CONDUCTORES
function ListarConductores(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = db_conexion_1.ConexionBD(req.session.rol);
            // Consulta
            const respuesta = yield db.query('select * from conductor;');
            // Envio respuesta al cliente
            res.status(200).json(respuesta.rows);
        }
        catch (e) {
            // Capturo el error al tratar de conectarse a la bbdd
            let error = e.message;
            console.log(error);
            // Envio el error al cliente
            res.status(500).json({ res: "Error interno del servidor." + error });
        }
    });
}
exports.ListarConductores = ListarConductores;
// LISTAR CONDUCTOR
function ListarConductor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = db_conexion_1.ConexionBD(req.session.rol);
        }
        catch (e) {
        }
    });
}
exports.ListarConductor = ListarConductor;
