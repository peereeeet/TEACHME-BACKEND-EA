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
const usuarioService_1 = require("../services/usuarioService");
const router = (0, express_1.Router)();
router.use((0, cors_1.default)());
// Crear un nuevo usuario
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, edad, email, password, isProfesor, isAlumno, isAdmin } = req.body;
        const usuario = yield (0, usuarioService_1.crearUsuario)(nombre, edad, email, password, isProfesor, isAlumno, isAdmin);
        res.status(201).json(usuario);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Listar todos los usuarios
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield (0, usuarioService_1.listarUsuarios)();
        res.status(200).json(usuarios);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Ver usuario por nombre
router.get('/:nombre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield (0, usuarioService_1.verUsuarioPorNombre)(req.params.nombre);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Asignar asignaturas a un usuario
router.put('/:nombre/asignaturas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield (0, usuarioService_1.asignarAsignaturasAUsuario)(req.params.nombre, req.body.asignaturas);
        res.status(200).json(usuario);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Actualizar usuario por ID
router.put('/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield (0, usuarioService_1.actualizarUsuarioPorId)(req.params._id, req.body);
        res.status(200).json(usuario);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Eliminar usuario por nombre
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield (0, usuarioService_1.eliminarUsuarioPorId)(req.params.id);
        res.status(200).json(usuario);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Actualizar asignaturas de un usuario por nombre
router.put('/:nombre/asignaturas/actualizar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield (0, usuarioService_1.actualizarAsignaturasUsuarioPorNombre)(req.params.nombre, req.body.asignaturas);
        res.status(200).json(usuario);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Eliminar una asignatura de un usuario por nombre
router.delete('/:nombre/asignaturas/:asignaturaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield (0, usuarioService_1.eliminarAsignaturaDeUsuarioPorNombre)(req.params.nombre, req.params.asignaturaId);
        res.status(200).json(usuario);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Ruta para agregar asignatura a un usuario por _id
router.put('/:usuarioId/asignaturas/:asignaturaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield (0, usuarioService_1.asignarAsignaturaAUsuarioPorId)(req.params.usuarioId, req.params.asignaturaId);
        res.status(200).json(usuario);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Ruta para eliminar asignatura de un usuario por _id
router.delete('/:usuarioId/asignaturas/:asignaturaId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield (0, usuarioService_1.eliminarAsignaturaDeUsuarioPorId)(req.params.usuarioId, req.params.asignaturaId);
        res.status(200).json(usuario);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=usuarioController.js.map