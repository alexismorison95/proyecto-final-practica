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
// ALTA EQUIPO
function AltaEquipo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = db_conexion_1.ConexionBD(req.session.rol);
        try {
            // Transaccion
            yield db.query('BEGIN');
            const queryText = 'select * from alta_equipo($1, $2);';
            const parametros = [
                req.body.nombre,
                req.body.activo
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
exports.AltaEquipo = AltaEquipo;
// LISTAR EQUIPOS
function ListarEquipos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = db_conexion_1.ConexionBD(req.session.rol);
            // Consulta
            const respuesta = yield db.query('select * from equipo;');
            // Envio respuesta al cliente
            res.status(200).json(respuesta.rows);
        }
        catch (e) {
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.ListarEquipos = ListarEquipos;
// LISTAR EQUIPOS + PERIODOUTILIZABLE
function ListarEquiposPU(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = db_conexion_1.ConexionBD(req.session.rol);
            // Consulta
            const query = 'select * from equipo join (select activo as activopu, fechainicio, fechavencimiento, nroingreso, idequipo from periodoutilizable where activo=true) pu on equipo.id = pu.idequipo;';
            const respuesta = yield db.query(query);
            // Envio respuesta al cliente
            res.status(200).json(respuesta.rows);
        }
        catch (e) {
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.ListarEquiposPU = ListarEquiposPU;
// LISTAR EQUIPO
function ListarEquipo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = db_conexion_1.ConexionBD(req.session.rol);
            // Consulta
            const parametros = [req.params.id];
            const respuesta = yield db.query('select * from equipo where id = $1;', parametros);
            // Envio respuesta al cliente
            res.status(200).json(respuesta.rows[0]);
        }
        catch (e) {
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.ListarEquipo = ListarEquipo;
// BAJA EQUIPO
function BajaDominio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = db_conexion_1.ConexionBD(req.session.rol);
        try {
            // Transaccion
            yield db.query('BEGIN');
            const queryText = 'select * from baja_equipo($1)';
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
exports.BajaDominio = BajaDominio;
