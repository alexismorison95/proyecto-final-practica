import { Request, Response, Router } from "express";
import { AltaConductor, ListarConductores, ListarConductor } from "./conductor.controladores";

const rutas = Router();


// DEFINICION DE RUTAS
// ALTA CONDUCTOR
rutas.post('/conductores/alta', AltaConductor);

// LISTAR CONDUCTORES
rutas.get('/conductores/listar', ListarConductores);

// LISTAR CONDUCTOR
rutas.get('/conductores/listar/:dni', ListarConductor);

export default rutas;