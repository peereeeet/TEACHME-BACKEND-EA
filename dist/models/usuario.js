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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Esquema de Usuario
const usuarioSchema = new mongoose_1.Schema({
    nombre: { type: String },
    edad: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isProfesor: { type: Boolean, default: false },
    isAlumno: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: true },
    asignaturasImparte: { type: [mongoose_1.Types.ObjectId], ref: 'Asignatura', default: [] },
    conectado: { type: Boolean, default: false }, // Añadido el atributo conectado
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number], // GeoJSON con dos números: [lng, lat]
            default: undefined,
        },
    },
}, { versionKey: false });
// Índice geoespacial para el campo location
usuarioSchema.index({ location: '2dsphere' });
// Método para encriptar contraseña
usuarioSchema.methods.encryptPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt();
        return bcryptjs_1.default.hash(password, salt);
    });
};
// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcryptjs_1.default.compare(password, this.password);
    });
};
// Modelo de Usuario
const Usuario = (0, mongoose_1.model)('Usuario', usuarioSchema);
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map