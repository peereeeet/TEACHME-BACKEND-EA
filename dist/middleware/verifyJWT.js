"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handle_1 = require("../utils/error.handle");
const TokenValidation = (req, res, next) => {
    console.log('Verifying token');
    // Recoge el token escrito en el header
    const token = req.header('auth-token');
    console.log('Token:', token); // Imprime el token en la consola
    // Comprobamos 
    if (!token)
        return (0, error_handle_1.handleHttp)(res, 'Access denied', 'No token provided');
    try {
        // Obtenemos de nuevo los datos codificados del token
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET || 'tokentest');
        console.log('Contenido del token decodificado:', payload); // Imprime el contenido del token
        req.user = payload; // Establecemos el tipo de req.user
        next();
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'Your token is not valid', error);
    }
};
exports.TokenValidation = TokenValidation;
//# sourceMappingURL=verifyJWT.js.map