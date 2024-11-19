"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// auth.ts
const express_1 = require("express");
const authJWTController_1 = require("../controller/authJWTController");
const router = (0, express_1.Router)();
router.post('/loginUsuario', authJWTController_1.loginUsuarioController);
router.post('/register', authJWTController_1.registerUsuario);
exports.default = router;
//# sourceMappingURL=authJWTRoutes.js.map