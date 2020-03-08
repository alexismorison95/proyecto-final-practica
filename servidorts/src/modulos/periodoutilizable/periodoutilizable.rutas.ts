import { Router } from "express";
import { AltaPeriodoUtilizable, ListarPeriodoUtilizable, 
    ListarPeriodosUtilizables, BajaPeriodoUtilizable } from "./periodoutilizable.controladores";

const rutas = Router();


// DEFINICION DE RUTAS
// ALTA periodoutilizable
rutas.post('/periodosutilizables/alta', AltaPeriodoUtilizable);

// LISTAR periodoutilizables
rutas.get('/periodosutilizables/listar', ListarPeriodosUtilizables);

// LISTAR periodoutilizable
rutas.get('/periodosutilizables/listar/:id', ListarPeriodoUtilizable);

// MODIFICAR periodoutilizable
rutas.put('/periodosutilizables/baja/:id', BajaPeriodoUtilizable)

export default rutas;