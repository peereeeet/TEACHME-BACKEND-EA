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
router.get('/:nombre', usuarioController_1.verUsuarioPorNombre);
////////////////////////////////////PUTS/////////////////////////////////////
router.put('/:nombre/asignaturas', usuarioController_1.asignarAsignaturasAUsuario);
router.put('/:_id', usuarioController_1.actualizarUsuarioPorId);
router.put('/:nombre/asignaturas/actualizar', usuarioController_1.actualizarAsignaturasUsuarioPorNombre);
router.put('/:nombre/asignatura/:id', usuarioController_1.asignarAsignaturaAUsuarioPorId);
////////////////////////////////////DELETES/////////////////////////////////////
router.delete('/:nombre/asignatura/:id', usuarioController_1.eliminarAsignaturaDeUsuarioPorId);
router.delete('/:nombre/asignaturas/:asignaturaId', usuarioController_1.eliminarAsignaturaDeUsuarioPorNombre);
router.delete('/:id', usuarioController_1.eliminarUsuarioPorId);
exports.default = router;
//# sourceMappingURL=usuarioRoutes.js.map