const conexion = require('../configuraciones/db.conexion');


// ALTA USUARIO
exports.alta_usuario = async(req, res) => {

    db = conexion(req.session.rol);

    try {

        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from alta_usuario($1, $2, $3, $4);';
        const respuesta = await db.query(queryText, [req.body.nombrereal, req.body.nombreusuario, req.body.contrasenia, req.body.tipousuario]);
        await db.query('COMMIT');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        // Error de la transaccion
        await db.query('ROLLBACK');
        console.log(error.stack);

        res.status(500).json({ res: 'Internal Server Error' });

    }

}


// LISTAR USUARIOS
exports.listar_usuarios = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from usuario;');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json('Internal Server Error');

    }

}


// LISTAR USUARIO
exports.listar_usuario = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from usuario where id = $1;', [req.params.id]);

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json(error.stack);

    }

}


// ELIMINAR USUARIO
exports.eliminar_usuario = async (req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from baja_usuario($1)', [req.params.id]);

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json(error.stack);

    }

}


// MODIFICAR USUARIO
exports.modificar_usaurio = async (req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from modificacion_usuario($1, $2, $3, $4, $5)', [req.body.id, req.body.nombrereal, req.body.nombreusuario, req.body.contrasenia, req.body.tipousuario]);

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json(error.stack);

    }

}
