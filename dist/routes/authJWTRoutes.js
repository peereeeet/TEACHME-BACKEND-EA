"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// auth.ts
const express_1 = require("express");
const authJWTController_1 = require("../controller/authJWTController");
const router = (0, express_1.Router)();
// Ruta para login
router.post('/login', authJWTController_1.login);
//ruta para login con verificacion de token jwt
router.post('/loginUsuario', authJWTController_1.loginUsuarioController);
exports.default = router;
//# sourceMappingURL=authJWTRoutes.js.map