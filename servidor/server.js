// SERVIDOR

// IMPORTS
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const pg = require('pg');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);


// CONFIGURACION DEL SERVIDOR
const app = express();

app.set('puerto', 3000 || process.env.PORT);

// Conexion BBDD para poder manejar las sesiones
const pgPool = new pg.Pool({
    database: 'alcoholemia',
    user: 'sesion_user',
    password: 'asfAFsaf_@_423a.a',
    port: 5432
});

// Funcion que verifica en cada peticion que el usuario tenga una sesion iniciada
const auth = (req, res, next) => {

    if (req.session.id_usuario) {

        return next();

    } else {

        return res.status(401).json({ res: "Debe iniciar sesion" });

    }

}


// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200', credentials: true })); // Desarrollo
//app.use(express.urlencoded({ extended: false }));
app.use(session({
    store: new pgSession({
        pool: pgPool,
        tableName: 'sesiones'
    }),
    secret: 'cadena secreta',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 300 * 60 * 1000 } // 30 minutos
}));


// RUTAS
app.use('/api/', require('./modulos/login/login.rutas'));
app.use('/api/', auth, require('./modulos/logout/logout.rutas'));
app.use('/api/', auth, require('./modulos/conductor/conductor.rutas'));
app.use('/api/', auth, require('./modulos/usuario/usuario.rutas'));
app.use('/api/', auth, require('./modulos/dominio/dominio.rutas'));
// app.use('/api/', auth, require('./rutas/examinador.rutas'));
app.use('/api/', auth, require('./modulos/equipo/equipo.rutas'));
app.use('/api/', auth, require('./modulos/periodoutilizable/periodoutilizable.rutas'));
app.use('/api/', auth, require('./modulos/prestamo/prestamo.rutas'));
app.use('/api/', auth, require('./modulos/prueba/prueba.rutas'));


// ENCENDER SERVIDOR
app.listen(app.get('puerto'), () => {
    console.log("Escuchando en el puerto", app.get('puerto'));
});