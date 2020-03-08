"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prestamo_controladores_1 = require("./prestamo.controladores");
const rutas = express_1.Router();
// DEFINICION DE RUTAS
// ALTA prestamo
rutas.post('/prestamos/alta', prestamo_controladores_1.AltaPrestamo);
// LISTAR prestamos
rutas.get('/prestamos/listar', prestamo_controladores_1.ListarPrestamos);
// LISTAR prestamo
rutas.get('/prestamos/listar/:id', prestamo_controladores_1.ListarPrestamo);
// MODIFICAR prestamo
rutas.put('/prestamos/baja', prestamo_controladores_1.BajaPrestamo);
exports.default = rutas;
