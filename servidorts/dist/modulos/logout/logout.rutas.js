"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rutas = express_1.Router();
// DEFINICION DE RUTAS
// LOGOUT
rutas.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).json({ res: "Sesión cerrada" });
});
exports.default = rutas;
