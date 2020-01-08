const conexion = require('../configuraciones/db.conexion');


// ALTA prueba
exports.alta_prueba = async(req, res) => {

    db = conexion(req.session.rol);

    try {

        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from alta_prueba($1, $2, $3, $4, $5, $6, $7, $8, $9);';
        const respuesta = await db.query(queryText, [req.body.fecha, req.body.hora, req.body.nromuestra, req.body.resultado, req.body.nroacta, req.body.nroretencion, req.body.dniconductor, req.body.iddominio, req.body.idprestamo]);
        await db.query('COMMIT');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        // Error de la transaccion
        await db.query('ROLLBACK');
        console.log(error.stack);

        res.status(500).json({ res: 'Internal Server Error' });

    }

}


// LISTAR pruebas
exports.listar_pruebas = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from prueba;');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json('Internal Server Error');

    }

}

// LISTAR pruebas
exports.listar_pruebas_no_verificadas = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from prueba where verificado=false;');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json('Internal Server Error');

    }

}


// LISTAR prueba
exports.listar_prueba = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from prueba where id = $1;', [req.params.id]);

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json(error.stack);

    }

}


// MODIFICAR prueba
exports.modificar_prueba = async (req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from modificacion_prueba($1, $2, $3)', [req.body.id, req.body.rechazado, req.body.descripcionrechazo]);

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json(error.stack);

    }

}
