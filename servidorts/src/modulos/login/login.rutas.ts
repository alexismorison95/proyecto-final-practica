import { Request, Response, Router } from "express";
import { ConexionBD } from "../bbdd/db.conexion";

// Nos conectamos con el usuario login_user de la BBDD para iniciar sesion
const db = ConexionBD('login_user');
const rutas = Router();


// DEFINICION DE RUTAS
// LOGIN
rutas.post('/login', async (req: Request, res: Response) => {

    try {
        // Consulta
        const respuesta = await db.query('select * from usuario where nombreusuario = $1 AND contrasenia = $2;',
                                        [req.body.nombre, req.body.contrasenia]);
        
        // Si trajo un usuario carga su id y rol en la sesion y envia al cliente el usuario
        if (respuesta.rows[0]) {
            
            // Guardo en la sesion los datos del usuario
            req.session.id_usuario = respuesta.rows[0].id;
            req.session.rol = respuesta.rows[0].tipousuario;

            console.log("Logueado en el sistema como", req.session.rol, 
                        "- id de usuario", req.session.id_usuario);

            // Envio al cliente los datos del usuario logueado
            res.status(200).json(respuesta.rows[0]);

        }
        else {

            // Envio al cliente que el usuario o contrasenia no correpsonden
            res.status(500).json({res: "Usuario o contraseña no validos."});

        }
    }
    catch (e) {
        // Capturo el error al tratar de conectarse a la bbdd
        let error = (e as Error).message;
        console.log(error);

        // Envio el error al cliente
        res.status(500).json({res: "Error interno del servidor." + error});
    }
});


// Como hay que tener seguridad, si la persona hace f5 de la pagina, debera volver a iniciar sesion
// Esta funcion se encarga de verificar si hay una sesion creada
rutas.get('/f5', (req: Request, res: Response) => {

    if (req.session.id_usuario) {
        res.status(200).json({res: 'Debe volver a iniciar sesion.'});
    }
    else {
        res.status(500).json({res: 'Sesion no iniciada.'});
    }
    
})


export default rutas;