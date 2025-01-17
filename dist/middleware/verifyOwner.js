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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOwnership = void 0;
const userServices = __importStar(require("../services/usuarioService"));
const error_handle_1 = require("../utils/error.handle");
const verifyOwnership = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('Verificando usuario');
        // El ID del usuario a modificar es el parámetro de la URL
        const userIdToActOn = req.params._id; // Usa el nombre real del parámetro en tu ruta
        // Usamos el email del usuario desde el payload del JWT
        const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        if (!email) {
            return res.status(400).json({ message: 'Email not found in request' });
        }
        // Buscar al usuario por email
        const user = yield userServices.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Validamos que el usuario tenga la propiedad `_id` como `ObjectId`
        if (!user._id) {
            return res.status(400).json({ message: 'User does not have a valid _id' });
        }
        // Hacemos un type assertion para asegurarnos de que `user` es de tipo `IUsuario`
        const currentUserId = user._id.toString(); // Convertimos el _id a string
        console.log({ userIdToActOn, currentUserId });
        // Verificar si el usuario actual tiene permiso para modificar el recurso
        if (currentUserId === userIdToActOn) {
            return next(); // Si tiene permiso, pasa al siguiente middleware
        }
        return res.status(403).json({ message: 'You are not the owner of this resource' });
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, 'Internal server error', error);
    }
});
exports.verifyOwnership = verifyOwnership;
//# sourceMappingURL=verifyOwner.js.map