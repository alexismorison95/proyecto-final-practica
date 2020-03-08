"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const periodoutilizable_controladores_1 = require("./periodoutilizable.controladores");
const rutas = express_1.Router();
// DEFINICION DE RUTAS
// ALTA periodoutilizable
rutas.post('/periodosutilizables/alta', periodoutilizable_controladores_1.AltaPeriodoUtilizable);
// LISTAR periodoutilizables
rutas.get('/periodosutilizables/listar', periodoutilizable_controladores_1.ListarPeriodosUtilizables);
// LISTAR periodoutilizable
rutas.get('/periodosutilizables/listar/:id', periodoutilizable_controladores_1.ListarPeriodoUtilizable);
// MODIFICAR periodoutilizable
rutas.put('/periodosutilizables/baja/:id', periodoutilizable_controladores_1.BajaPeriodoUtilizable);
exports.default = rutas;
