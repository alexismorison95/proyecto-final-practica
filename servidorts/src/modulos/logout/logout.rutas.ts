import { Request, Response, Router } from "express";

const rutas = Router();


// DEFINICION DE RUTAS
// LOGOUT
rutas.get('/logout', (req: Request, res: Response) => {

    req.session.destroy(err => {

        if (err) { 
            console.log(err); 
            res.status(500).json({res: "Error interno del servidor." + err});
        }

    });

    res.status(200).json({res: "Sesión cerrada"});

});


export default rutas;