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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.obtenerAsignaturasPaginadasDeUsuario = exports.obtenerUsuariosPaginados = exports.obtenerAsignaturasDelUsuario = void 0;
exports.crearUsuario = crearUsuario;
exports.obtenerIdUsuarioPorNombre = obtenerIdUsuarioPorNombre;
exports.listarUsuarios = listarUsuarios;
exports.verUsuarioPorNombre = verUsuarioPorNombre;
exports.verUsuarioPorId = verUsuarioPorId;
exports.asignarAsignaturasAUsuario = asignarAsignaturasAUsuario;
exports.actualizarUsuarioPorId = actualizarUsuarioPorId;
exports.eliminarUsuarioPorId = eliminarUsuarioPorId;
exports.actualizarAsignaturasUsuarioPorNombre = actualizarAsignaturasUsuarioPorNombre;
exports.eliminarAsignaturaDeUsuarioPorNombre = eliminarAsignaturaDeUsuarioPorNombre;
exports.asignarAsignaturaAUsuarioPorId = asignarAsignaturaAUsuarioPorId;
exports.eliminarAsignaturaDeUsuarioPorId = eliminarAsignaturaDeUsuarioPorId;
exports.modificarNombreUsuarioPorId = modificarNombreUsuarioPorId;
exports.modificarEdadUsuarioPorId = modificarEdadUsuarioPorId;
exports.modificarEmailUsuarioPorId = modificarEmailUsuarioPorId;
exports.modificarPasswordUsuarioPorId = modificarPasswordUsuarioPorId;
exports.modificarRolUsuarioPorId = modificarRolUsuarioPorId;
const usuarioService = __importStar(require("../services/usuarioService"));
const usuario_1 = __importDefault(require("../models/usuario"));
////////////////////////////////////////CREAR NUEVO USUARIO//////////////////////////////////////////
function crearUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nombre, edad, email, password, isProfesor, isAlumno, isAdmin } = req.body;
            const usuario = yield usuarioService.crearUsuario(nombre, edad, email, password, isProfesor, isAlumno, isAdmin);
            console.log(usuario);
            res.status(201).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
