import { Router } from "express";
import { AltaConductor, ListarConductores, 
    ListarConductor, ModificarConductor } from "./conductor.controladores";

const rutas = Router();


// DEFINICION DE RUTAS
// ALTA CONDUCTOR
rutas.post('/conductores/alta', AltaConductor);

// LISTAR CONDUCTORES
rutas.get('/conductores/listar', ListarConductores);

// LISTAR CONDUCTOR
rutas.get('/conductores/listar/:dni', ListarConductor);

// MODIFICAR CONDUCTOR (NO IMPLEMENTADO EN BBDD)
//rutas.post('/conductores/modificar/:dni', ModificarConductor);

export default rutas;