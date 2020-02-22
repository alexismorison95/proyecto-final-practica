const express = require('express');
const conductorControlador = require('./conductor.controlador');

const rutasConductor = express.Router();


// DEFINICION DE RUTAS
// ALTA CONDUCOTR
rutasConductor.post('/conductores/alta', conductorControlador.alta_conductor);

// LISTAR CONDUCTORES
rutasConductor.get('/conductores/listar', conductorControlador.listar_conductores);

// LISTAR CONDUCTOR
rutasConductor.get('/conductores/listar/:dni', conductorControlador.listar_conductor);


module.exports = rutasConductor;