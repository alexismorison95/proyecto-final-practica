const express = require('express');
const equipoControlador = require('./equipo.controlador');

const rutasEquipo = express.Router();


// DEFINICION DE RUTAS
// ALTA DOMINIO
rutasEquipo.post('/equipo/alta', equipoControlador.alta_equipo);

// LISTAR DOMINIOS
rutasEquipo.get('/equipo/listar', equipoControlador.listar_equipos);

// LISTAR DOMINIO
rutasEquipo.get('/equipo/listar/:id', equipoControlador.listar_equipo);

// MODIFICAR DOMINIO
rutasEquipo.put('/equipo/baja', equipoControlador.baja_equipo)


module.exports = rutasEquipo;