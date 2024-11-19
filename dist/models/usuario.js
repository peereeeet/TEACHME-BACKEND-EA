"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// usuario.ts (modelo)
const mongoose_1 = __importDefault(require("mongoose"));
const usuarioSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true, required: true },
    nombre: { type: String },
    edad: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isProfesor: { type: Boolean, default: false },
    isAlumno: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    asignaturasImparte: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Asignatura' }]
}, { versionKey: false });
/*usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});*/
const Usuario = mongoose_1.default.model('Usuario', usuarioSchema);
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map