import { Router } from "express";
import { AltaEquipo, ListarEquipo, ListarEquipos, BajaDominio } from "./equipo.controladores";

const rutas = Router();


// DEFINICION DE RUTAS
// ALTA EQUIPO
rutas.post('/equipos/alta', AltaEquipo);

// LISTAR EQUIPO
rutas.get('/equipos/listar', ListarEquipos);

// LISTAR EQUIPO
rutas.get('/equipos/listar/:id', ListarEquipo);

// MODIFICAR EQUIPO
rutas.put('/equipos/baja', BajaDominio)

export default rutas;