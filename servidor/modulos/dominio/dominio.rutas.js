const express = require('express');
const dominioControlador = require('./dominio.controlador');

const rutasDominio = express.Router();


// DEFINICION DE RUTAS
// ALTA DOMINIO
rutasDominio.post('/dominio/alta', dominioControlador.alta_dominio);

// LISTAR DOMINIOS
rutasDominio.get('/dominio/listar', dominioControlador.listar_dominios);

// LISTAR DOMINIO
rutasDominio.get('/dominio/listar/:id', dominioControlador.listar_dominio);

// MODIFICAR DOMINIO
rutasDominio.put('/dominio/modificar', dominioControlador.modificar_dominio)


module.exports = rutasDominio;