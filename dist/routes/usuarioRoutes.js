"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const usuarioController_1 = require("../controller/usuarioController");
const authJWT_1 = require("../middlewares/authJWT");
const router = express.Router();
////////////////////////////////////POSTS/////////////////////////////////////
router.post('/', usuarioController_1.crearUsuario);
////////////////////////////////////GETS/////////////////////////////////////
router.get('/', usuarioController_1.listarUsuarios);
router.get('/:nombre', usuarioController_1.verUsuarioPorNombre);
router.get('/porID/:_id', usuarioController_1.verUsuarioPorId);
router.get('/adminID/:_id', [authJWT_1.verifyToken, authJWT_1.isOwner], usuarioController_1.listarUsuariosAdmin);
router.get('/adminNombre/:nombre', [authJWT_1.verifyToken, authJWT_1.isOwner], usuarioController_1.listarUsuariosAdminPorNombre);
////////////////////////////////////PUTS/////////////////////////////////////
router.put('/:email/asignaturas', [authJWT_1.verifyToken, authJWT_1.isOwner], usuarioController_1.asignarAsignaturasAUsuarioEmail);
router.put('/:_id', [authJWT_1.verifyToken, authJWT_1.isOwner], usuarioController_1.actualizarUsuarioPorId);
router.put('/:nombre/asignaturas/actualizar', [authJWT_1.verifyToken, authJWT_1.isOwner], usuarioController_1.actualizarAsignaturasUsuarioPorNombre);
router.put('/:_id/asignaturas/:asignaturaId', [authJWT_1.verifyToken, authJWT_1.isOwner], usuarioController_1.asignarAsignaturaAUsuarioPorId);
router.put('/:_id/edad', [authJWT_1.verifyToken, authJWT_1.isOwner], usuarioController_1.modificarEdadUsuarioPorId);
router.put('/:_id/email', [authJWT_1.verifyToken, authJWT_1.isOwner], usuarioController_1.modificarEmailUsuarioPorId);
router.put('/:_id/nombre', [authJWT_1.verifyToken, authJWT_1.isOwner], usuarioController_1.modificarNombreUsuarioPorId);
router.put('/:_id/password', [authJWT_1.verifyToken, authJWT_1.isOwner], usuarioController_1.modificarPasswordUsuarioPorId);
router.put('/:_id/rol', [authJWT_1.verifyToken, authJWT_1.isOwner], usuarioController_1.modificarRolUsuarioPorId);
////////////////////////////////////DELETES/////////////////////////////////////
router.delete('/:_id/asignaturas/:asignaturaid', [authJWT_1.verifyToken, authJWT_1.isOwner], usuarioController_1.eliminarAsignaturaDeUsuarioPorId);
router.delete('/:email/asignaturas', [authJWT_1.verifyToken, authJWT_1.isOwner], usuarioController_1.eliminarAsignaturaDeUsuarioPorEmail);
router.delete('/:_id', [authJWT_1.verifyToken, authJWT_1.isOwner], usuarioController_1.eliminarUsuarioPorId);
exports.default = router;
//# sourceMappingURL=usuarioRoutes.js.map