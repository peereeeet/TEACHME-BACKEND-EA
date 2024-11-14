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
exports.loginUsuario = void 0;
/*creame las export const (nombre de la funcion) para crear el login de un usuario, quiero que cuando
 un usuario introduzca su email o nombre de usuario y el paswword le de acceso a la aplicacion,
    si no le da acceso que le muestre un mensaje de error. */
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUsuario = (emailOrNombre, password) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({ $or: [{ email: emailOrNombre }, { nombre: emailOrNombre }] });
    if (!usuario)
        throw new Error('Usuario no encontrado');
    const isMatch = yield bcryptjs_1.default.compare(password, usuario.password);
    if (!isMatch)
        throw new Error('Contraseña incorrecta');
    const token = jsonwebtoken_1.default.sign({ userId: usuario._id, isAdmin: usuario.isAdmin }, 'yourSecretKey', { expiresIn: '1h' });
    console.log('Usuario logueado:', usuario);
    return { token, usuario };
});
exports.loginUsuario = loginUsuario;
//# sourceMappingURL=authJWTService.js.map