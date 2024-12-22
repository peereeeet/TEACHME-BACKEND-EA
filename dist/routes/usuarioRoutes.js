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
const verifyJWT_1 = require("../middleware/verifyJWT");
const verifyAdmin_1 = require("../middleware/verifyAdmin");
const verifyOwner_1 = require("../middleware/verifyOwner");
const router = express.Router();
// Rutas sin parámetros
router.post('/', usuarioController_1.crearUsuario); // Crear usuario sin protección para registro inicial
router.post('/login', usuarioController_1.loginUsuario); // Login sin protección
router.put('/:id/rol', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.asignarRolUsuarioPorId);
router.get('/listar-paginados', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.obtenerUsuariosPaginados); // Listar usuarios paginados (solo admin)
router.get('/buscar', verifyJWT_1.TokenValidation, usuarioController_1.buscarUsuarios); // Buscar usuarios por nombre
router.get('/coordenadas', verifyJWT_1.TokenValidation, usuarioController_1.obtenerCoordenadasUsuarios); // Obtener coordenadas de usuarios
router.get('/conectados', verifyJWT_1.TokenValidation, usuarioController_1.obtenerUsuariosConectados); // Ver usuarios conectados
// Rutas con parámetros dinámicos
router.get('/:id', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.verUsuarioPorId); // Ver usuario por ID
router.get('/:nombre', verifyJWT_1.TokenValidation, usuarioController_1.verUsuarioPorNombre); // Ver usuario por nombre
router.get('/:nombre/asignaturas', verifyJWT_1.TokenValidation, usuarioController_1.obtenerIdUsuarioPorNombre); // Obtener ID de usuario por nombre
router.get('/:usuarioId/asignaturas', verifyJWT_1.TokenValidation, usuarioController_1.obtenerAsignaturasDelUsuario); // Ver asignaturas de un usuario
router.get('/:usuarioId/asignaturas/paginacion', verifyJWT_1.TokenValidation, usuarioController_1.obtenerAsignaturasPaginadasDeUsuario); // Paginación de asignaturas
// Métodos PUT
router.put('/:nombre/asignaturas', verifyJWT_1.TokenValidation, usuarioController_1.asignarAsignaturasAUsuario); // Asignar asignaturas a un usuario por nombre
router.put('/:_id', verifyJWT_1.TokenValidation, verifyOwner_1.verifyOwnership, usuarioController_1.actualizarUsuarioPorId); // Actualizar datos propios
router.put('/:nombre/asignaturas/actualizar', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.actualizarAsignaturasUsuarioPorNombre); // Actualizar asignaturas (solo admin)
router.put('/:usuarioId/asignaturas/:asignaturaId', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.asignarAsignaturaAUsuarioPorId); // Asignar asignatura por ID
router.put('/:_id/edad', verifyJWT_1.TokenValidation, verifyOwner_1.verifyOwnership, usuarioController_1.modificarEdadUsuarioPorId); // Modificar edad
router.put('/:_id/email', verifyJWT_1.TokenValidation, verifyOwner_1.verifyOwnership, usuarioController_1.modificarEmailUsuarioPorId); // Modificar email
router.put('/:_id/nombre', verifyJWT_1.TokenValidation, verifyOwner_1.verifyOwnership, usuarioController_1.modificarNombreUsuarioPorId); // Modificar nombre
router.put('/:_id/password', verifyJWT_1.TokenValidation, verifyOwner_1.verifyOwnership, usuarioController_1.modificarPasswordUsuarioPorId); // Modificar contraseña
router.put('/:_id/rol', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.modificarRolUsuarioPorId); // Modificar rol (solo admin)
// Métodos DELETE
router.delete('/:usuarioId', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.eliminarUsuarioPorId); // Eliminar usuario (solo admin)
router.delete('/:nombre/asignaturas/:asignaturaId', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.eliminarAsignaturaDeUsuarioPorNombre); // Eliminar asignatura por nombre (solo admin)
router.delete('/:usuarioId/asignaturas/:asignaturaId', verifyJWT_1.TokenValidation, usuarioController_1.eliminarAsignaturaDeUsuarioPorId); // Eliminar asignatura por ID
exports.default = router;
//# sourceMappingURL=usuarioRoutes.js.map