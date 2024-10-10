"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const asignaturaSchema = new mongoose_1.default.Schema({
    nombre: { type: String },
    descripcion: { type: String },
    profesores: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Profesor' }]
});
const Asignatura = mongoose_1.default.model('Asignatura', asignaturaSchema);
exports.default = Asignatura;
//# sourceMappingURL=asignatura.js.map