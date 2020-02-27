import { Router } from "express";
import { AltaPrueba, ListarPrueba, ListarPruebas, 
    ListarPruebasNoVerificadas, ModificarPrueba } from "./prueba.controladores";

const rutas = Router();


// DEFINICION DE RUTAS
// ALTA prueba
rutas.post('/pruebas/alta', AltaPrueba);

// LISTAR pruebas
rutas.get('/pruebas/listar', ListarPruebas);

// LISTAR PRUEBAS NO VERIFICADAS
rutas.get('/pruebas/listar/noverificadas', ListarPruebasNoVerificadas);

// LISTAR prueba
rutas.get('/pruebas/listar/:id', ListarPrueba);

// MODIFICAR prueba
rutas.put('/pruebas/modificar', ModificarPrueba)

export default rutas;