// Imports modulos
import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

// Import conexion BBDD
import { ConexionBD } from "./modulos/bbdd/db.conexion";

// Import funciones
import { Auth } from "./modulos/funciones/funciones";

// Imports rutas
import loginRutas from "./modulos/login/login.rutas";
import logoutRutas from "./modulos/logout/logout.rutas";
import conductorRutas from "./modulos/conductor/conductor.rutas";
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
app.use('/api/', Auth, usuarioRutas);



app.listen(app.get('port'));
console.log("Escuchando en el puerto", app.get('port'));
