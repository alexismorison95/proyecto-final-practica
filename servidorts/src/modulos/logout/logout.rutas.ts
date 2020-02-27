import { Router } from "express";
import { LogOut } from "./logout.controladores";

const rutas = Router();


// DEFINICION DE RUTAS
// LOGOUT
rutas.get('/logout', LogOut);


export default rutas;