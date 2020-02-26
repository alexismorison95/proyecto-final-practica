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
const express_1 = require("express");
const db_conexion_1 = require("../bbdd/db.conexion");
// Nos conectamos con el usuario login_user de la BBDD para iniciar sesion
const db = db_conexion_1.ConexionBD('login_user');
const rutas = express_1.Router();
// DEFINICION DE RUTAS
// LOGIN
rutas.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Consulta
        const respuesta = yield db.query('select * from usuario where nombreusuario = $1 AND contrasenia = $2;', [req.body.nombre, req.body.contrasenia]);
        // Si trajo un usuario carga su id y rol en la sesion y envia al cliente el usuario
        if (respuesta.rows[0]) {
            // Guardo en la sesion los datos del usuario
            req.session.id_usuario = respuesta.rows[0].id;
            req.session.rol = respuesta.rows[0].tipousuario;
            console.log("Logueado en el sistema como", req.session.rol, "- id de usuario", req.session.id_usuario);
            // Envio al cliente los datos del usuario logueado
            res.status(200).json(respuesta.rows[0]);
        }
        else {
            // Envio al cliente que el usuario o contrasenia no correpsonden
            res.status(500).json({ res: "Usuario o contraseña no validos." });
        }
    }
    catch (e) {
        // Capturo el error al tratar de conectarse a la bbdd
        let error = e.message;
        console.log(error);
        // Envio el error al cliente
        res.status(500).json({
            res: "Error interno del servidor." + error
        });
    }
}));
exports.default = rutas;
