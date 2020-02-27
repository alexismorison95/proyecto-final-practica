import { Request, Response } from "express";
import { ConexionBD } from "../bbdd/db.conexion";
import { NotificarError } from "../funciones/funciones";


// LOGOUT
export function LogOut(req: Request, res: Response) {

    req.session.destroy(err => {

        if (err) { 
            console.log(err); 
            res.status(500).json({res: "Error interno del servidor." + err});
        }

    });

    res.status(200).json({res: "Sesión cerrada"});
    
}