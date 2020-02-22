const express = require('express');
const usuarioControlador = require('./usuario.controlador');

const rutasUsuario = express.Router();


// DEFINICION DE RUTAS
// ALTA USUARIO
rutasUsuario.post('/usuarios/alta', usuarioControlador.alta_usuario);

// LISTAR USUARIOS
rutasUsuario.get('/usuarios/listar', usuarioControlador.listar_usuarios);

// LISTAR USUARIO
rutasUsuario.get('/usuarios/listar/:id', usuarioControlador.listar_usuario);

// BAJA USUARIOS
rutasUsuario.delete('/usuarios/eliminar/:id', usuarioControlador.eliminar_usuario);

// MODIFICAR USUARIO
rutasUsuario.put('/usuarios/modificar/:id', usuarioControlador.modificar_usaurio);


module.exports = rutasUsuario;