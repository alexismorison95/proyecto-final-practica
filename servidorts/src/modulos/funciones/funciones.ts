import { Response } from "express";

// Funcion para mostrar un error por consola y enviarla al cliente
// Ya que en los try catch, la parte del catch es siempre igual
export function NotificarError(e: any, res: Response) {

    let error = (e as Error).message;
    console.log(error);
    
    // Envio el error al cliente
    res.status(500).json({res: "Error interno del servidor." + error});

}