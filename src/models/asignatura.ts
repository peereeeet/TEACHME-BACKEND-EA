import { Schema, model, Document, Types } from 'mongoose';

// Define la interfaz para Asignatura
export interface IAsignatura extends Document {
  nombre?: string; // Campo opcional
  descripcion?: string; // Campo opcional
  usuarios?: Types.ObjectId[]; // Relación con los usuarios
}

// Esquema de Asignatura
const asignaturaSchema = new Schema<IAsignatura>(
  {
    nombre: { type: String },
    descripcion: { type: String },
    usuarios: { type: [Schema.Types.ObjectId], ref: 'Usuario', default: [] }, // Establece default: []
  },
  { versionKey: false } // Desactivamos el campo __v
);

// Modelo de Asignatura
const Asignatura = model<IAsignatura>('Asignatura', asignaturaSchema);

export default Asignatura;