////////////////////////////////////////OBTENER ID DE USUARIO POR NOMBRE//////////////////////////////////////////
function obtenerIdUsuarioPorNombre(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuarioService.obtenerIdUsuarioPorNombre(req.params.nombre);
            console.log(usuario);
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
////////////////////////////////////////LISTAR USUARIOS//////////////////////////////////////////
function listarUsuarios(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuarios = yield usuarioService.listarUsuarios();
            console.log(usuarios);
            res.status(200).json(usuarios);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
////////////////////////////////////////VER USUARIO POR ID Y POR NOMBRE///////////////////////////////////
function verUsuarioPorNombre(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuarioService.verUsuarioPorNombre(req.params.nombre);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            console.log(usuario);
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function verUsuarioPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuarioService.verUsuarioPorId(req.params._id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            console.log(usuario);
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
////////////////////////////////////ASIGNAR ASIGNATURAS A UN USUARIO/////////////////////////////////////
function asignarAsignaturasAUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuarioService.asignarAsignaturasAUsuario(req.params.nombre, req.body.asignaturas);
            console.log(usuario);
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
////////////////////////////////////ACTUALIZAR USUARIO POR ID/////////////////////////////////////
function actualizarUsuarioPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuarioService.actualizarUsuarioPorId(req.params._id, req.body);
            console.log(usuario);
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
function eliminarUsuarioPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuarioService.eliminarUsuarioPorId(req.params.usuarioId);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
////////////////////////////////ACTUALIZAR ASIGNATURAS DE UN USUARIO POR NOMBRE/////////////////////////////////////
function actualizarAsignaturasUsuarioPorNombre(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuarioService.actualizarAsignaturasUsuarioPorNombre(req.params.nombre, req.body.asignaturas);
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
////////////////////////////////////ELIMINAR UNA ASIGNATURA DE UN USUARIO POR NOMBRE/////////////////////////////////////
function eliminarAsignaturaDeUsuarioPorNombre(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuarioService.eliminarAsignaturaDeUsuarioPorNombre(req.params.nombre, req.params.asignaturaId);
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
////////////////////////////////////ASIGNAR ASIGNATURA A UN USUARIO POR ID/////////////////////////////////////
function asignarAsignaturaAUsuarioPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuarioService.asignarAsignaturaAUsuarioPorId(req.params.usuarioId, req.params.asignaturaId);
            console.log(usuario);
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
////////////////////////////////////ELIMINAR ASIGNATURA DE UN USUARIO POR ID/////////////////////////////////////
function eliminarAsignaturaDeUsuarioPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuarioService.eliminarAsignaturaDeUsuarioPorId(req.params.usuarioId, req.params.asignaturaId);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario o asignatura no encontrados' });
            }
            res.status(200).json({ message: 'Asignatura desasignada con éxito', usuario });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
////////////////////////////////////añadir las funciones restantes de usuarioService.ts/////////////////////////////////////
////////////////////////////////////MODIFICAR NOMBRE DE USUARIO POR ID/////////////////////////////////////
function modificarNombreUsuarioPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuarioService.modificarNombreUsuarioPorId(req.params._id, req.body.nombre);
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
////////////////////////////////////MODIFICAR EDAD DE USUARIO POR ID/////////////////////////////////////
function modificarEdadUsuarioPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuarioService.modificarEdadUsuarioPorId(req.params._id, req.body.edad);
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
////////////////////////////////////MODIFICAR EMAIL DE USUARIO POR ID/////////////////////////////////////
function modificarEmailUsuarioPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuarioService.modificarEmailUsuarioPorId(req.params._id, req.body.email);
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
////////////////////////////////////MODIFICAR PASSWORD DE USUARIO POR ID/////////////////////////////////////
function modificarPasswordUsuarioPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuarioService.modificarPasswordUsuarioPorId(req.params._id, req.body.password);
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
const obtenerAsignaturasDelUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioId = req.params.usuarioId;
        console.log("ID del usuario recibido:", usuarioId); // Verificación de ID
        const usuario = yield usuario_1.default.findById(usuarioId).populate('asignaturasImparte');
        if (usuario) {
            console.log("Usuario encontrado:", usuario);
            res.status(200).json(usuario.asignaturasImparte);
        }
        else {
            console.log("Usuario no encontrado con ID:", usuarioId);
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        console.error("Error al obtener las asignaturas:", error);
        res.status(500).json({ message: 'Error al obtener las asignaturas', error });
    }
});
exports.obtenerAsignaturasDelUsuario = obtenerAsignaturasDelUsuario;
////////////////////////////////////MODIFICAR ROL DE USUARIO POR ID/////////////////////////////////////
function modificarRolUsuarioPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { isProfesor, isAlumno, isAdmin } = req.body;
            const usuario = yield usuarioService.modificarRolUsuarioPorId(req.params._id, isProfesor, isAlumno, isAdmin);
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
const obtenerUsuariosPaginados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 5 } = req.query;
        const usuariosPaginados = yield usuarioService.obtenerUsuariosPaginados(parseInt(page), parseInt(limit));
        res.status(200).json(usuariosPaginados);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.obtenerUsuariosPaginados = obtenerUsuariosPaginados;
const obtenerAsignaturasPaginadasDeUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuarioId } = req.params;
        const { page = 1, limit = 5 } = req.query;
        const asignaturasPaginadas = yield usuarioService.obtenerAsignaturasPaginadasDeUsuario(usuarioId, parseInt(page), parseInt(limit));
        res.status(200).json(asignaturasPaginadas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.obtenerAsignaturasPaginadasDeUsuario = obtenerAsignaturasPaginadasDeUsuario;
//# sourceMappingURL=usuarioController.js.map