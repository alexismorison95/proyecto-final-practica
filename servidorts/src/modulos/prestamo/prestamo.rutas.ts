import { Router } from "express";
import { AltaPrestamo, ListarPrestamo, ListarPrestamos, BajaPrestamo } from "./prestamo.controladores";

const rutas = Router();


// DEFINICION DE RUTAS
// ALTA prestamo
rutas.post('/prestamos/alta', AltaPrestamo);

// LISTAR prestamos
rutas.get('/prestamos/listar', ListarPrestamos);

// LISTAR prestamo
rutas.get('/prestamos/listar/:id', ListarPrestamo);

// MODIFICAR prestamo
rutas.put('/prestamos/baja', BajaPrestamo)

export default rutas;