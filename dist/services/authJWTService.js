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
exports.registerUsuario = exports.loginUsuario = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _SECRET = 'api+jwt';
//////////////////////////////////////////LOGIN USUARIO////////////////////////////////////////// 
const loginUsuario = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ email: email });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    const session = { 'id': usuario._id.toString() };
    const token = jsonwebtoken_1.default.sign(session, _SECRET, {
        expiresIn: 86400,
    });
    console.log('Usuario logueado:', usuario);
    return { token, usuario };
});
exports.loginUsuario = loginUsuario;
//////////////////////////////////////////REGISTRO USUARIO//////////////////////////////////////////
const registerUsuario = (nombre_1, edad_1, email_1, password_1, ...args_1) => __awaiter(void 0, [nombre_1, edad_1, email_1, password_1, ...args_1], void 0, function* (nombre, edad, email, password, isProfesor = false, isAlumno = false, isAdmin = false) {
    if (!nombre || !edad || !email || !password || isProfesor === undefined || isAlumno === undefined || isAdmin === undefined) {
        throw new Error('Faltan datos requeridos en la solicitud.');
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        throw new Error('Correo electrónico inválido.');
    }
    const nombreExistente = yield usuario_1.default.findOne({ nombre });
    if (nombreExistente) {
        throw new Error('El nombre ya está registrado, escoge otro.');
    }
    const usuarioExistente = yield usuario_1.default.findOne({ email });
    if (usuarioExistente) {
        throw new Error('El correo electrónico ya está registrado.');
    }
    if (password.length < 3) {
        throw new Error('La contraseña debe tener al menos 3 caracteres.');
    }
    const usuario = new usuario_1.default({ nombre, edad, email });
    try {
        yield usuario.save();
        return usuario;
    }
    catch (error) {
        if (error.code === 11000) {
            throw new Error('El correo electrónico ya está registrado.');
        }
        if (error instanceof Error) {
            throw new Error('Error al registrar al usuario: ' + error.message);
        }
        throw error;
    }
});
exports.registerUsuario = registerUsuario;
//# sourceMappingURL=authJWTService.js.map