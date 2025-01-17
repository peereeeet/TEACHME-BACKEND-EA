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
exports.obtenerAsignaturasPaginadasDeUsuario = exports.obtenerUsuariosPaginados = exports.obtenerAsignaturasDelUsuario = exports.obtenerUsuariosConectados = exports.obtenerCoordenadasUsuarios = exports.loginUsuario = exports.buscarUsuarios = exports.getAllUsers = exports.actualizarDisponibilidad = exports.actualizarDatosUsuario = exports.asignarRolUsuarioPorId = exports.filtrarUsuarios = exports.actualizarAsignaturas = void 0;
exports.crearUsuario = crearUsuario;
exports.eliminarUsuarioPorId = eliminarUsuarioPorId;
exports.obtenerIdUsuarioPorNombre = obtenerIdUsuarioPorNombre;
exports.listarUsuarios = listarUsuarios;
exports.verUsuarioPorNombre = verUsuarioPorNombre;
exports.verUsuarioPorId = verUsuarioPorId;
exports.asignarAsignaturasAUsuario = asignarAsignaturasAUsuario;
exports.actualizarUsuarioPorId = actualizarUsuarioPorId;
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = require("../app");
////////////////////////////////////////CREAR NUEVO USUARIO//////////////////////////////////////////
function crearUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nombre, username, fechaNacimiento, email, password, isProfesor, isAlumno, isAdmin } = req.body;
            const usuario = yield usuarioService.crearUsuario(nombre, username, fechaNacimiento, email, password, isProfesor, isAlumno, isAdmin);
            res.status(201).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
const actualizarAsignaturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { asignaturas } = req.body;
        const usuario = yield usuarioService.actualizarAsignaturas(userId, asignaturas);
        if (!usuario)
            return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Asignaturas actualizadas correctamente', usuario });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.actualizarAsignaturas = actualizarAsignaturas;
const filtrarUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rol, asignaturaId, disponibilidad } = req.query;
        // Validar que el rol sea válido
        if (!rol || (rol !== 'profesor' && rol !== 'alumno')) {
            return res.status(400).json({ error: 'El parámetro "rol" es obligatorio y debe ser "profesor" o "alumno".' });
        }
        // Procesar el parámetro `disponibilidad` (formato esperado: "Lunes,Mañana;Martes,Tarde")
        let disponibilidadArray;
        if (disponibilidad) {
            disponibilidadArray = disponibilidad
                .split(';')
                .map((item) => {
                const [dia, turno] = item.split(',');
                return { dia, turno };
            });
        }
        // Llamar al servicio para obtener los usuarios filtrados
        const usuarios = yield usuarioService.filtrarUsuarios(rol, asignaturaId, disponibilidadArray);
        res.status(200).json(usuarios);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.filtrarUsuarios = filtrarUsuarios;
const asignarRolUsuarioPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isProfesor, isAlumno } = req.body;
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ error: 'El ID del usuario es obligatorio' });
        }
        if (isProfesor === isAlumno) {
            return res.status(400).json({ error: 'Debes elegir un único rol: profesor o alumno' });
        }
        const usuario = yield usuarioService.modificarRolUsuarioPorId(userId, isProfesor, isAlumno, undefined);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Rol asignado con éxito', usuario });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.asignarRolUsuarioPorId = asignarRolUsuarioPorId;
