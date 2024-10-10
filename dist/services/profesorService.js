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
exports.actualizarAsignaturasProfesorPorNombre = exports.eliminarProfesorPorNombre = exports.asignarAsignaturasAProfesor = exports.verProfesorPorNombre = exports.listarProfesores = exports.crearProfesor = void 0;
const profesor_1 = __importDefault(require("../models/profesor"));
const asignatura_1 = __importDefault(require("../models/asignatura"));
// Crear un nuevo profesor
const crearProfesor = (nombre, edad) => __awaiter(void 0, void 0, void 0, function* () {
    const profesor = new profesor_1.default({ nombre, edad });
    return yield profesor.save();
});
exports.crearProfesor = crearProfesor;
// Listar todos los profesores
const listarProfesores = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield profesor_1.default.find().populate('asignaturasImparte');
});
exports.listarProfesores = listarProfesores;
// Ver un profesor por nombre
const verProfesorPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield profesor_1.default.findOne({ nombre }).populate('asignaturasImparte');
});
exports.verProfesorPorNombre = verProfesorPorNombre;
// Asignar asignaturas a un profesor
const asignarAsignaturasAProfesor = (nombreProfesor, nombresAsignaturas) => __awaiter(void 0, void 0, void 0, function* () {
    const profesor = yield profesor_1.default.findOne({ nombre: nombreProfesor });
    if (!profesor) {
        throw new Error('Profesor no encontrado');
    }
    const asignaturas = yield asignatura_1.default.find({ nombre: { $in: nombresAsignaturas } });
    if (asignaturas.length === 0) {
        throw new Error('Asignaturas no encontradas');
    }
    asignaturas.forEach(asignatura => profesor.asignaturasImparte.push(asignatura._id));
    yield profesor.save();
    return profesor;
});
exports.asignarAsignaturasAProfesor = asignarAsignaturasAProfesor;
// Eliminar un profesor por nombre
const eliminarProfesorPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield profesor_1.default.findOneAndDelete({ nombre });
    return resultado;
});
exports.eliminarProfesorPorNombre = eliminarProfesorPorNombre;
// Actualizar las asignaturas de un profesor por nombre
const actualizarAsignaturasProfesorPorNombre = (nombreProfesor, nuevasAsignaturas) => __awaiter(void 0, void 0, void 0, function* () {
    const profesor = yield profesor_1.default.findOne({ nombre: nombreProfesor });
    if (!profesor) {
        throw new Error('Profesor no encontrado');
    }
    const asignaturas = yield asignatura_1.default.find({ nombre: { $in: nuevasAsignaturas } });
    if (asignaturas.length === 0) {
        throw new Error('Asignaturas no encontradas');
    }
    profesor.asignaturasImparte = asignaturas.map(asignatura => asignatura._id);
    yield profesor.save();
    return profesor;
});
exports.actualizarAsignaturasProfesorPorNombre = actualizarAsignaturasProfesorPorNombre;
//# sourceMappingURL=profesorService.js.map