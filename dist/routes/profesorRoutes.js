"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const profesorService_1 = require("../services/profesorService");
const router = (0, express_1.Router)();
// Middleware para habilitar CORS
router.use((0, cors_1.default)());
// Crear un nuevo profesor
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, edad } = req.body;
        const profesor = yield (0, profesorService_1.crearProfesor)(nombre, edad);
        res.status(201).json(profesor);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
}));
// Listar todos los profesores
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profesores = yield (0, profesorService_1.listarProfesores)();
        res.status(200).json(profesores);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
}));
// Ver un profesor por nombre
router.get('/:nombre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const profesor = yield (0, profesorService_1.verProfesorPorNombre)(nombre);
        if (!profesor) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }
        res.status(200).json(profesor);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
}));
// Asignar asignaturas a un profesor
router.put('/:nombre/asignaturas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const { nombresAsignaturas } = req.body;
        const profesor = yield (0, profesorService_1.asignarAsignaturasAProfesor)(nombre, nombresAsignaturas);
        res.status(200).json(profesor);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
}));
// Eliminar un profesor por nombre
router.delete('/:nombre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const resultado = yield (0, profesorService_1.eliminarProfesorPorNombre)(nombre);
        if (!resultado) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }
        // Devuelve 204 No Content ya que el profesor fue eliminado
        res.status(204).send();
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
}));
// Actualizar asignaturas de un profesor por nombre
router.put('/:nombre/asignaturas/actualizar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const { nuevasAsignaturas } = req.body;
        const profesor = yield (0, profesorService_1.actualizarAsignaturasProfesorPorNombre)(nombre, nuevasAsignaturas);
        res.status(200).json(profesor);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
}));
exports.default = router;
//# sourceMappingURL=profesorRoutes.js.map