////////////////////////////////////ELIMINAR USUARIO POR ID/////////////////////////////////////
function eliminarUsuarioPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const usuario = yield usuarioService.eliminarUsuarioPorId(id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            return res.status(200).json({ message: 'Usuario eliminado con éxito' });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
// Actualizar datos personales, incluyendo descripción
const actualizarDatosUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { nombre, username, foto, password, descripcion } = req.body;
        const updatedData = { nombre, username, foto, descripcion };
        // Si se envía una nueva contraseña, hashearla
        if (password) {
            const saltRounds = 10;
            updatedData.password = yield bcrypt_1.default.hash(password, saltRounds);
        }
        const usuario = yield usuarioService.actualizarUsuarioPorId(userId, updatedData);
        if (!usuario)
            return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Datos actualizados correctamente', usuario });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.actualizarDatosUsuario = actualizarDatosUsuario;
// Actualizar disponibilidad académica
const actualizarDisponibilidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { disponibilidad } = req.body;
        const usuario = yield usuarioService.actualizarDisponibilidad(userId, disponibilidad);
        if (!usuario)
            return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Disponibilidad actualizada correctamente', usuario });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.actualizarDisponibilidad = actualizarDisponibilidad;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuarioService.obtenerTodosLosUsuarios();
        res.status(200).json(usuarios);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
// Buscar usuarios por nombre
const buscarUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.query; // Obtener el parámetro "nombre" de la consulta
        if (!nombre) {
            return res.status(400).json({ error: 'El parámetro "nombre" es obligatorio.' });
        }
        const usuarios = yield usuarioService.buscarUsuarios(nombre.toString());
        if (usuarios.length === 0) {
            return res.status(404).json({ error: 'No se encontraron usuarios con ese nombre.' });
        }
        // Añadir estado de conexión
        const usuariosConEstado = usuarios.map((usuario) => (Object.assign(Object.assign({}, usuario.toObject()), { conectado: app_1.connectedUsers.has(usuario._id) })));
        res.status(200).json(usuariosConEstado);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.buscarUsuarios = buscarUsuarios;
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identifier, password, lat, lng } = req.body;
        if (!lat || !lng) {
            return res.status(400).json({ error: 'Las coordenadas son obligatorias para el login' });
        }
        // Llama al servicio para autenticar al usuario y guardar las coordenadas
        const usuario = yield usuarioService.loginYGuardarCoordenadas(identifier, password, lat, lng);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        // Generar el token JWT
        const token = jsonwebtoken_1.default.sign({ email: usuario.email, isAdmin: usuario.isAdmin }, process.env.SECRET || 'secretkey', { expiresIn: '1h' });
        // Preparar respuesta con todos los atributos del usuario
        res.status(200).json({
            message: 'Login exitoso',
            usuario, // Enviar todos los atributos devueltos por el servicio
            token,
        });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
exports.loginUsuario = loginUsuario;
// Nuevo endpoint para obtener todas las coordenadas
const obtenerCoordenadasUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coordenadas = yield usuarioService.obtenerCoordenadasDeUsuarios();
        res.status(200).json(coordenadas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.obtenerCoordenadasUsuarios = obtenerCoordenadasUsuarios;
// Controlador para obtener usuarios conectados
const obtenerUsuariosConectados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuariosConectados = Array.from(app_1.connectedUsers.keys());
        console.log('Usuarios conectados:', usuariosConectados);
        res.status(200).json(usuariosConectados);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios conectados' });
    }
});
exports.obtenerUsuariosConectados = obtenerUsuariosConectados;
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
            const userId = req.params.id; // Asegúrate de que sea "id" y no "_id"
            console.log("ID recibido:", userId); // Log del ID recibido
            const usuario = yield usuarioService.verUsuarioPorId(userId);
            if (!usuario) {
                console.log("Usuario no encontrado en la base de datos");
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            console.log("Usuario encontrado:", usuario);
            res.status(200).json(usuario);
        }
        catch (error) {
            console.error("Error al buscar usuario por ID:", error);
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
            const datos = req.body;
            // Si se incluye una contraseña, hashearla
            if (datos.password) {
                const saltRounds = 10;
                datos.password = yield bcrypt_1.default.hash(datos.password, saltRounds);
            }
            const usuario = yield usuarioService.actualizarUsuarioPorId(req.params._id, datos);
            console.log(usuario);
            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
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
        if (!usuarioId) {
            return res.status(400).json({ error: 'El ID del usuario es obligatorio.' });
        }
        const usuario = yield usuario_1.default.findById(usuarioId); // Sin populate
        console.log("Usuario encontrado:", usuario);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        res.status(200).json(usuario.asignaturasImparte); // Devolver los IDs directamente
    }
    catch (error) {
        console.error('Error al obtener las asignaturas del usuario:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
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