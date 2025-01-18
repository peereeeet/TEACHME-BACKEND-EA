import { Schema, model, Document, Types } from 'mongoose';

// Interfaz para Clase
export interface IClase extends Document {
  profesor: Types.ObjectId;
  alumno: Types.ObjectId;
  asignatura: Types.ObjectId;
  fecha: Date;
  duracion: number; // Duración en minutos
  estado: 'pendiente' | 'finalizada';
}

// Esquema de Clase
const claseSchema = new Schema<IClase>(
  {
    profesor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    alumno: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    asignatura: { type: Schema.Types.ObjectId, ref: 'Asignatura', required: true },
    fecha: { type: Date, required: true },
    duracion: { type: Number, required: true },
    estado: { type: String, enum: ['pendiente', 'finalizada'], default: 'pendiente' },
  },
  { versionKey: false }
);

export default model<IClase>('Clase', claseSchema);
