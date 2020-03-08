"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const equipo_controladores_1 = require("./equipo.controladores");
const rutas = express_1.Router();
// DEFINICION DE RUTAS
// ALTA EQUIPO
rutas.post('/equipos/alta', equipo_controladores_1.AltaEquipo);
// LISTAR EQUIPOS
rutas.get('/equipos/listar', equipo_controladores_1.ListarEquipos);
// LISTAR EQUIPOS + PERIODOUTILIZABLE
rutas.get('/equipos/listarperiodo', equipo_controladores_1.ListarEquiposPU);
// LISTAR EQUIPO
rutas.get('/equipos/listar/:id', equipo_controladores_1.ListarEquipo);
// MODIFICAR EQUIPO
rutas.put('/equipos/baja/:id', equipo_controladores_1.BajaDominio);
exports.default = rutas;
