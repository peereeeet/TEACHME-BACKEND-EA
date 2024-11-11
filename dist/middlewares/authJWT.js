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
exports.verifyToken = verifyToken;
exports.isUsuario = isUsuario;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
const asignatura_1 = __importDefault(require("../models/asignatura"));
const _SECRET = 'api+jwt';
// Middleware para verificar el token JWT
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.header('x-access-token');
        if (!token)
            return res.status(403).json({ message: 'No token provided' });
        try {
            const decoded = jsonwebtoken_1.default.verify(token, _SECRET);
            req.userId = decoded.id;
            const usuario = yield usuario_1.default.findById(req.userId, { password: 0 });
            if (!usuario)
                return res.status(404).json({ message: 'No user found' });
            next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
    });
}
//ESTA FUNCION SE ENCARGA DE VERIFICAR SI EL USUARIO ES UN PROFESOR O NO (FUTUROS PERMISOS PARA LA APLICACION)
function isUsuario(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield usuario_1.default.findById(req.userId);
            if (!usuario)
                return res.status(404).json({ message: "Usuario no encontrado" });
            const asignaturaId = req.params.id;
            const asignatura = yield asignatura_1.default.findById(asignaturaId);
            if (!asignatura)
                return res.status(404).json({ message: "Asignatura no encontrada" });
            const usuarioEnAsignatura = asignatura.usuarios.some(userId => userId.equals(req.userId));
            if (!usuarioEnAsignatura)
                return res.status(403).json({ message: "Acceso denegado: el usuario no pertenece a esta asignatura" });
            console.log("El usuario(" + usuario.nombre + ") pertenece a la asignatura");
            next();
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    });
}
//# sourceMappingURL=authJWT.js.map