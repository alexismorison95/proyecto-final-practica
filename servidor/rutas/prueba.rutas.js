const express = require('express');
const pruebaControlador = require('../controladores/prueba.controlador');

const rutasPrueba = express.Router();


// DEFINICION DE RUTAS
// ALTA prueba
rutasPrueba.post('/prueba/alta', pruebaControlador.alta_prueba);

// LISTAR pruebas
rutasPrueba.get('/prueba/listar', pruebaControlador.listar_pruebas);

// LISTAR PRUEBAS NO VERIFICADAS
rutasPrueba.get('/prueba/listar/noverificadas', pruebaControlador.listar_pruebas_no_verificadas);

// LISTAR prueba
rutasPrueba.get('/prueba/listar/:id', pruebaControlador.listar_prueba);

// MODIFICAR prueba
rutasPrueba.put('/prueba/modificar', pruebaControlador.modificar_prueba)


module.exports = rutasPrueba;