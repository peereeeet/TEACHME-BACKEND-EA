"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.eliminarAsignaturaDeUsuarioPorId = exports.asignarAsignaturaAUsuarioPorId = exports.asignarAsignaturasAUsuario = exports.obtenerAsignaturasPaginadasDeUsuario = exports.eliminarAsignaturaDeUsuarioPorNombre = exports.actualizarAsignaturasUsuarioPorNombre = exports.obtenerUsuariosPaginados = exports.modificarPasswordUsuarioPorId = exports.modificarEmailUsuarioPorId = exports.modificarNombreUsuarioPorId = exports.verUsuarioPorId = exports.verUsuarioPorNombre = exports.listarUsuarios = exports.findByEmail = exports.findByUsername = exports.obtenerIdUsuarioPorNombre = exports.buscarUsuarios = exports.obtenerCoordenadasDeUsuarios = exports.loginYGuardarCoordenadas = exports.modificarRolUsuarioPorId = exports.actualizarDisponibilidad = exports.modificarEdadUsuarioPorId = exports.actualizarAsignaturas = exports.eliminarUsuarioPorId = exports.actualizarUsuarioPorId = exports.filtrarUsuarios = exports.obtenerTodosLosUsuarios = exports.crearUsuario = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const usuario_1 = __importDefault(require("../models/usuario"));
const asignatura_1 = __importDefault(require("../models/asignatura"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Crear usuario
const crearUsuario = (nombre_1, username_1, fechaNacimiento_1, email_1, password_1, ...args_1) => __awaiter(void 0, [nombre_1, username_1, fechaNacimiento_1, email_1, password_1, ...args_1], void 0, function* (nombre, username, fechaNacimiento, email, password, isProfesor = false, isAlumno = false, isAdmin = false) {
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    const usuario = new usuario_1.default({
        nombre,
        username,
        fechaNacimiento,
        email,
        password: hashedPassword,
        isProfesor,
        isAlumno,
        isAdmin,
        conectado: false,
    });
    return yield usuario.save();
});
exports.crearUsuario = crearUsuario;
const obtenerTodosLosUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuario_1.default.find();
        return usuarios;
    }
    catch (error) {
        throw new Error(`Error al obtener los usuarios: ${error.message}`);
    }
});
exports.obtenerTodosLosUsuarios = obtenerTodosLosUsuarios;
// Filtrar usuarios según los parámetros
const filtrarUsuarios = (rol, asignaturaId, disponibilidadArray) => __awaiter(void 0, void 0, void 0, function* () {
    const filtro = {};
    // Filtrar por rol
    if (rol === 'profesor') {
        filtro.isProfesor = true;
    }
    else if (rol === 'alumno') {
        filtro.isAlumno = true;
    }
    // Filtrar por asignatura
    if (asignaturaId) {
        filtro.asignaturasImparte = asignaturaId; // Aseguramos que la asignatura sea específica
    }
    // Filtrar por disponibilidad (modificado para manejar combinaciones de día-turno correctamente)
    if (disponibilidadArray === null || disponibilidadArray === void 0 ? void 0 : disponibilidadArray.length) {
        filtro.disponibilidad = {
            $elemMatch: {
                $or: disponibilidadArray.map(({ dia, turno }) => ({ dia, turno })),
            },
        };
    }
    // Excluir usuarios con asignaturas o disponibilidad vacías
    filtro.$and = [
        { asignaturasImparte: { $exists: true, $not: { $size: 0 } } },
        { disponibilidad: { $exists: true, $not: { $size: 0 } } },
    ];
    // Ejecutar la consulta con populate para asignaturas
    const usuarios = yield usuario_1.default.find(filtro).populate('asignaturasImparte');
    return usuarios;
});
exports.filtrarUsuarios = filtrarUsuarios;
// Actualizar datos personales, incluyendo descripción
const actualizarUsuarioPorId = (userId, datos) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(userId, datos, { new: true });
});
exports.actualizarUsuarioPorId = actualizarUsuarioPorId;
////////////////////////////////////ELIMINAR USUARIO POR ID/////////////////////////////////////
const eliminarUsuarioPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield usuario_1.default.findByIdAndDelete(id);
    }
    catch (error) {
        throw new Error(`Error al eliminar usuario por ID: ${error.message}`);
    }
});
exports.eliminarUsuarioPorId = eliminarUsuarioPorId;
const actualizarAsignaturas = (userId, asignaturas) => __awaiter(void 0, void 0, void 0, function* () {
    // Busca el usuario por ID
    const usuario = yield usuario_1.default.findById(userId);
    if (!usuario) {
        throw new Error('Usuario no encontrado.');
    }
    // Verifica que todas las asignaturas existen en la base de datos
    const asignaturasValidas = yield asignatura_1.default.find({ _id: { $in: asignaturas } });
    if (asignaturasValidas.length !== asignaturas.length) {
        throw new Error('Algunas asignaturas no fueron encontradas.');
    }
    // Asigna las asignaturas al usuario
    usuario.asignaturasImparte = asignaturas.map(id => new mongoose_1.default.Types.ObjectId(id));
    return yield usuario.save();
});
exports.actualizarAsignaturas = actualizarAsignaturas;
// Modificar edad de usuario por ID
const modificarEdadUsuarioPorId = (_id, edad) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(_id, { edad }, { new: true });
});
exports.modificarEdadUsuarioPorId = modificarEdadUsuarioPorId;
// Actualizar disponibilidad
const actualizarDisponibilidad = (userId, disponibilidad) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(userId, { disponibilidad }, { new: true });
});
exports.actualizarDisponibilidad = actualizarDisponibilidad;
// Modificar rol de usuario por ID
const modificarRolUsuarioPorId = (_id, isProfesor, isAlumno, isAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = {};
    if (isProfesor !== undefined)
        updates.isProfesor = isProfesor;
    if (isAlumno !== undefined)
        updates.isAlumno = isAlumno;
    if (isAdmin !== undefined)
        updates.isAdmin = isAdmin;
    return yield usuario_1.default.findByIdAndUpdate(_id, updates, { new: true });
});
exports.modificarRolUsuarioPorId = modificarRolUsuarioPorId;
// Login de usuario y guardar coordenadas
const loginYGuardarCoordenadas = (identifier, password, lat, lng) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({
        $or: [{ email: identifier }, { username: identifier }],
    })
        .populate('asignaturasImparte') // Agregar populate para asignaturas
        .lean(); // Convierte el documento Mongoose a un objeto plano
    if (!usuario)
        throw new Error('Usuario no encontrado');
    const isValid = yield bcrypt_1.default.compare(password, usuario.password);
    if (!isValid)
        throw new Error('Contraseña incorrecta');
    // Guardar las coordenadas del usuario
    yield usuario_1.default.updateOne({ _id: usuario._id }, {
        location: {
            type: 'Point',
            coordinates: [lng, lat],
        },
    });
    // Devolver todos los atributos relevantes del usuario
    return {
        id: usuario._id.toString(), // `_id` ya está como string
        nombre: usuario.nombre,
        username: usuario.username,
        email: usuario.email,
        fechaNacimiento: usuario.fechaNacimiento,
        isProfesor: usuario.isProfesor,
        isAlumno: usuario.isAlumno,
        isAdmin: usuario.isAdmin,
        location: usuario.location,
        conectado: usuario.conectado,
        asignaturasImparte: usuario.asignaturasImparte,
        descripcion: usuario.descripcion || '', // Añadir descripción
        foto: usuario.foto || '', // Añadir foto
        disponibilidad: usuario.disponibilidad || [], // Añadir disponibilidad
    };
});
exports.loginYGuardarCoordenadas = loginYGuardarCoordenadas;
// Obtener todas las coordenadas de los usuarios
const obtenerCoordenadasDeUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.find({ location: { $exists: true } }, { location: 1, nombre: 1, username: 1 });
});
exports.obtenerCoordenadasDeUsuarios = obtenerCoordenadasDeUsuarios;
// Buscar usuarios por nombre
const buscarUsuarios = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(`^${nombre}`, 'i');
    return yield usuario_1.default.find({ nombre: regex }).populate('asignaturasImparte');
});
exports.buscarUsuarios = buscarUsuarios;
// Obtener ID de usuario por nombre
const obtenerIdUsuarioPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ nombre });
    if (!usuario)
        throw new Error('Usuario no encontrado');
    return usuario._id;
});
exports.obtenerIdUsuarioPorNombre = obtenerIdUsuarioPorNombre;
// Obtener usuario por nombre
const findByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findOne({ username });
});
exports.findByUsername = findByUsername;
// Obtener usuario por email
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findOne({ email });
});
exports.findByEmail = findByEmail;
// Listar usuarios
const listarUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.find().populate('asignaturasImparte');
});
exports.listarUsuarios = listarUsuarios;
// Ver usuario por nombre
const verUsuarioPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findOne({ nombre }).populate('asignaturasImparte');
});
exports.verUsuarioPorNombre = verUsuarioPorNombre;
// Ver usuario por ID
const verUsuarioPorId = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findById(_id).populate('asignaturasImparte');
});
exports.verUsuarioPorId = verUsuarioPorId;
// Modificar nombre de usuario por ID
const modificarNombreUsuarioPorId = (_id, nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(_id, { nombre }, { new: true });
});
exports.modificarNombreUsuarioPorId = modificarNombreUsuarioPorId;
// Modificar email de usuario por ID
const modificarEmailUsuarioPorId = (_id, email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(_id, { email }, { new: true });
});
exports.modificarEmailUsuarioPorId = modificarEmailUsuarioPorId;
// Modificar contraseña de usuario por ID
const modificarPasswordUsuarioPorId = (_id, password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    return yield usuario_1.default.findByIdAndUpdate(_id, { password: hashedPassword }, { new: true });
});
exports.modificarPasswordUsuarioPorId = modificarPasswordUsuarioPorId;
// Obtener usuarios paginados
const obtenerUsuariosPaginados = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    const usuarios = yield usuario_1.default.find().skip(skip).limit(limit).populate('asignaturasImparte');
    const total = yield usuario_1.default.countDocuments();
    return { total, page, limit, totalPages: Math.ceil(total / limit), usuarios };
});
exports.obtenerUsuariosPaginados = obtenerUsuariosPaginados;
// Actualizar asignaturas de usuario por nombre
const actualizarAsignaturasUsuarioPorNombre = (nombre, asignaturas) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ nombre });
    if (!usuario)
        throw new Error('Usuario no encontrado');
    const asignaturasEncontradas = yield asignatura_1.default.find({ nombre: { $in: asignaturas } });
    usuario.asignaturasImparte = asignaturasEncontradas.map(asignatura => asignatura._id);
    return yield usuario.save();
});
exports.actualizarAsignaturasUsuarioPorNombre = actualizarAsignaturasUsuarioPorNombre;
// Eliminar asignatura de usuario por nombre
const eliminarAsignaturaDeUsuarioPorNombre = (nombre, asignaturaId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const usuario = yield usuario_1.default.findOne({ nombre });
    if (!usuario)
        throw new Error('Usuario no encontrado');
    usuario.asignaturasImparte = (_a = usuario.asignaturasImparte) === null || _a === void 0 ? void 0 : _a.filter(id => id.toString() !== asignaturaId);
    return yield usuario.save();
});
exports.eliminarAsignaturaDeUsuarioPorNombre = eliminarAsignaturaDeUsuarioPorNombre;
// Obtener asignaturas paginadas de usuario
const obtenerAsignaturasPaginadasDeUsuario = (usuarioId, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const skip = (page - 1) * limit;
    const usuario = yield usuario_1.default.findById(usuarioId);
    if (!usuario)
        throw new Error('Usuario no encontrado');
    const totalAsignaturas = ((_a = usuario.asignaturasImparte) === null || _a === void 0 ? void 0 : _a.length) || 0;
    const asignaturasPaginadas = yield usuario_1.default.findById(usuarioId).populate({
        path: 'asignaturasImparte',
        options: { limit, skip },
    });
    return {
        total: totalAsignaturas,
        page,
        limit,
        totalPages: Math.ceil(totalAsignaturas / limit),
        asignaturas: (asignaturasPaginadas === null || asignaturasPaginadas === void 0 ? void 0 : asignaturasPaginadas.asignaturasImparte) || [],
    };
});
exports.obtenerAsignaturasPaginadasDeUsuario = obtenerAsignaturasPaginadasDeUsuario;
// Asignar asignaturas a usuario por nombre
const asignarAsignaturasAUsuario = (nombre, asignaturas) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ nombre });
    if (!usuario)
        throw new Error('Usuario no encontrado');
    const asignaturasEncontradas = yield asignatura_1.default.find({ nombre: { $in: asignaturas } });
    usuario.asignaturasImparte = asignaturasEncontradas.map(asignatura => asignatura._id);
    return yield usuario.save();
});
exports.asignarAsignaturasAUsuario = asignarAsignaturasAUsuario;
// Asignar asignatura a usuario por ID
const asignarAsignaturaAUsuarioPorId = (usuarioId, asignaturaId) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findById(usuarioId);
    if (!usuario)
        throw new Error('Usuario no encontrado');
    const asignaturaObjectId = new mongoose_1.Types.ObjectId(asignaturaId);
    usuario.asignaturasImparte = usuario.asignaturasImparte || [];
    if (!usuario.asignaturasImparte.some(id => id.toString() === asignaturaObjectId.toString())) {
        usuario.asignaturasImparte.push(asignaturaObjectId);
    }
    return yield usuario.save();
});
exports.asignarAsignaturaAUsuarioPorId = asignarAsignaturaAUsuarioPorId;
// Eliminar asignatura de usuario por ID
const eliminarAsignaturaDeUsuarioPorId = (usuarioId, asignaturaId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const usuario = yield usuario_1.default.findById(usuarioId);
    if (!usuario)
        throw new Error('Usuario no encontrado');
    usuario.asignaturasImparte = (_a = usuario.asignaturasImparte) === null || _a === void 0 ? void 0 : _a.filter(id => id.toString() !== asignaturaId);
    return yield usuario.save();
});
exports.eliminarAsignaturaDeUsuarioPorId = eliminarAsignaturaDeUsuarioPorId;
//# sourceMappingURL=usuarioService.js.map