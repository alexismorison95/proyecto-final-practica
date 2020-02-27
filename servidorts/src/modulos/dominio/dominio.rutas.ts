import { Router } from "express";
import { AltaDominio, ListarDominio, ListarDominios, ModificarDominio } from "./dominio.controladores";

const rutas = Router();


// DEFINICION DE RUTAS
// ALTA DOMINIO
rutas.post('/dominios/alta', AltaDominio);

// LISTAR DOMINIOS
rutas.get('/dominios/listar', ListarDominios);

// LISTAR DOMINIO
rutas.get('/dominios/listar/:id', ListarDominio);

// MODIFICAR DOMINIO
rutas.put('/dominios/modificar', ModificarDominio)

export default rutas;