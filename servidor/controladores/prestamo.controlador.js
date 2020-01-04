const conexion = require('../configuraciones/db.conexion');


// ALTA prestamo
exports.alta_prestamo = async(req, res) => {

    db = conexion(req.session.rol);

    try {

        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from alta_prestamo($1, $2, $3, $4, $5);';
        const respuesta = await db.query(queryText, [req.body.fechaprestamo, req.body.horaprestamo,
                                                    req.body.nroinicial, req.body.idexaminador, 
                                                    req.body.idequipo]);
        await db.query('COMMIT');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        // Error de la transaccion
        await db.query('ROLLBACK');
        console.log(error.stack);

        res.status(500).json({ res: 'Internal Server Error' });

    }

}


// LISTAR prestamos
exports.listar_prestamos = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from prestamo;');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json('Internal Server Error');

    }

}


// LISTAR prestamo
exports.listar_prestamo = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from prestamo where id = $1;', [req.params.id]);

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json(error.stack);

    }

}


// BAJA PRESTAMO
exports.baja_prestamo = async (req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from baja_prestamo($1, $2, $3, $4)', [req.body.id,                           req.body.fechadevolucion, req.body.horadevolucion, req.body.nrodevolucion]);

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json(error.stack);

    }

}
