import { Request, Response } from "express";
import { ConexionBD } from "../bbdd/db.conexion";
import { NotificarError } from "../funciones/funciones";


// LOGIN
export async function LogIn(req: Request, res: Response) {

    try {
        const db = ConexionBD('login_user');

        // Consulta
        const parametros = [
            req.body.nombre, 
            req.body.contrasenia
        ];
        const respuesta = await db.query(
            'select * from usuario where nombreusuario = $1 AND contrasenia = $2;',
            parametros
        );
        
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
            res.status(404).json({res: "Usuario o contraseña no validos."});

        }
    }
    catch (e) {
        NotificarError(e, res);
    }

}

// F5
// Como hay que tener seguridad, si la persona hace f5 de la pagina, debera volver a iniciar sesion
// Esta funcion se encarga de verificar si hay una sesion creada
export function F5(req: Request, res: Response) {

    if (req.session.id_usuario) { 

        res.status(200).json({res: 'Debe volver a iniciar sesion.'}); 

    }
    else { 
        
        res.status(500).json({res: 'Sesion no iniciada.'}); 

    }

}