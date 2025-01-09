"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Esquema de Asignatura
const asignaturaSchema = new mongoose_1.Schema({
    nombre: { type: String },
    nivel: { type: String, enum: ['ESO', 'Bachillerato'], required: true }, // Nivel con valores válidos
}, { versionKey: false } // Desactivamos el campo __v
);
// Modelo de Asignatura
const Asignatura = (0, mongoose_1.model)('Asignatura', asignaturaSchema);
exports.default = Asignatura;
//# sourceMappingURL=asignatura.js.map