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
exports.obtenerAsignaturasPaginadas = exports.eliminarAsignaturaPorNombre = exports.eliminarAsignaturaPorId = exports.asignarUsuariosAAsignaturaPorId = exports.asignarUsuariosAAsignaturaPorNombre = exports.verAsignaturaPorNombre = exports.verAsignaturaPorId = exports.listarAsignaturas = exports.modificarDescripcionAsignaturaPorId = exports.modificarNombreAsignaturaPorId = exports.crearAsignatura = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const asignatura_1 = __importDefault(require("../models/asignatura"));
const usuario_1 = __importDefault(require("../models/usuario"));
/////////////////////////////////////CREAR NUEVA ASIGNATURA//////////////////////////////////////////
const crearAsignatura = (nombre, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const asignatura = new asignatura_1.default({ nombre, descripcion });
    return yield asignatura.save();
});
exports.crearAsignatura = crearAsignatura;
////////////////////////////////////MODIFICAR NOMBRE ASIGNATURA POR ID////////////////////////////
const modificarNombreAsignaturaPorId = (_id, nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield asignatura_1.default.findByIdAndUpdate(_id, { nombre }, { new: true });
});
exports.modificarNombreAsignaturaPorId = modificarNombreAsignaturaPorId;
////////////////////////////////////MODIFICAR DESCRIPCION ASIGNATURA POR ID////////////////////////////
const modificarDescripcionAsignaturaPorId = (_id, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    return yield asignatura_1.default.findByIdAndUpdate(_id, { descripcion }, { new: true });
});
exports.modificarDescripcionAsignaturaPorId = modificarDescripcionAsignaturaPorId;
/////////////////////////////////// LISTAR TODAS LAS ASIGNATURAS/////////////////////////////////////
const listarAsignaturas = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield asignatura_1.default.find().populate('usuarios');
});
exports.listarAsignaturas = listarAsignaturas;
//////////////////////////////////////VER ASIGNATURA POR NOMBRE E ID///////////////////////////////////////
const verAsignaturaPorId = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield asignatura_1.default.findOne({ _id }).populate('usuarios');
});
exports.verAsignaturaPorId = verAsignaturaPorId;
const verAsignaturaPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield asignatura_1.default.findOne({ nombre }).populate('usuarios');
});
exports.verAsignaturaPorNombre = verAsignaturaPorNombre;
//////////////////////////////////////ASIGNAR USUARIOS A ASIGNATURA POR NOMBRE E ID//////////////////////
const asignarUsuariosAAsignaturaPorNombre = (nombreAsignatura, nombresUsuarios) => __awaiter(void 0, void 0, void 0, function* () {
    const asignatura = yield asignatura_1.default.findOne({ nombre: nombreAsignatura });
    if (!asignatura) {
        throw new Error('Asignatura no encontrada');
    }
    const usuarios = yield usuario_1.default.find({ nombre: { $in: nombresUsuarios } });
    if (usuarios.length === 0) {
        throw new Error('Usuarios no encontrados');
    }
    asignatura.usuarios = asignatura.usuarios.concat(usuarios.map(u => u._id));
    yield asignatura.save();
    return asignatura;
});
exports.asignarUsuariosAAsignaturaPorNombre = asignarUsuariosAAsignaturaPorNombre;
const asignarUsuariosAAsignaturaPorId = (_id, nombresUsuarios) => __awaiter(void 0, void 0, void 0, function* () {
    const asignatura = yield asignatura_1.default.findById(_id);
    if (!asignatura) {
        throw new Error('Asignatura no encontrada');
    }
    const usuarios = yield usuario_1.default.find({ nombre: { $in: nombresUsuarios } });
    if (usuarios.length === 0) {
        throw new Error('Usuarios no encontrados');
    }
    asignatura.usuarios = asignatura.usuarios.concat(usuarios.map(u => u._id));
    yield asignatura.save();
    return asignatura;
});
exports.asignarUsuariosAAsignaturaPorId = asignarUsuariosAAsignaturaPorId;
const eliminarAsignaturaPorId = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongoose_1.default.Types.ObjectId(_id);
        const resultado = yield asignatura_1.default.findByIdAndDelete(objectId);
        return resultado;
    }
    catch (error) {
        console.error("Error en eliminarAsignaturaPorId:", error);
        throw error;
    }
});
exports.eliminarAsignaturaPorId = eliminarAsignaturaPorId;
const eliminarAsignaturaPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield asignatura_1.default.findOneAndDelete({ nombre });
    return resultado;
});
exports.eliminarAsignaturaPorNombre = eliminarAsignaturaPorNombre;
const obtenerAsignaturasPaginadas = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    const asignaturas = yield asignatura_1.default.find()
        .skip(skip)
        .limit(limit);
    const total = yield asignatura_1.default.countDocuments();
    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        asignaturas,
    };
});
exports.obtenerAsignaturasPaginadas = obtenerAsignaturasPaginadas;
//# sourceMappingURL=asignaturaService.js.map