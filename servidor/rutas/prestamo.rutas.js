const express = require('express');
const prestamoControlador = require('../controladores/prestamo.controlador');

const rutasPrestamo = express.Router();


// DEFINICION DE RUTAS
// ALTA prestamo
rutasPrestamo.post('/prestamo/alta', prestamoControlador);

// LISTAR prestamos
rutasPrestamo.get('/prestamo/listar', prestamoControlador);

// LISTAR prestamo
rutasPrestamo.get('/prestamo/listar/:id', prestamoControlador);

// MODIFICAR prestamo
rutasPrestamo.put('/prestamo/baja', prestamoControlador)


module.exports = rutasPrestamo;