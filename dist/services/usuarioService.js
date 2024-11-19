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
exports.modificarRolUsuarioPorId = exports.modificarPasswordUsuarioPorId = exports.modificarEmailUsuarioPorId = exports.modificarEdadUsuarioPorId = exports.modificarNombreUsuarioPorId = exports.eliminarAsignaturaDeUsuarioPorId = exports.eliminarAsignaturasDeUsuarioPorEmail = exports.eliminarUsuarioPorId = exports.actualizarAsignaturasUsuarioPorId = exports.actualizarAsignaturasUsuarioPorNombre = exports.actualizarUsuarioPorId = exports.asignarAsignaturaAUsuarioPorId = exports.asignarAsignaturasAUsuarioEmail = exports.verUsuarioPorNombre = exports.verUsuarioPorId = exports.listarUsuariosAdminNombre = exports.listarUsuariosAdmin = exports.listarUsuarios = exports.crearUsuario = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usuario_1 = __importDefault(require("../models/usuario"));
const asignatura_1 = __importDefault(require("../models/asignatura"));
////////////////////////////////////////CREAR NUEVO USUARIO//////////////////////////////////////////
const crearUsuario = (_id_1, nombre_1, edad_1, email_1, password_1, ...args_1) => __awaiter(void 0, [_id_1, nombre_1, edad_1, email_1, password_1, ...args_1], void 0, function* (_id, nombre, edad, email, password, isProfesor = false, isAlumno = false, isAdmin = false) {
    const usuario = new usuario_1.default({ _id, nombre, edad, email, password, isProfesor, isAlumno, isAdmin });
    return yield usuario.save();
});
exports.crearUsuario = crearUsuario;
////////////////////////////////////////LISTAR USUARIOS//////////////////////////////////////////
const listarUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.find().populate('asignaturasImparte');
});
exports.listarUsuarios = listarUsuarios;
////////////////////////////////////////EJERCICIO SEMINARIO 7//////////////////////////////////////////
////////////////////////////////////////LISTAR USUARIOS CON PERMISO DE ADMIN//////////////////////////////////////////
const listarUsuariosAdmin = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ _id });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    if (usuario && usuario.isAdmin === true) {
        return yield usuario_1.default.find().populate('asignaturasImparte');
    }
    return 'No tienes permisos para ver la lista de usuarios';
});
exports.listarUsuariosAdmin = listarUsuariosAdmin;
//CON NOMBRE 
const listarUsuariosAdminNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ nombre });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    if (usuario && usuario.isAdmin === true) {
        return yield usuario_1.default.find().populate('asignaturasImparte');
    }
    return 'No tienes permisos para ver la lista de usuarios';
});
exports.listarUsuariosAdminNombre = listarUsuariosAdminNombre;
////////////////////////////////////////VER USUARIO POR ID Y POR NOMBRE///////////////////////////////////
const verUsuarioPorId = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ _id }).populate('asignaturasImparte');
    console.log(usuario);
    return usuario;
});
exports.verUsuarioPorId = verUsuarioPorId;
const verUsuarioPorNombre = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usuario_1.default.findOne({ nombre }).populate('asignaturasImparte');
});
exports.verUsuarioPorNombre = verUsuarioPorNombre;
////////////////////////////////////////ASIGNAR ASIGNATURAS A USUARIO/////////////////////////////////
const asignarAsignaturasAUsuarioEmail = (email, asignaturas) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ email });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    // Buscar las asignaturas solicitadas
    const asignaturasEncontradas = yield asignatura_1.default.find({ nombre: { $in: asignaturas } });
    if (asignaturasEncontradas.length !== asignaturas.length) {
        throw new Error('Algunas asignaturas no fueron encontradas, te has inventado el nombre?');
    }
    // Obtener IDs de las asignaturas encontradas
    const nuevosIds = asignaturasEncontradas.map(asignatura => asignatura._id);
    // Combinar las asignaturas existentes con las nuevas, eliminando duplicados
    const asignaturasActualizadas = Array.from(new Set([...usuario.asignaturasImparte.map(id => id.toString()), ...nuevosIds.map(id => id.toString())]));
    // Convertir de nuevo a ObjectId
    usuario.asignaturasImparte = asignaturasActualizadas.map(id => new mongoose_1.default.Types.ObjectId(id));
    // Guardar y devolver el usuario actualizado
    return yield usuario.save();
});
exports.asignarAsignaturasAUsuarioEmail = asignarAsignaturasAUsuarioEmail;
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
    return yield usuario_1.default.findByIdAndUpdate(_id, datos);
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
////////////////////////////////////////ELIMINAR USUARIO//////////////////////////////////////////
const eliminarUsuarioPorId = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield usuario_1.default.findOneAndDelete({ _id });
    return yield resultado;
});
exports.eliminarUsuarioPorId = eliminarUsuarioPorId;
/*export const eliminarUsuarioPorNombre = async (nombre: string) => {
  const resultado = await Usuario.findOneAndDelete({ nombre });
  return await resultado;
};
*/
////////////////////////////////////////ELIMINAR ASIGNATURA DE USUARIO POR EMAIL E ID//////////////////////////////////////////
const eliminarAsignaturasDeUsuarioPorEmail = (email, asignaturas) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ email });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    let asignaturasEliminadas = [];
    for (const asignatura of asignaturas) {
        let asignaturaId;
        if (mongoose_1.default.Types.ObjectId.isValid(asignatura)) {
            asignaturaId = new mongoose_1.default.Types.ObjectId(asignatura);
        }
        else {
            const asignaturaEncontrada = yield asignatura_1.default.findOne({ nombre: asignatura });
            if (!asignaturaEncontrada) {
                asignaturasEliminadas.push(false);
                continue;
            }
            asignaturaId = asignaturaEncontrada._id;
        }
        const asignaturasActuales = usuario.asignaturasImparte.map(id => id.toString());
        const index = asignaturasActuales.indexOf(asignaturaId.toString());
        if (index === -1) {
            asignaturasEliminadas.push(false);
        }
        else {
            usuario.asignaturasImparte.splice(index, 1);
            asignaturasEliminadas.push(true);
        }
    }
    yield usuario.save();
    return usuario;
});
exports.eliminarAsignaturasDeUsuarioPorEmail = eliminarAsignaturasDeUsuarioPorEmail;
const eliminarAsignaturaDeUsuarioPorId = (_id, asignaturaId) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioObjectId = new mongoose_1.default.Types.ObjectId(_id);
    const asignaturaObjectId = new mongoose_1.default.Types.ObjectId(asignaturaId);
    const usuario = yield usuario_1.default.findById(usuarioObjectId);
    if (!usuario) {
        throw new Error('Usuario no encontrado' + usuarioObjectId);
    }
    usuario.asignaturasImparte = usuario.asignaturasImparte.filter(id => id.toString() !== asignaturaObjectId.toString());
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
//# sourceMappingURL=usuarioService.js.map