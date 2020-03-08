// Import modulos
import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

// Import conexion BBDD
import { ConexionBD } from "./modulos/bbdd/db.conexion";

// Import funciones
import { Auth } from "./modulos/funciones/funciones";

// Import rutas
import conductorRutas from "./modulos/conductor/conductor.rutas";
import dominioRutas from "./modulos/dominio/dominio.rutas";
import equipoRutas from "./modulos/equipo/equipo.rutas";
import loginRutas from "./modulos/login/login.rutas";
import logoutRutas from "./modulos/logout/logout.rutas";
import periodoUtilizableRutas from "./modulos/periodoutilizable/periodoutilizable.rutas";
import prestamoRutas from "./modulos/prestamo/prestamo.rutas";
import pruebaRutas from "./modulos/prueba/prueba.rutas";
import usuarioRutas from "./modulos/usuario/usuario.rutas";


// Inicializaciones
const app = express();
const pgSession = connectPgSimple(session);
const pgPool = ConexionBD('sesion_user');


// Configuraciones
app.set('port', process.env.PORT || 3000);

// Objeto para el middleware y configuracion de sesiones
const sessionActual = session({
    store: new pgSession({
        pool: pgPool,
        tableName: 'sesiones'
    }),
    secret: 'mi cadena secreta',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 300 * 60 * 1000 } // 30 minutos
});


// Middlewares 
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200', credentials: true })); // Desarrollo
app.use(sessionActual);


// Rutas
app.use('/api/', loginRutas);
app.use('/api/', logoutRutas);
app.use('/api/', Auth, conductorRutas);
app.use('/api/', Auth, dominioRutas);
app.use('/api/', Auth, equipoRutas);
app.use('/api/', Auth, periodoUtilizableRutas);
app.use('/api/', Auth, prestamoRutas);
app.use('/api/', Auth, pruebaRutas);
app.use('/api/', Auth, usuarioRutas);



app.listen(app.get('port'));
console.log("Escuchando en el puerto", app.get('port'));
