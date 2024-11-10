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
////////////////////////////////////RUTAS SIN PARÁMETROS/////////////////////////////////////
router.post('/', usuarioController_1.crearUsuario); // Crear usuario
router.get('/listar-paginados', usuarioController_1.obtenerUsuariosPaginados); // Nueva ruta de paginación (asegúrate de que esté antes de las rutas con parámetros)
router.get('/', usuarioController_1.listarUsuarios); // Listar todos los usuarios
////////////////////////////////////RUTAS CON PARÁMETROS DINÁMICOS/////////////////////////////////////
router.get('/:usuarioId/asignaturas', usuarioController_1.obtenerAsignaturasDelUsuario); // Obtener asignaturas de un usuario
router.get('/:usuarioId/asignaturas/paginacion', usuarioController_1.obtenerAsignaturasPaginadasDeUsuario);
router.get('/:nombre', usuarioController_1.verUsuarioPorNombre); // Ver usuario por nombre
router.get('/:_id', usuarioController_1.verUsuarioPorId); // Ver usuario por ID
router.get('/:nombre/asignaturas', usuarioController_1.obtenerIdUsuarioPorNombre); // Obtener ID de usuario por nombre
// Otros métodos PUT y DELETE que dependen de los parámetros
router.put('/:nombre/asignaturas', usuarioController_1.asignarAsignaturasAUsuario);
router.put('/:_id', usuarioController_1.actualizarUsuarioPorId);
router.put('/:nombre/asignaturas/actualizar', usuarioController_1.actualizarAsignaturasUsuarioPorNombre);
router.put('/:usuarioId/asignaturas/:asignaturaId', usuarioController_1.asignarAsignaturaAUsuarioPorId);
router.put('/:_id/edad', usuarioController_1.modificarEdadUsuarioPorId);
router.put('/:_id/email', usuarioController_1.modificarEmailUsuarioPorId);
router.put('/:_id/nombre', usuarioController_1.modificarNombreUsuarioPorId);
router.put('/:_id/password', usuarioController_1.modificarPasswordUsuarioPorId);
router.put('/:_id/rol', usuarioController_1.modificarRolUsuarioPorId);
router.delete('/:usuarioId/asignaturas/:asignaturaId', usuarioController_1.eliminarAsignaturaDeUsuarioPorId);
router.delete('/:nombre/asignaturas/:asignaturaId', usuarioController_1.eliminarAsignaturaDeUsuarioPorNombre);
router.delete('/:usuarioId', usuarioController_1.eliminarUsuarioPorId);
exports.default = router;
//# sourceMappingURL=usuarioRoutes.js.map