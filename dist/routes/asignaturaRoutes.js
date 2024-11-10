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
const router = express.Router();
////////////////////////////////////POSTS/////////////////////////////////////
router.post('/', asignaturaController_1.crearAsignatura);
router.get('/paginacion', asignaturaController_1.obtenerAsignaturasPaginadas);
////////////////////////////////////GETS/////////////////////////////////////
router.get('/', asignaturaController_1.listarAsignaturas);
router.get('/:_id', asignaturaController_1.verAsignaturaPorId);
router.get('/:nombre', asignaturaController_1.verAsignaturaPorNombre);
////////////////////////////////////PUTS/////////////////////////////////////
router.put('/:nombre/usuario', asignaturaController_1.asignarUsuariosAAsignaturaPorNombre);
router.put('/:_id/usuario ', asignaturaController_1.asignarUsuariosAAsignaturaPorId);
////////////////////////////////////DELETES/////////////////////////////////////
router.delete('/:_id', asignaturaController_1.eliminarAsignaturaPorId);
router.delete('/:nombre', asignaturaController_1.eliminarAsignaturaPorNombre);
exports.default = router;
//# sourceMappingURL=asignaturaRoutes.js.map