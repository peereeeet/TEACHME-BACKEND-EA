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
const router = express.Router();
////////////////////////////////////POSTS/////////////////////////////////////
router.post('/', usuarioController_1.crearUsuario);
////////////////////////////////////GETS/////////////////////////////////////
router.get('/', usuarioController_1.listarUsuarios);
router.get('/:usuarioId/asignaturas', usuarioController_1.obtenerAsignaturasDelUsuario);
router.get('/:nombre', usuarioController_1.verUsuarioPorNombre);
router.get('/:_id', usuarioController_1.verUsuarioPorId);
router.get('/:nombre/asignaturas', usuarioController_1.obtenerIdUsuarioPorNombre);
////////////////////////////////////PUTS/////////////////////////////////////
router.put('/:nombre/asignaturas', usuarioController_1.asignarAsignaturasAUsuario);
router.put('/:_id', usuarioController_1.actualizarUsuarioPorId);
router.put('/:nombre/asignaturas/actualizar', usuarioController_1.actualizarAsignaturasUsuarioPorNombre);
router.put('/:usuarioId/asignaturas/:asignaturaId', usuarioController_1.asignarAsignaturaAUsuarioPorId);
router.put('/:_id/edad', usuarioController_1.modificarEdadUsuarioPorId);
router.put('/:_id/email', usuarioController_1.modificarEmailUsuarioPorId);
router.put('/:_id/nombre', usuarioController_1.modificarNombreUsuarioPorId);
router.put('/:_id/password', usuarioController_1.modificarPasswordUsuarioPorId);
router.put('/:_id/rol', usuarioController_1.modificarRolUsuarioPorId);
////////////////////////////////////DELETES/////////////////////////////////////
router.delete('/:usuarioId/asignaturas/:asignaturaId', usuarioController_1.eliminarAsignaturaDeUsuarioPorId);
router.delete('/:nombre/asignaturas/:asignaturaId', usuarioController_1.eliminarAsignaturaDeUsuarioPorNombre);
router.delete('/:usuarioId', usuarioController_1.eliminarUsuarioPorId);
exports.default = router;
//# sourceMappingURL=usuarioRoutes.js.map