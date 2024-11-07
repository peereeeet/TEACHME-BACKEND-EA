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
exports.eliminarAsignaturaDeUsuarioPorId = exports.asignarAsignaturaAUsuarioPorId = exports.eliminarAsignaturaDeUsuarioPorNombre = exports.actualizarAsignaturasUsuarioPorNombre = exports.eliminarUsuarioPorId = exports.actualizarUsuarioPorId = exports.asignarAsignaturasAUsuario = exports.verUsuarioPorNombre = exports.listarUsuarios = exports.crearUsuario = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usuario_1 = __importDefault(require("../models/usuario"));
const asignatura_1 = __importDefault(require("../models/asignatura"));
const crearUsuario = (nombre_1, edad_1, email_1, password_1, ...args_1) => __awaiter(void 0, [nombre_1, edad_1, email_1, password_1, ...args_1], void 0, function* (nombre, edad, email, password, isProfesor = false, isAlumno = false, isAdmin = false) {
    const usuario = new usuario_1.default({ nombre, edad, email, password, isProfesor, isAlumno, isAdmin });
    return yield usuario.save();
});
exports.crearUsuario = crearUsuario;
const listarUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.find().populate('asignaturasImparte');
});
exports.listarUsuarios = listarUsuarios;
const verUsuarioPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findOne({ nombre }).populate('asignaturasImparte');
});
exports.verUsuarioPorNombre = verUsuarioPorNombre;
const asignarAsignaturasAUsuario = (nombre, asignaturas) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ nombre });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    const asignaturasEncontradas = yield asignatura_1.default.find({ nombre: { $in: asignaturas } });
    usuario.asignaturasImparte = asignaturasEncontradas.map(asignatura => asignatura._id);
    return yield usuario.save();
});
exports.asignarAsignaturasAUsuario = asignarAsignaturasAUsuario;
const actualizarUsuarioPorId = (id, datos) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(id, datos, { new: true });
});
exports.actualizarUsuarioPorId = actualizarUsuarioPorId;
const eliminarUsuarioPorId = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findOneAndDelete({ _id });
});
exports.eliminarUsuarioPorId = eliminarUsuarioPorId;
const actualizarAsignaturasUsuarioPorNombre = (nombre, asignaturas) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ nombre });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    const asignaturasEncontradas = yield asignatura_1.default.find({ nombre: { $in: asignaturas } });
    usuario.asignaturasImparte = asignaturasEncontradas.map(asignatura => asignatura._id);
    return yield usuario.save();
});
exports.actualizarAsignaturasUsuarioPorNombre = actualizarAsignaturasUsuarioPorNombre;
const eliminarAsignaturaDeUsuarioPorNombre = (nombre, asignaturaId) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ nombre });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    usuario.asignaturasImparte = usuario.asignaturasImparte.filter(id => id.toString() !== asignaturaId);
    return yield usuario.save();
});
exports.eliminarAsignaturaDeUsuarioPorNombre = eliminarAsignaturaDeUsuarioPorNombre;
// Función para agregar una asignatura a un usuario por _id
const asignarAsignaturaAUsuarioPorId = (usuarioId, asignaturaId) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioObjectId = new mongoose_1.default.Types.ObjectId(usuarioId);
    const asignaturaObjectId = new mongoose_1.default.Types.ObjectId(asignaturaId);
    const usuario = yield usuario_1.default.findById(usuarioObjectId);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    if (!usuario.asignaturasImparte.includes(asignaturaObjectId)) {
        usuario.asignaturasImparte.push(asignaturaObjectId);
    }
    return yield usuario.save();
});
exports.asignarAsignaturaAUsuarioPorId = asignarAsignaturaAUsuarioPorId;
// Función para eliminar una asignatura de un usuario por _id
const eliminarAsignaturaDeUsuarioPorId = (usuarioId, asignaturaId) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioObjectId = new mongoose_1.default.Types.ObjectId(usuarioId);
    const asignaturaObjectId = new mongoose_1.default.Types.ObjectId(asignaturaId);
    const usuario = yield usuario_1.default.findById(usuarioObjectId);
    if (!usuario) {
        throw new Error('Usuario no encontrado' + usuarioObjectId);
    }
    usuario.asignaturasImparte = usuario.asignaturasImparte.filter(id => id.toString() !== asignaturaObjectId.toString());
    return yield usuario.save();
});
exports.eliminarAsignaturaDeUsuarioPorId = eliminarAsignaturaDeUsuarioPorId;
//# sourceMappingURL=usuarioService.js.map