"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prueba_controladores_1 = require("./prueba.controladores");
const rutas = express_1.Router();
// DEFINICION DE RUTAS
// ALTA prueba
rutas.post('/pruebas/alta', prueba_controladores_1.AltaPrueba);
// LISTAR pruebas
rutas.get('/pruebas/listar', prueba_controladores_1.ListarPruebas);
// LISTAR PRUEBAS NO VERIFICADAS
rutas.get('/pruebas/listar/noverificadas', prueba_controladores_1.ListarPruebasNoVerificadas);
// LISTAR prueba
rutas.get('/pruebas/listar/:id', prueba_controladores_1.ListarPrueba);
// MODIFICAR prueba
rutas.put('/pruebas/modificar', prueba_controladores_1.ModificarPrueba);
exports.default = rutas;
