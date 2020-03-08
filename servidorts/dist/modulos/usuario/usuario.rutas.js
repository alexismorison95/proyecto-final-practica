"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controladores_1 = require("./usuario.controladores");
const rutas = express_1.Router();
// DEFINICION DE RUTAS
// ALTA USUARIO
rutas.post('/usuarios/alta', usuario_controladores_1.AltaUsuario);
// LISTAR USUARIOS
rutas.get('/usuarios/listar', usuario_controladores_1.ListarUsuarios);
// LISTAR USUARIO
rutas.get('/usuarios/listar/:id', usuario_controladores_1.ListarUsuario);
// ELIMINAR USUARIO
rutas.delete('/usuarios/baja/:id', usuario_controladores_1.BajaUsuario);
// MODIFICAR USUARIO
rutas.put('/usuarios/modificar', usuario_controladores_1.ModificarUsuario);
exports.default = rutas;
