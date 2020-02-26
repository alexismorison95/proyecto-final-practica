"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports modulos
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
// Import conexion BBDD
const db_conexion_1 = require("./modulos/bbdd/db.conexion");
// Imports rutas
const login_rutas_1 = __importDefault(require("./modulos/login/login.rutas"));
// Inicializaciones
const app = express_1.default();
const pgSession = connect_pg_simple_1.default(express_session_1.default);
const pgPool = db_conexion_1.ConexionBD('sesion_user');
// Configuraciones
app.set('port', process.env.PORT || 3000);
// Objeto para el middleware y configuracion de sesiones
const sessionActual = express_session_1.default({
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
const auth = (req, res, next) => {
    if (req.session.id_usuario) {
        return next();
    }
    else {
        return res.status(401).json({ res: "Debe iniciar sesion" });
    }
};
// Middlewares 
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(cors_1.default({ origin: 'http://localhost:4200', credentials: true })); // Desarrollo
app.use(sessionActual);
// Rutas
app.use('/api/', login_rutas_1.default);
app.listen(app.get('port'));
console.log("Escuchando en el puerto", app.get('port'));
