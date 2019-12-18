const conexion = require('../configuraciones/db.conexion');


// ALTA CONDUCTOR
exports.alta_conductor = async(req, res) => {

    db = conexion(req.session.rol);

    try {

        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from alta_conductor($1, $2, $3);';
        const respuesta = await db.query(queryText, [req.body.dni, req.body.nombre, req.body.apellido]);
        await db.query('COMMIT');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        // Error de la transaccion
        await db.query('ROLLBACK');
        console.log(error.stack);

        res.status(500).json({ res: 'Internal Server Error' });

    }

}


// LISTAR CONDUCTORES
exports.listar_conductores = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from conductor;');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json('Internal Server Error');

    }

}


// LISTAR CONDUCTOR
exports.listar_conductor = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from conductor where dni = $1;', [req.params.dni]);

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json('Internal Server Error');

    }

}