const express = require('express');
const prestamoControlador = require('./prestamo.controlador');

const rutasPrestamo = express.Router();


// DEFINICION DE RUTprestamoAS
// ALTA prestamo
rutasPrestamo.post('/prestamo/alta', prestamoControlador.alta_prestamo);

// LISTAR prestamos
rutasPrestamo.get('/prestamo/listar', prestamoControlador.listar_prestamos);

// LISTAR prestamo
rutasPrestamo.get('/prestamo/listar/:id', prestamoControlador.listar_prestamo);

// MODIFICAR prestamo
rutasPrestamo.put('/prestamo/baja', prestamoControlador.baja_prestamo);


module.exports = rutasPrestamo;