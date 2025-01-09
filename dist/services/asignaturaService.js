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
exports.obtenerAsignaturasPaginadas = exports.eliminarAsignaturaPorNombre = exports.eliminarAsignaturaPorId = exports.verAsignaturaPorNombre = exports.verAsignaturaPorId = exports.listarAsignaturas = exports.modificarNombreAsignaturaPorId = exports.crearAsignatura = void 0;
const asignatura_1 = __importDefault(require("../models/asignatura"));
/////////////////////////////////////CREAR NUEVA ASIGNATURA//////////////////////////////////////////
const crearAsignatura = (nombre, nivel) => __awaiter(void 0, void 0, void 0, function* () {
    const asignatura = new asignatura_1.default({ nombre, nivel });
    return yield asignatura.save();
});
exports.crearAsignatura = crearAsignatura;
////////////////////////////////////MODIFICAR NOMBRE ASIGNATURA POR ID////////////////////////////
const modificarNombreAsignaturaPorId = (_id, nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield asignatura_1.default.findByIdAndUpdate(_id, { nombre }, { new: true });
});
exports.modificarNombreAsignaturaPorId = modificarNombreAsignaturaPorId;
/////////////////////////////////// LISTAR TODAS LAS ASIGNATURAS/////////////////////////////////////
const listarAsignaturas = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield asignatura_1.default.find();
});
exports.listarAsignaturas = listarAsignaturas;
//////////////////////////////////////VER ASIGNATURA POR NOMBRE E ID///////////////////////////////////////
const verAsignaturaPorId = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield asignatura_1.default.findById(_id);
});
exports.verAsignaturaPorId = verAsignaturaPorId;
const verAsignaturaPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield asignatura_1.default.findOne({ nombre });
});
exports.verAsignaturaPorNombre = verAsignaturaPorNombre;
//////////////////////////////////////ELIMINAR ASIGNATURA POR NOMBRE E ID//////////////////////
const eliminarAsignaturaPorId = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield asignatura_1.default.findByIdAndDelete(_id);
});
exports.eliminarAsignaturaPorId = eliminarAsignaturaPorId;
const eliminarAsignaturaPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield asignatura_1.default.findOneAndDelete({ nombre });
});
exports.eliminarAsignaturaPorNombre = eliminarAsignaturaPorNombre;
//////////////////////////////////////OBTENER ASIGNATURAS PAGINADAS//////////////////////////////////////
const obtenerAsignaturasPaginadas = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    const asignaturas = yield asignatura_1.default.find().skip(skip).limit(limit);
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