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
exports.loginUsuarioController = loginUsuarioController;
exports.registerUsuario = registerUsuario;
const usuario_1 = __importDefault(require("../models/usuario"));
const authJWTService_1 = require("../services/authJWTService");
const _SECRET = 'api+jwt';
function loginUsuarioController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Faltan campos requeridos: email o password',
            });
        }
        try {
            const { token, usuario } = yield (0, authJWTService_1.loginUsuario)(email, password);
            res.json({ token, usuario });
        }
        catch (error) {
            console.error('Error en login:', error);
            if (error.message === 'Usuario no encontrado') {
                return res.status(404).json({
                    message: 'Usuario no encontrado. Asegúrate de que el email sea correctos.',
                });
            }
            if (error.message === 'Contraseña incorrecta') {
                return res.status(401).json({
                    message: 'Contraseña incorrecta. Asegúrate de que la contraseña sea correcta.',
                });
            }
            res.status(500).json({ message: 'Server error' });
        }
    });
}
function registerUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombre, edad, email, password, isProfesor, isAlumno, isAdmin } = req.body;
        try {
            const usuario = new usuario_1.default({ nombre, edad, email, password, isProfesor, isAlumno, isAdmin });
            yield usuario.save();
            res.json(usuario);
        }
        catch (error) {
            if (error.message === 'Faltan datos requeridos en la solicitud.') {
                return res.status(400).json({
                    message: 'Faltan datos requeridos en la solicitud.',
                });
            }
            if (error.message === 'Correo electrónico inválido.') {
                return res.status(400).json({
                    message: 'Correo electrónico inválido.',
                });
            }
            if (error.message === 'El nombre ya está registrado, escoge otro.') {
                return res.status(400).json({
                    message: 'El nombre ya está registrado, escoge otro.',
                });
            }
            if (error.message === 'El correo electrónico ya está registrado.') {
                return res.status(400).json({
                    message: 'El correo electrónico ya está registrado.',
                });
            }
            if (error.message === 'La contraseña debe tener al menos 3 caracteres.') {
                return res.status(400).json({
                    message: 'La contraseña debe tener al menos 3 caracteres.',
                });
            }
            console.error('Error en registro:', error.message);
            res.status(500).json({ message: 'Server error' });
        }
    });
}
//# sourceMappingURL=authJWTController.js.map