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
// Middleware para verificar el token JWT
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Executing verifyToken middleware");
        const token = req.header('Authorization');
        console.log("Token:", token);
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
function isOwner(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userIdFromToken = req.userId;
            const userIdToModify = req.params._id;
            const usuario = yield usuario_1.default.findById(userIdFromToken);
            if (!usuario) {
                return res.status(404).json({ message: "No user found" });
            }
            if (userIdFromToken !== userIdToModify) {
                return res.status(403).json({ message: "Not Owner" });
            }
            //PERMITIR ACCESO AL USUARIO
            next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
    });
}
//# sourceMappingURL=authJWT.js.map