const express = require('express');
const pruebaControlador = require('../controladores/prueba.controlador');

const rutasPrueba = express.Router();


// DEFINICION DE RUTAS
// ALTA prueba
rutasPrueba.post('/prueba/alta', pruebaControlador);

// LISTAR pruebas
rutasPrueba.get('/prueba/listar', pruebaControlador);

// LISTAR prueba
rutasPrueba.get('/prueba/listar/:id', pruebaControlador);

// MODIFICAR prueba
rutasPrueba.put('/prueba/modificar', pruebaControlador)


module.exports = rutasPrueba;