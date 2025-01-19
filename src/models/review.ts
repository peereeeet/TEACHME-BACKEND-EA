import { Schema, model, Document, Types } from 'mongoose';

// Interfaz para Review
export interface IReview extends Document {
  clase: Types.ObjectId;
  autor: Types.ObjectId;
  contenido: string;
  puntuacion: number; // Puntuación del 1 al 5
}

// Esquema de Review
const reviewSchema = new Schema<IReview>(
  {
    clase: { type: Schema.Types.ObjectId, ref: 'Clase', required: true },
    autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    contenido: { type: String, required: true },
    puntuacion: { type: Number, min: 1, max: 5, required: true },
  },
  { versionKey: false }
);

export default model<IReview>('Review', reviewSchema);
