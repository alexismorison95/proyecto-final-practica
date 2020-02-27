"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// LOGOUT
function LogOut(req, res) {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.status(500).json({ res: "Error interno del servidor." + err });
        }
    });
    res.status(200).json({ res: "Sesión cerrada" });
}
exports.LogOut = LogOut;
