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
exports.eliminarAsignaturaDeUsuarioPorId = exports.asignarAsignaturaAUsuarioPorId = exports.asignarAsignaturasAUsuario = exports.obtenerAsignaturasPaginadasDeUsuario = exports.eliminarAsignaturaDeUsuarioPorNombre = exports.actualizarAsignaturasUsuarioPorNombre = exports.obtenerUsuariosPaginados = exports.modificarRolUsuarioPorId = exports.modificarPasswordUsuarioPorId = exports.modificarEmailUsuarioPorId = exports.modificarEdadUsuarioPorId = exports.modificarNombreUsuarioPorId = exports.eliminarUsuarioPorId = exports.actualizarUsuarioPorId = exports.verUsuarioPorId = exports.verUsuarioPorNombre = exports.listarUsuarios = exports.findByEmail = exports.findByUsername = exports.obtenerIdUsuarioPorNombre = exports.buscarUsuarios = exports.autenticarUsuario = exports.crearUsuario = void 0;
const mongoose_1 = require("mongoose");
const usuario_1 = __importDefault(require("../models/usuario")); // Importamos IUsuario
const asignatura_1 = __importDefault(require("../models/asignatura"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Crear usuario
const crearUsuario = (nombre_1, edad_1, email_1, password_1, ...args_1) => __awaiter(void 0, [nombre_1, edad_1, email_1, password_1, ...args_1], void 0, function* (nombre, edad, email, password, isProfesor = false, isAlumno = false, isAdmin = false) {
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    const usuario = new usuario_1.default({
        nombre,
        edad,
        email,
        password: hashedPassword,
        isProfesor,
        isAlumno,
        isAdmin,
        conectado: false, // Inicializar como desconectado
    });
    return yield usuario.save();
});
exports.crearUsuario = crearUsuario;
// Autenticar usuario
const autenticarUsuario = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ email });
    if (!usuario)
        throw new Error('Usuario no encontrado');
    const isValid = yield bcrypt_1.default.compare(password, usuario.password);
    if (!isValid)
        throw new Error('Contraseña incorrecta');
    return usuario;
});
exports.autenticarUsuario = autenticarUsuario;
// Buscar usuarios por nombre
const buscarUsuarios = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(`^${nombre}`, 'i'); // Buscar usuarios cuyo nombre comience con el término ingresado (no sensible a mayúsculas)
    return yield usuario_1.default.find({ nombre: regex }).populate('asignaturasImparte'); // Retornar usuarios y asignaturas
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
const findByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findOne({ nombre: username });
});
exports.findByUsername = findByUsername;
// En usuarioService.ts
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findOne({ email }); // Busca un usuario por su email
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
const verUsuarioPorId = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Buscando usuario con ID:", _id); // Log del ID recibido
    try {
        //const objectId = new mongoose.Types.ObjectId(_id); // Convierte a ObjectId si no lo es
        const usuario = yield usuario_1.default.findById(_id).populate('asignaturasImparte');
        console.log("Resultado de la búsqueda:", usuario); // Log del resultado
        return usuario;
    }
    catch (error) {
        console.error("Error en la búsqueda por ID:", error);
        throw error; // Lanza el error para que sea capturado en el controlador
    }
});
exports.verUsuarioPorId = verUsuarioPorId;
// Actualizar usuario por ID
const actualizarUsuarioPorId = (_id, datos) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(_id, datos, { new: true });
});
exports.actualizarUsuarioPorId = actualizarUsuarioPorId;
// Eliminar usuario por ID
const eliminarUsuarioPorId = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndDelete(_id);
});
exports.eliminarUsuarioPorId = eliminarUsuarioPorId;
// Modificar nombre de usuario por ID
const modificarNombreUsuarioPorId = (_id, nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(_id, { nombre }, { new: true });
});
exports.modificarNombreUsuarioPorId = modificarNombreUsuarioPorId;
// Modificar edad de usuario por ID
const modificarEdadUsuarioPorId = (_id, edad) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(_id, { edad }, { new: true });
});
exports.modificarEdadUsuarioPorId = modificarEdadUsuarioPorId;
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
// Modificar rol de usuario por ID
const modificarRolUsuarioPorId = (_id, isProfesor, isAlumno, isAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findByIdAndUpdate(_id, { isProfesor, isAlumno, isAdmin }, { new: true });
});
exports.modificarRolUsuarioPorId = modificarRolUsuarioPorId;
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
    const usuario = yield usuario_1.default.findOne({ nombre });
    if (!usuario)
        throw new Error('Usuario no encontrado');
    if (!usuario.asignaturasImparte) {
        usuario.asignaturasImparte = [];
    }
    usuario.asignaturasImparte = usuario.asignaturasImparte.filter(id => id.toString() !== asignaturaId);
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
    if (!usuario.asignaturasImparte)
        usuario.asignaturasImparte = [];
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
    if (!usuario.asignaturasImparte)
        usuario.asignaturasImparte = [];
    if (!usuario.asignaturasImparte.some(id => id.toString() === asignaturaObjectId.toString())) {
        usuario.asignaturasImparte.push(asignaturaObjectId);
    }
    return yield usuario.save();
});
exports.asignarAsignaturaAUsuarioPorId = asignarAsignaturaAUsuarioPorId;
// Eliminar asignatura de usuario por ID
const eliminarAsignaturaDeUsuarioPorId = (usuarioId, asignaturaId) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findById(usuarioId);
    if (!usuario)
        throw new Error('Usuario no encontrado');
    if (!usuario.asignaturasImparte)
        usuario.asignaturasImparte = [];
    usuario.asignaturasImparte = usuario.asignaturasImparte.filter(id => id.toString() !== asignaturaId);
    return yield usuario.save();
});
exports.eliminarAsignaturaDeUsuarioPorId = eliminarAsignaturaDeUsuarioPorId;
//# sourceMappingURL=usuarioService.js.map