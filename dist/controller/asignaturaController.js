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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asignaturaService_1 = require("../services/asignaturaService");
const router = (0, express_1.Router)();
// Crear una nueva asignatura
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion } = req.body;
        const asignatura = yield (0, asignaturaService_1.crearAsignatura)(nombre, descripcion);
        res.status(201).json(asignatura);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
}));
// Listar todas las asignaturas
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asignaturas = yield (0, asignaturaService_1.listarAsignaturas)();
        res.status(200).json(asignaturas);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
}));
// Ver una asignatura por nombre
router.get('/:nombre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const asignatura = yield (0, asignaturaService_1.verAsignaturaPorNombre)(nombre);
        if (!asignatura) {
            return res.status(404).json({ error: 'Asignatura no encontrada' });
        }
        res.status(200).json(asignatura);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
}));
// Asignar profesores a una asignatura
router.put('/:nombre/asignar-profesores', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const { nombresProfesores } = req.body;
        const asignatura = yield (0, asignaturaService_1.asignarProfesoresAAsignatura)(nombre, nombresProfesores);
        res.status(200).json(asignatura);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
}));
// Eliminar una asignatura por nombre
router.delete('/:nombre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const resultado = yield (0, asignaturaService_1.eliminarAsignaturaPorNombre)(nombre);
        if (!resultado) {
            return res.status(404).json({ error: 'Asignatura no encontrada' });
        }
        res.status(204).send(); // No hay contenido que devolver
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
}));
// Actualizar profesores de una asignatura por nombre
router.put('/:nombre/actualizar-profesores', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const { nuevosProfesores } = req.body;
        const asignatura = yield (0, asignaturaService_1.actualizarProfesoresAsignaturaPorNombre)(nombre, nuevosProfesores);
        res.status(200).json(asignatura);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
}));
exports.default = router;
//# sourceMappingURL=asignaturaController.js.map