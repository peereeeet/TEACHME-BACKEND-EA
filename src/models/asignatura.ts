import { Schema, model, Document } from 'mongoose';

// Define la interfaz para Asignatura
export interface IAsignatura extends Document {
  nombre?: string; // Campo opcional
  nivel: 'ESO' | 'Bachillerato'; // Campo obligatorio con valores restringidos
}

// Esquema de Asignatura
const asignaturaSchema = new Schema<IAsignatura>(
  {
    nombre: { type: String },
    nivel: { type: String, enum: ['ESO', 'Bachillerato'], required: true }, // Nivel con valores válidos
  },
  { versionKey: false } // Desactivamos el campo __v
);

// Modelo de Asignatura
const Asignatura = model<IAsignatura>('Asignatura', asignaturaSchema);

export default Asignatura;
