"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logout_controladores_1 = require("./logout.controladores");
const rutas = express_1.Router();
// DEFINICION DE RUTAS
// LOGOUT
rutas.get('/logout', logout_controladores_1.LogOut);
exports.default = rutas;
