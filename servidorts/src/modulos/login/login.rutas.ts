import { Router } from "express";
import { LogIn, F5 } from "./login.controladores";

const rutas = Router();


// DEFINICION DE RUTAS
// LOGIN
rutas.post('/login', LogIn);

// RECARGA DE PAGINA F5
rutas.get('/f5', F5);


export default rutas;