"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usuarioSchema = new mongoose_1.default.Schema({
    nombre: { type: String },
    edad: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isProfesor: { type: Boolean, default: false },
    isAlumno: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    asignaturasImparte: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Asignatura' }]
}, { versionKey: false });
const Usuario = mongoose_1.default.model('Usuario', usuarioSchema);
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map