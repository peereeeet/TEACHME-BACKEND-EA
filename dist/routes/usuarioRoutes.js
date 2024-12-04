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
const app_1 = require("../app");
const router = express.Router();
router.get('/conectados', verifyJWT_1.TokenValidation, usuarioController_1.obtenerUsuariosConectados);
router.post('/simular-conexion', verifyJWT_1.TokenValidation, (req, res) => {
    const { userId } = req.body; // Obtén el ID del usuario del cuerpo de la petición
    const socketId = `fake-socket-${userId}`; // Crea un socket ID simulado
    app_1.connectedUsers.set(userId, socketId); // Añade al mapa de usuarios conectados
    console.log(`Usuario ${userId} conectado (simulado).`);
    res.status(200).json({ message: 'Usuario conectado simulado', usuariosConectados: Array.from(app_1.connectedUsers.keys()) });
});
router.post('/simular-desconexion', verifyJWT_1.TokenValidation, (req, res) => {
    const { userId } = req.body; // Obtén el ID del usuario del cuerpo de la petición
    if (app_1.connectedUsers.has(userId)) {
        app_1.connectedUsers.delete(userId); // Elimina del mapa de usuarios conectados
        console.log(`Usuario ${userId} desconectado (simulado).`);
        res.status(200).json({ message: 'Usuario desconectado simulado', usuariosConectados: Array.from(app_1.connectedUsers.keys()) });
    }
    else {
        res.status(404).json({ error: 'Usuario no encontrado entre los conectados' });
    }
});
////////////////////////////////////RUTAS SIN PARÁMETROS/////////////////////////////////////
router.post('/', usuarioController_1.crearUsuario); // Crear usuario sin protección para permitir registro inicial
router.post('/login', usuarioController_1.loginUsuario); // Login no protegido
router.get('/listar-paginados', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.obtenerUsuariosPaginados); // Solo admin
//router.get('/', TokenValidation, AdminValidation, listarUsuarios); // Solo admin
router.get('/', verifyJWT_1.TokenValidation, usuarioController_1.listarUsuarios); // Solo admin
//router.get('/conectados', TokenValidation, obtenerUsuariosConectados);
router.get('/:id', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.verUsuarioPorId);
////////////////////////////////////RUTAS CON PARÁMETROS DINÁMICOS/////////////////////////////////////
//router.get('/:usuarioId/asignaturas', TokenValidation, obtenerAsignaturasDelUsuario); // Ver asignaturas de un usuario
//router.get('/:usuarioId/asignaturas/paginacion', TokenValidation, AdminValidation, obtenerAsignaturasPaginadasDeUsuario); // Paginación de asignaturas
router.get('/:usuarioId/asignaturas', usuarioController_1.obtenerAsignaturasDelUsuario); // Ver asignaturas de un usuario
router.get('/:usuarioId/asignaturas/paginacion', usuarioController_1.obtenerAsignaturasPaginadasDeUsuario); // Paginación de asignaturas
router.get('/:nombre', verifyJWT_1.TokenValidation, usuarioController_1.verUsuarioPorNombre); // Ver usuario por nombre
router.get('/:nombre/asignaturas', verifyJWT_1.TokenValidation, usuarioController_1.obtenerIdUsuarioPorNombre); // Obtener ID de usuario por nombre
// Otros métodos PUT y DELETE que dependen de los parámetros
router.put('/:nombre/asignaturas', verifyJWT_1.TokenValidation, usuarioController_1.asignarAsignaturasAUsuario); // Asignar asignaturas
router.put('/:_id', verifyJWT_1.TokenValidation, verifyOwner_1.verifyOwnership, usuarioController_1.actualizarUsuarioPorId); // Actualizar datos propios
router.put('/:nombre/asignaturas/actualizar', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.actualizarAsignaturasUsuarioPorNombre); // Solo admin
router.put('/:usuarioId/asignaturas/:asignaturaId', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.asignarAsignaturaAUsuarioPorId); // Asignar asignatura a usuario
router.put('/:_id/edad', verifyJWT_1.TokenValidation, verifyOwner_1.verifyOwnership, usuarioController_1.modificarEdadUsuarioPorId); // Modificar edad propio
router.put('/:_id/email', verifyJWT_1.TokenValidation, verifyOwner_1.verifyOwnership, usuarioController_1.modificarEmailUsuarioPorId); // Modificar email propio
router.put('/:_id/nombre', verifyJWT_1.TokenValidation, verifyOwner_1.verifyOwnership, usuarioController_1.modificarNombreUsuarioPorId); // Modificar nombre propio
router.put('/:_id/password', verifyJWT_1.TokenValidation, verifyOwner_1.verifyOwnership, usuarioController_1.modificarPasswordUsuarioPorId); // Modificar contraseña
router.put('/:_id/rol', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.modificarRolUsuarioPorId); // Solo admin
router.delete('/:usuarioId/asignaturas/:asignaturaId', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.eliminarAsignaturaDeUsuarioPorId); // Eliminar asignatura propia
router.delete('/:nombre/asignaturas/:asignaturaId', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.eliminarAsignaturaDeUsuarioPorNombre); // Solo admin
router.delete('/:usuarioId', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, usuarioController_1.eliminarUsuarioPorId); // Solo admin
exports.default = router;
//# sourceMappingURL=usuarioRoutes.js.map