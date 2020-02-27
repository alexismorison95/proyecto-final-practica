"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controladores_1 = require("./login.controladores");
const rutas = express_1.Router();
// DEFINICION DE RUTAS
// LOGIN
rutas.post('/login', login_controladores_1.LogIn);
// RECARGA DE PAGINA F5
rutas.get('/f5', login_controladores_1.F5);
exports.default = rutas;
