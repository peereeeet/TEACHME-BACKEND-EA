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
exports.login = login;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const _SECRET = 'api+jwt';
// Login y generación de token
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // Verificar si el usuario existe
            const usuario = yield usuario_1.default.findOne({ email });
            if (!usuario)
                return res.status(404).json({ message: 'User not found' });
            // Verificar la contraseña
            const isPasswordValid = yield bcryptjs_1.default.compare(password, usuario.password);
            if (!isPasswordValid)
                return res.status(401).json({ message: 'Invalid password' });
            // Generar token JWT
            const token = jsonwebtoken_1.default.sign({ id: usuario._id }, _SECRET, { expiresIn: 86400 }); // expira en 24 horas
            res.json({ token });
        }
        catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ message: 'Server error' });
        }
    });
}
//# sourceMappingURL=authJWTController.js.map