const conexion = require('../configuraciones/db.conexion');


// ALTA EQUIPO
exports.alta_equipo = async(req, res) => {

    db = conexion(req.session.rol);

    try {

        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from alta_equipo($1, $2);';
        const respuesta = await db.query(queryText, [req.body.nombre, req.body.activo]);
        await db.query('COMMIT');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        // Error de la transaccion
        await db.query('ROLLBACK');
        console.log(error.stack);

        res.status(500).json({ res: 'Internal Server Error' });

    }

}


// LISTAR EQUIPOS
exports.listar_equipos = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from equipo;');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json('Internal Server Error');

    }

}


// LISTAR EQUIPO
exports.listar_equipo = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from equipo where id = $1;', [req.params.id]);

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json(error.stack);

    }

}


// BAJA EQUIPO
exports.baja_equipo = async (req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from baja_equipo($1)', [req.body.id]);

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json(error.stack);

    }

}
