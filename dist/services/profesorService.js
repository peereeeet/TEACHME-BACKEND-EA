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
exports.eliminarAsignaturaDeProfesorPorNombre = exports.eliminarProfesorPorNombre = exports.actualizarAsignaturasProfesorPorNombre = exports.actualizarProfesorPorId = exports.asignarAsignaturasAProfesor = exports.verProfesorPorNombre = exports.listarProfesores = exports.crearProfesor = void 0;
const profesor_1 = __importDefault(require("../models/profesor"));
const asignatura_1 = __importDefault(require("../models/asignatura"));
/////////////////////////////////////////CREAR PROFESOR////////////////////////////////////////
const crearProfesor = (nombre, edad) => __awaiter(void 0, void 0, void 0, function* () {
    const profesor = new profesor_1.default({ nombre, edad });
    return yield profesor.save();
});
exports.crearProfesor = crearProfesor;
/////////////////////////////////////////LISTAR PROFESORES//////////////////////////////////////
const listarProfesores = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield profesor_1.default.find().populate('asignaturasImparte');
});
exports.listarProfesores = listarProfesores;
/////////////////////////////////////////VER PROFESOR POR NOMBRE/////////////////////////////////////
const verProfesorPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield profesor_1.default.findOne({ nombre }).populate('asignaturasImparte');
});
exports.verProfesorPorNombre = verProfesorPorNombre;
/////////////////////////////////////////ASIGNAR ASIGNATURAS A PROFESOR/////////////////////////////////////
const asignarAsignaturasAProfesor = (nombreProfesor, nombresAsignaturas) => __awaiter(void 0, void 0, void 0, function* () {
    const profesor = yield profesor_1.default.findOne({ nombre: nombreProfesor });
    if (!profesor) {
        throw new Error('Profesor no encontrado');
    }
    console.log(`Profesor encontrado: ${JSON.stringify(profesor)}`);
    const asignaturas = yield asignatura_1.default.find({ nombre: { $in: nombresAsignaturas } });
    console.log(`Asignaturas encontradas: ${JSON.stringify(asignaturas)}`);
    if (asignaturas.length === 0) {
        throw new Error('Asignaturas no encontradas');
    }
    asignaturas.forEach(asignatura => {
        if (!profesor.asignaturasImparte.includes(asignatura._id)) {
            profesor.asignaturasImparte.push(asignatura._id);
        }
    });
    yield profesor.save();
    console.log(`Profesor actualizado: ${JSON.stringify(profesor)}`);
    return profesor;
});
exports.asignarAsignaturasAProfesor = asignarAsignaturasAProfesor;
/////////////////////////////////////////ACTUALIZAR PROFESOR/////////////////////////////////////
const actualizarProfesorPorId = (id, datosActualizados) => __awaiter(void 0, void 0, void 0, function* () {
    const profesor = yield profesor_1.default.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (!profesor) {
        throw new Error('Profesor no encontrado');
    }
    return profesor;
});
exports.actualizarProfesorPorId = actualizarProfesorPorId;
///////////////////////////////ACTUALIZAR ASIGNATURAS DE PROFESOR POR NOMBRE///////////////////////////
const actualizarAsignaturasProfesorPorNombre = (nombreProfesor, nuevasAsignaturas) => __awaiter(void 0, void 0, void 0, function* () {
    const profesor = yield profesor_1.default.findOne({ nombre: nombreProfesor });
    if (!profesor) {
        throw new Error('Profesor no encontrado');
    }
    const asignaturas = yield asignatura_1.default.find({ nombre: { $in: nuevasAsignaturas } });
    if (asignaturas.length === 0) {
        throw new Error('Asignaturas no encontradas');
    }
    yield profesor_1.default.findByIdAndUpdate(profesor._id, {
        asignaturasImparte: asignaturas.map(asignatura => asignatura._id)
    });
    console.log(`Asignaturas actualizadas para ${nombreProfesor}`);
});
exports.actualizarAsignaturasProfesorPorNombre = actualizarAsignaturasProfesorPorNombre;
/////////////////////////////////////ELIMINAR PROFESOR POR NOMBRE////////////////////////////////////////
const eliminarProfesorPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield profesor_1.default.findOneAndDelete({ nombre });
    return resultado;
});
exports.eliminarProfesorPorNombre = eliminarProfesorPorNombre;
/////////////////////////////////////////////ELIMINAR ASIGNATURA DE PROFESOR POR NOMBRE///////////////////////////////////
const eliminarAsignaturaDeProfesorPorNombre = (nombreProfesor, nombreAsignatura) => __awaiter(void 0, void 0, void 0, function* () {
    const profesor = yield profesor_1.default.findOne({ nombre: nombreProfesor });
    if (!profesor) {
        throw new Error('Profesor no encontrado');
    }
    const asignatura = yield asignatura_1.default.findOne({ nombre: nombreAsignatura });
    if (!asignatura) {
        throw new Error('Asignatura no encontrada');
    }
    yield profesor_1.default.findByIdAndUpdate(profesor._id, {
        asignaturasImparte: profesor.asignaturasImparte.filter(asignaturaId => asignaturaId.toString() !== asignatura._id.toString())
    });
    console.log(`Asignatura eliminada de ${nombreProfesor}`);
});
exports.eliminarAsignaturaDeProfesorPorNombre = eliminarAsignaturaDeProfesorPorNombre;
//# sourceMappingURL=profesorService.js.map