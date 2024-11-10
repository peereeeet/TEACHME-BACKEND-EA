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
exports.obtenerAsignaturasPaginadasDeUsuario = exports.modificarRolUsuarioPorId = exports.modificarPasswordUsuarioPorId = exports.modificarEmailUsuarioPorId = exports.modificarEdadUsuarioPorId = exports.modificarNombreUsuarioPorId = exports.eliminarAsignaturaDeUsuarioPorId = exports.eliminarAsignaturaDeUsuarioPorNombre = exports.eliminarUsuarioPorId = exports.actualizarAsignaturasUsuarioPorId = exports.actualizarAsignaturasUsuarioPorNombre = exports.actualizarUsuarioPorId = exports.asignarAsignaturaAUsuarioPorId = exports.asignarAsignaturasAUsuario = exports.verUsuarioPorId = exports.verUsuarioPorNombre = exports.obtenerAsignaturasDeUsuario = exports.obtenerIdUsuarioPorNombre = exports.obtenerUsuariosPaginados = exports.listarUsuarios = exports.crearUsuario = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usuario_1 = __importDefault(require("../models/usuario"));
const asignatura_1 = __importDefault(require("../models/asignatura"));
////////////////////////////////////////CREAR NUEVO USUARIO//////////////////////////////////////////
const crearUsuario = (nombre_1, edad_1, email_1, password_1, ...args_1) => __awaiter(void 0, [nombre_1, edad_1, email_1, password_1, ...args_1], void 0, function* (nombre, edad, email, password, isProfesor = false, isAlumno = false, isAdmin = false) {
    const usuario = new usuario_1.default({ nombre, edad, email, password, isProfesor, isAlumno, isAdmin });
    return yield usuario.save();
});
exports.crearUsuario = crearUsuario;
////////////////////////////////////////LISTAR USUARIOS//////////////////////////////////////////
const listarUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.find().populate('asignaturasImparte');
});
exports.listarUsuarios = listarUsuarios;
const obtenerUsuariosPaginados = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    const usuarios = yield usuario_1.default.find()
        .skip(skip)
        .limit(limit)
        .populate('asignaturasImparte');
    const total = yield usuario_1.default.countDocuments();
    return {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        usuarios,
    };
});
exports.obtenerUsuariosPaginados = obtenerUsuariosPaginados;
//OBTENER ID DE USUARIO POR NOMBRE
const obtenerIdUsuarioPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ nombre });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    return usuario._id;
});
exports.obtenerIdUsuarioPorNombre = obtenerIdUsuarioPorNombre;
const obtenerAsignaturasDeUsuario = (usuarioId) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findById(new mongoose_1.default.Types.ObjectId(usuarioId)).populate('asignaturasImparte');
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    return usuario.asignaturasImparte;
});
exports.obtenerAsignaturasDeUsuario = obtenerAsignaturasDeUsuario;
////////////////////////////////////////VER USUARIO POR ID Y POR NOMBRE///////////////////////////////////
const verUsuarioPorNombre = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(_id);
    const usuario = yield usuario_1.default.findOne({ _id }).populate('asignaturasImparte');
    console.log(usuario);
    return usuario;
});
exports.verUsuarioPorNombre = verUsuarioPorNombre;
const verUsuarioPorId = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findOne({ nombre }).populate('asignaturasImparte');
});
exports.verUsuarioPorId = verUsuarioPorId;
////////////////////////////////////////ASIGNAR ASIGNATURAS A USUARIO/////////////////////////////////
const asignarAsignaturasAUsuario = (nombre, asignaturas) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ nombre });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    const asignaturasEncontradas = yield asignatura_1.default.find({ nombre: { $in: asignaturas } });
    //algo de control de errores no viene mal xd
    if (asignaturasEncontradas.length !== asignaturas.length) {
        throw new Error('Algunas asignaturas no fueron encontradas');
    }
    usuario.asignaturasImparte = asignaturasEncontradas.map(asignatura => asignatura._id);
    return yield usuario.save();
});
exports.asignarAsignaturasAUsuario = asignarAsignaturasAUsuario;
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
////////////////////////////////////////ACTUALIZAR USUARIO (NOMBRE/ID)//////////////////////////////////////////
const actualizarUsuarioPorId = (_id, datos) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(_id, datos, { new: true });
});
exports.actualizarUsuarioPorId = actualizarUsuarioPorId;
////////////////////////////////////////ACTUALIZAR ASIGNATURAS DE USUARIO POR NOMBRE E ID///////////////////////////
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
const actualizarAsignaturasUsuarioPorId = (_id, asignaturas) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findById(_id);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    const asignaturasEncontradas = yield asignatura_1.default.find({ nombre: { $in: asignaturas } });
    usuario.asignaturasImparte = asignaturasEncontradas.map(asignatura => asignatura._id);
    return yield usuario.save();
});
exports.actualizarAsignaturasUsuarioPorId = actualizarAsignaturasUsuarioPorId;
// Eliminar usuario por ID usando ObjectId
const eliminarUsuarioPorId = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(_id);
    return yield usuario_1.default.findOneAndDelete({ _id: objectId });
});
exports.eliminarUsuarioPorId = eliminarUsuarioPorId;
////////////////////////////////////////ELIMINAR ASIGNATURA DE USUARIO POR NOMBRE E ID//////////////////////////////////////////
const eliminarAsignaturaDeUsuarioPorNombre = (nombre, asignaturaId) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ nombre });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    usuario.asignaturasImparte = usuario.asignaturasImparte.filter(id => id.toString() !== asignaturaId);
    return yield usuario.save();
});
exports.eliminarAsignaturaDeUsuarioPorNombre = eliminarAsignaturaDeUsuarioPorNombre;
const eliminarAsignaturaDeUsuarioPorId = (usuarioId, asignaturaId) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioObjectId = new mongoose_1.default.Types.ObjectId(usuarioId);
    const asignaturaObjectId = new mongoose_1.default.Types.ObjectId(asignaturaId);
    const usuario = yield usuario_1.default.findById(usuarioObjectId);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    // Filtra el array `asignaturasImparte` para eliminar la asignatura específica
    usuario.asignaturasImparte = usuario.asignaturasImparte.filter(id => !id.equals(asignaturaObjectId) // Usa `.equals()` para comparar `ObjectId`s
    );
    return yield usuario.save();
});
exports.eliminarAsignaturaDeUsuarioPorId = eliminarAsignaturaDeUsuarioPorId;
////////////////////////////////////////FUNCIONES PARA MODIFICAR CAMPOS DE USUARIO///////////////////////////////
////////////////////////////////////////MODIFICAR NOMBRE DE USUARIO POR ID//////////////////////////////////////////
const modificarNombreUsuarioPorId = (_id, nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(_id, { nombre }, { new: true });
});
exports.modificarNombreUsuarioPorId = modificarNombreUsuarioPorId;
////////////////////////////////////////MODIFICAR EDAD DE USUARIO POR ID//////////////////////////////////////////
const modificarEdadUsuarioPorId = (_id, edad) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(_id, { edad }, { new: true });
});
exports.modificarEdadUsuarioPorId = modificarEdadUsuarioPorId;
////////////////////////////////////////MODIFICAR EMAIL DE USUARIO POR ID//////////////////////////////////////////
const modificarEmailUsuarioPorId = (_id, email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(_id, { email }, { new: true });
});
exports.modificarEmailUsuarioPorId = modificarEmailUsuarioPorId;
////////////////////////////////////////MODIFICAR PASSWORD DE USUARIO POR ID//////////////////////////////////////////
const modificarPasswordUsuarioPorId = (_id, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(_id, { password }, { new: true });
});
exports.modificarPasswordUsuarioPorId = modificarPasswordUsuarioPorId;
////////////////////////////////////////MODIFICAR ROL DE USUARIO POR ID//////////////////////////////////////////
const modificarRolUsuarioPorId = (_id, isProfesor, isAlumno, isAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(_id, { isProfesor, isAlumno, isAdmin }, { new: true });
});
exports.modificarRolUsuarioPorId = modificarRolUsuarioPorId;
const obtenerAsignaturasPaginadasDeUsuario = (usuarioId, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    // Primero encuentra al usuario
    const usuario = yield usuario_1.default.findById(usuarioId);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    // Cuenta el total de asignaturas antes de la paginación
    const totalAsignaturas = usuario.asignaturasImparte.length;
    // Luego aplica la paginación en la consulta
    const asignaturasPaginadas = yield usuario_1.default.findById(usuarioId)
        .populate({
        path: 'asignaturasImparte',
        options: { limit: limit, skip: skip }
    });
    return {
        total: totalAsignaturas,
        page: page,
        limit: limit,
        totalPages: Math.ceil(totalAsignaturas / limit),
        asignaturas: asignaturasPaginadas ? asignaturasPaginadas.asignaturasImparte : []
    };
});
exports.obtenerAsignaturasPaginadasDeUsuario = obtenerAsignaturasPaginadasDeUsuario;
//# sourceMappingURL=usuarioService.js.map