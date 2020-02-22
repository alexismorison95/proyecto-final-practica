const conexion = require('../bbdd/db.conexion');


// ALTA PU
exports.alta_pu = async(req, res) => {

    db = conexion(req.session.rol);

    try {

        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from alta_periodoutilizable($1, $2, $3, $4);';
        const respuesta = await db.query(queryText, [req.body.fechainicio, req.body.fechavencimiento,
                                                        req.body.nroingreso, req.body.idequipo]);
        await db.query('COMMIT');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        // Error de la transaccion
        await db.query('ROLLBACK');
        console.log(error.stack);

        res.status(500).json({ res: 'Internal Server Error' });

    }

}


// LISTAR PUS
exports.listar_pus = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from periodoutilizable;');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json('Internal Server Error');

    }

}


// LISTAR PU
exports.listar_pu = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from periodoutilizable where id = $1;', [req.params.id]);

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json(error.stack);

    }

}


// BAJA PU
exports.baja_pu = async (req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from baja_periodoutilizable($1)', [req.body.id]);

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json(error.stack);

    }

}
