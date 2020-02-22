const conexion = require('../bbdd/db.conexion');


// ALTA DOMINIO
exports.alta_dominio = async(req, res) => {

    db = conexion(req.session.rol);

    try {

        // Transaccion
        await db.query('BEGIN');
        const queryText = 'select * from alta_dominio($1, $2);';
        const respuesta = await db.query(queryText, [req.body.id, req.body.descripcion]);
        await db.query('COMMIT');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        // Error de la transaccion
        await db.query('ROLLBACK');
        console.log(error.stack);

        res.status(500).json({ res: 'Internal Server Error' });

    }

}


// LISTAR DOMINIOS
exports.listar_dominios = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from dominio;');

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json('Internal Server Error');

    }

}


// LISTAR DOMINIO
exports.listar_dominio = async(req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from dominio where id = $1;', [req.params.id]);

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json(error.stack);

    }

}


// MODIFICAR DOMINIO
exports.modificar_dominio = async (req, res) => {

    try {

        db = conexion(req.session.rol);

        const respuesta = await db.query('select * from modificacion_dominio($1, $2)', [req.body.id, req.body.descripcion]);

        res.status(200).json(respuesta.rows);

    } catch (error) {

        console.log(error.stack);

        res.status(500).json(error.stack);

    }

}
