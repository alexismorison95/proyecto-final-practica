import { Router } from "express";
import { AltaEquipo, ListarEquipo, ListarEquipos, BajaDominio, ListarEquiposPU } from "./equipo.controladores";

const rutas = Router();


// DEFINICION DE RUTAS
// ALTA EQUIPO
rutas.post('/equipos/alta', AltaEquipo);

// LISTAR EQUIPOS
rutas.get('/equipos/listar', ListarEquipos);

// LISTAR EQUIPOS + PERIODOUTILIZABLE
rutas.get('/equipos/listarperiodo', ListarEquiposPU);

// LISTAR EQUIPO
rutas.get('/equipos/listar/:id', ListarEquipo);

// MODIFICAR EQUIPO
rutas.put('/equipos/baja/:id', BajaDominio)

export default rutas;