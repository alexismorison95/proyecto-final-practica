const express = require('express');
const db = require('../configuraciones/db.conexion')("sesion_user"); // Otra forma de iniciar la conexion

const rutasLogout = express.Router();


// DEFINICION DE RUTAS
// LOGOUT
rutasLogout.get('/logout', (req, res) => {

    req.session.destroy();

    res.status(200).json({ res: "Sesión cerrada" });

});

module.exports = rutasLogout;