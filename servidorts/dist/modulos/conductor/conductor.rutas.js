"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conductor_controladores_1 = require("./conductor.controladores");
const rutas = express_1.Router();
// DEFINICION DE RUTAS
// ALTA CONDUCTOR
rutas.post('/conductores/alta', conductor_controladores_1.AltaConductor);
// LISTAR CONDUCTORES
rutas.get('/conductores/listar', conductor_controladores_1.ListarConductores);
// LISTAR CONDUCTOR
rutas.get('/conductores/listar/:dni', conductor_controladores_1.ListarConductor);
// MODIFICAR CONDUCTOR (NO IMPLEMENTADO EN BBDD)
//rutas.post('/conductores/modificar/:dni', ModificarConductor);
exports.default = rutas;
