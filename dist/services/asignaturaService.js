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
exports.actualizarProfesoresAsignaturaPorNombre = exports.eliminarProfesoresAsignaturaPorNombre = exports.eliminarAsignaturaPorNombre = exports.asignarProfesoresAAsignatura = exports.verAsignaturaPorNombre = exports.listarAsignaturas = exports.crearAsignatura = void 0;
const asignatura_1 = __importDefault(require("../models/asignatura"));
const profesor_1 = __importDefault(require("../models/profesor"));
/////////////////////////////////////CREAR NUEVA ASIGNATURA//////////////////////////////////////////
const crearAsignatura = (nombre, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const asignatura = new asignatura_1.default({ nombre, descripcion });
    return yield asignatura.save();
});
exports.crearAsignatura = crearAsignatura;
/////////////////////////////////// LISTAR TODAS LAS ASIGNATURAS/////////////////////////////////////
const listarAsignaturas = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield asignatura_1.default.find().populate('profesores');
});
exports.listarAsignaturas = listarAsignaturas;
//////////////////////////////////////VER ASIGNATURA POR NOMBRE///////////////////////////////////////
const verAsignaturaPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield asignatura_1.default.findOne({ nombre }).populate('profesores');
});
exports.verAsignaturaPorNombre = verAsignaturaPorNombre;
//////////////////////////////////////ASIGNAR PROFESORES A ASIGNATURA///////////////////////////////////////
const asignarProfesoresAAsignatura = (nombreAsignatura, nombresProfesores) => __awaiter(void 0, void 0, void 0, function* () {
    const asignatura = yield asignatura_1.default.findOne({ nombre: nombreAsignatura });
    if (!asignatura) {
        throw new Error('Asignatura no encontrada');
    }
    const profesores = yield profesor_1.default.find({ nombre: { $in: nombresProfesores } });
    if (profesores.length === 0) {
        throw new Error('Profesores no encontrados');
    }
    profesores.forEach(profesor => asignatura.profesores.push(profesor._id));
    yield asignatura.save();
    return asignatura;
});
exports.asignarProfesoresAAsignatura = asignarProfesoresAAsignatura;
//////////////////////////////////////ELIMINAR ASIGNATURA POR NOMBRE///////////////////////////////////////
const eliminarAsignaturaPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield asignatura_1.default.findOneAndDelete({ nombre });
    return resultado;
});
exports.eliminarAsignaturaPorNombre = eliminarAsignaturaPorNombre;
//////////////////////////////////////ELIMINAR PROFESORES DE ASIGNATURA POR NOMBRE///////////////////////
const eliminarProfesoresAsignaturaPorNombre = (nombreAsignatura, nombresProfesores) => __awaiter(void 0, void 0, void 0, function* () {
    const asignatura = yield asignatura_1.default.findOne({ nombre: nombreAsignatura });
    if (!asignatura) {
        throw new Error('Asignatura no encontrada');
    }
    const profesores = yield profesor_1.default.find({ nombre: { $in: nombresProfesores } });
    if (profesores.length === 0) {
        throw new Error('Profesores no encontrados');
    }
    asignatura.profesores = asignatura.profesores.filter(profesor => !profesores.map(p => p._id).includes(profesor));
    yield asignatura.save();
    return asignatura;
});
exports.eliminarProfesoresAsignaturaPorNombre = eliminarProfesoresAsignaturaPorNombre;
//////////////////////////////////////ACTUALIZAR PROFESORES DE ASIGNATURA POR NOMBRE///////////////////////
const actualizarProfesoresAsignaturaPorNombre = (nombreAsignatura, nuevosProfesores) => __awaiter(void 0, void 0, void 0, function* () {
    const asignatura = yield asignatura_1.default.findOne({ nombre: nombreAsignatura });
    if (!asignatura) {
        throw new Error('Asignatura no encontrada');
    }
    const profesores = yield profesor_1.default.find({ nombre: { $in: nuevosProfesores } });
    if (profesores.length === 0) {
        throw new Error('Profesores no encontrados');
    }
    asignatura.profesores = profesores.map(profesor => profesor._id);
    yield asignatura.save();
    return asignatura;
});
exports.actualizarProfesoresAsignaturaPorNombre = actualizarProfesoresAsignaturaPorNombre;
//# sourceMappingURL=asignaturaService.js.map