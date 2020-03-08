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
// LOGIN
function LogIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = db_conexion_1.ConexionBD('login_user');
            // Consulta
            const parametros = [
                req.body.nombre,
                req.body.contrasenia
            ];
            const respuesta = yield db.query('select * from usuario where nombreusuario = $1 AND contrasenia = $2;', parametros);
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
                res.status(404).json({ res: "Usuario o contraseña no validos." });
            }
        }
        catch (e) {
            funciones_1.NotificarError(e, res);
        }
    });
}
exports.LogIn = LogIn;
// F5
// Como hay que tener seguridad, si la persona hace f5 de la pagina, debera volver a iniciar sesion
// Esta funcion se encarga de verificar si hay una sesion creada
function F5(req, res) {
    if (req.session.id_usuario) {
        res.status(200).json({ res: 'Debe volver a iniciar sesion.' });
    }
    else {
        res.status(500).json({ res: 'Sesion no iniciada.' });
    }
}
exports.F5 = F5;
