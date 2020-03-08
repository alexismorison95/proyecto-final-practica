"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dominio_controladores_1 = require("./dominio.controladores");
const rutas = express_1.Router();
// DEFINICION DE RUTAS
// ALTA DOMINIO
rutas.post('/dominios/alta', dominio_controladores_1.AltaDominio);
// LISTAR DOMINIOS
rutas.get('/dominios/listar', dominio_controladores_1.ListarDominios);
// LISTAR DOMINIO
rutas.get('/dominios/listar/:id', dominio_controladores_1.ListarDominio);
// MODIFICAR DOMINIO
rutas.put('/dominios/modificar', dominio_controladores_1.ModificarDominio);
exports.default = rutas;
