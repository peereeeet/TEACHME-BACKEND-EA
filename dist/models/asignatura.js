"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Esquema de Asignatura
const asignaturaSchema = new mongoose_1.Schema({
    nombre: { type: String },
    descripcion: { type: String },
    usuarios: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Usuario', default: [] }, // Establece default: []
}, { versionKey: false } // Desactivamos el campo __v
);
// Modelo de Asignatura
const Asignatura = (0, mongoose_1.model)('Asignatura', asignaturaSchema);
exports.default = Asignatura;
//# sourceMappingURL=asignatura.js.map