const express = require('express');
const conexion = require('../configuraciones/db.conexion');

db = conexion("login_user");

const rutasLogin = express.Router();

// LOGIN
rutasLogin.post('/login', async(req, res) => {

    try {

        // Consulta
        const respuesta = await db.query('select * from usuario where nombre = $1 AND contrasenia = $2;', [req.body.nombre, req.body.contrasenia]);

        // Si trajo un usuario carga su id y rol en la sesion y envia al cliente el usuario
        if (respuesta.rows[0]) {

            req.session.id_usuario = respuesta.rows[0].id;
            req.session.rol = respuesta.rows[0].tipousuario;
            console.log("Logueado como", req.session.rol);

            res.status(200).json(respuesta.rows[0]);

        } else {

            res.status(500).json({ res: "usuario o contraseñia no validos" });

        }

    } catch (error) {

        console.log(error);

        res.status(500).json('Internal Server Error', error);

    }

});

module.exports = rutasLogin;