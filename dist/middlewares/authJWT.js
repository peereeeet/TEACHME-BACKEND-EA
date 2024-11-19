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
exports.isOwner = isOwner;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
const _SECRET = 'api+jwt';
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Executing verifyToken middleware");
        //const token = req.header('Authorization');
        const token = req.headers['authorization'];
        console.log("Token:", token);
        console.log(req.headers);
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, _SECRET);
            req.userId = decoded.id;
            console.log("userId:", req.userId);
            const usuario = yield usuario_1.default.findById(req.userId, { password: 0 });
            if (!usuario) {
                return res.status(404).json({ message: 'No user found (verify token)' });
            }
            next();
        }
        catch (error) {
            console.error("JWT verification error:", error);
            return res.status(401).json({ message: 'Unauthorized!' });
        }
    });
}
function isOwner(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userIdFromToken = req.userId;
            // Identificar si se pasó un _id o un email
            const paramId = req.params._id;
            const paramEmail = req.params.email;
            let usuario;
            if (paramId) {
                // Buscar usuario por ID
                usuario = yield usuario_1.default.findById(paramId);
            }
            else if (paramEmail) {
                // Buscar usuario por email
                usuario = yield usuario_1.default.findOne({ email: paramEmail });
            }
            else {
                // Si no hay parámetros válidos
                return res.status(400).json({ message: "No parameter provided for ownership verification" });
            }
            if (!usuario) {
                return res.status(404).json({ message: "No user found (owner)" });
            }
            // Verificar si el usuario autenticado es el mismo que el recurso solicitado
            if (usuario._id.toString() !== userIdFromToken) {
                return res.status(403).json({ message: "You do not own this resource" });
            }
            next();
        }
        catch (error) {
            console.error("Ownership verification error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
//# sourceMappingURL=authJWT.js.map