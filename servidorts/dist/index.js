"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import modulos
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
// Import conexion BBDD
const db_conexion_1 = require("./modulos/bbdd/db.conexion");
// Import funciones
const funciones_1 = require("./modulos/funciones/funciones");
// Import rutas
const conductor_rutas_1 = __importDefault(require("./modulos/conductor/conductor.rutas"));
const dominio_rutas_1 = __importDefault(require("./modulos/dominio/dominio.rutas"));
const equipo_rutas_1 = __importDefault(require("./modulos/equipo/equipo.rutas"));
const login_rutas_1 = __importDefault(require("./modulos/login/login.rutas"));
const logout_rutas_1 = __importDefault(require("./modulos/logout/logout.rutas"));
const periodoutilizable_rutas_1 = __importDefault(require("./modulos/periodoutilizable/periodoutilizable.rutas"));
const prestamo_rutas_1 = __importDefault(require("./modulos/prestamo/prestamo.rutas"));
const prueba_rutas_1 = __importDefault(require("./modulos/prueba/prueba.rutas"));
const usuario_rutas_1 = __importDefault(require("./modulos/usuario/usuario.rutas"));
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
// Middlewares 
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(cors_1.default({ origin: 'http://localhost:4200', credentials: true })); // Desarrollo
app.use(sessionActual);
// Rutas
app.use('/api/', login_rutas_1.default);
app.use('/api/', logout_rutas_1.default);
app.use('/api/', funciones_1.Auth, conductor_rutas_1.default);
app.use('/api/', funciones_1.Auth, dominio_rutas_1.default);
app.use('/api/', funciones_1.Auth, equipo_rutas_1.default);
app.use('/api/', funciones_1.Auth, periodoutilizable_rutas_1.default);
app.use('/api/', funciones_1.Auth, prestamo_rutas_1.default);
app.use('/api/', funciones_1.Auth, prueba_rutas_1.default);
app.use('/api/', funciones_1.Auth, usuario_rutas_1.default);
app.listen(app.get('port'));
console.log("Escuchando en el puerto", app.get('port'));
