import { Router } from "express";
import { AltaUsuario, ListarUsuarios, ListarUsuario, 
    BajaUsuario, ModificarUsuario } from "./usuario.controladores";

const rutas = Router();


// DEFINICION DE RUTAS
// ALTA USUARIO
rutas.post('/usuarios/alta', AltaUsuario);

// LISTAR USUARIOS
rutas.get('/usuarios/listar', ListarUsuarios);

// LISTAR USUARIO
rutas.get('/usuarios/listar/:id', ListarUsuario);

// ELIMINAR USUARIO
rutas.delete('/usuarios/baja/:id', BajaUsuario);

// MODIFICAR USUARIO
rutas.put('/usuarios/modificar', ModificarUsuario);

export default rutas;