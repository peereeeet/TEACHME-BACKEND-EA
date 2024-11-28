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
const asignaturaController_1 = require("../controller/asignaturaController");
const verifyJWT_1 = require("../middleware/verifyJWT");
const verifyAdmin_1 = require("../middleware/verifyAdmin");
const router = express.Router();
////////////////////////////////////POSTS/////////////////////////////////////
router.post('/', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, asignaturaController_1.crearAsignatura); // Solo administradores pueden crear asignaturas
router.get('/paginacion', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, asignaturaController_1.obtenerAsignaturasPaginadas); // Paginación protegida por autenticación
////////////////////////////////////GETS/////////////////////////////////////
//router.get('/', TokenValidation, listarAsignaturas); // Listar asignaturas protegido
router.get('/', asignaturaController_1.listarAsignaturas); // Listar asignaturas protegido
router.get('/:_id', verifyJWT_1.TokenValidation, asignaturaController_1.verAsignaturaPorId); // Obtener asignatura por ID protegido
router.get('/:nombre', verifyJWT_1.TokenValidation, asignaturaController_1.verAsignaturaPorNombre); // Obtener asignatura por nombre protegido
////////////////////////////////////PUTS/////////////////////////////////////
router.put('/:nombre/usuario', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, asignaturaController_1.asignarUsuariosAAsignaturaPorNombre); // Asignar usuarios a asignaturas (nombre)
router.put('/:_id/usuario', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, asignaturaController_1.asignarUsuariosAAsignaturaPorId); // Asignar usuarios a asignaturas (ID)
////////////////////////////////////DELETES/////////////////////////////////////
router.delete('/:_id', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, asignaturaController_1.eliminarAsignaturaPorId); // Solo administradores pueden eliminar asignaturas
router.delete('/:nombre', verifyJWT_1.TokenValidation, verifyAdmin_1.AdminValidation, asignaturaController_1.eliminarAsignaturaPorNombre); // Solo administradores pueden eliminar asignaturas por nombre
exports.default = router;
//# sourceMappingURL=asignaturaRoutes.js.map