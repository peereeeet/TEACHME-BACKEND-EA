"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const profesorSchema = new mongoose_1.default.Schema({
    nombre: { type: String },
    edad: { type: Number },
    asignaturasImparte: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Asignatura' }]
}, { versionKey: false });
const Profesor = mongoose_1.default.model('Profesor', profesorSchema);
exports.default = Profesor;
//# sourceMappingURL=profesor.js.map