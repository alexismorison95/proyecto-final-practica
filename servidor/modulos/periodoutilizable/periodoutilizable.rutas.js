const express = require('express');
const puControlador = require('./periodoutilizable.controlador');

const rutasPU = express.Router();


// DEFINICION DE RUTAS
// ALTA periodoutilizable
rutasPU.post('/periodoutilizable/alta', puControlador.alta_pu);

// LISTAR periodosutilizables
rutasPU.get('/periodoutilizable/listar', puControlador.listar_pus);

// LISTAR periodoutilizable
rutasPU.get('/periodoutilizable/listar/:id', puControlador.listar_pu);

// MODIFICAR periodoutilizable
rutasPU.put('/periodoutilizable/baja', puControlador.baja_pu)


module.exports = rutasPU;