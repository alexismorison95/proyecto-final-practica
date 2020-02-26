// Imports modulos
import express, { NextFunction, Response, Request } from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

// Import conexion BBDD
import { ConexionBD } from "./modulos/bbdd/db.conexion";

// Imports rutas
import loginRutas from "./modulos/login/login.rutas";
import logoutRutas from "./modulos/logout/logout.rutas";
import conductorRutas from "./modulos/conductor/conductor.rutas";


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


// Autentificacion en rutas
const auth = (req: Request, res: Response, next: NextFunction) => {
    
    if (req.session.id_usuario) {
        return next();
    }
    else {
        return res.status(401).json({res: "Debe iniciar sesion"});
    }

}


// Middlewares 
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200', credentials: true })); // Desarrollo
app.use(sessionActual);


// Rutas
app.use('/api/', loginRutas);
app.use('/api/', logoutRutas);
app.use('/api/', auth, conductorRutas);



app.listen(app.get('port'));
console.log("Escuchando en el puerto", app.get('port'));
