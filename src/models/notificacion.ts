import { Schema, model, Document, Types } from 'mongoose';

// Interfaz para Notificación
export interface INotification extends Document {
  userId: Types.ObjectId;
  descripcion: string;
  fecha: Date;
  leida: boolean;
}

// Esquema de Notificación
const notificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    leida: { type: Boolean, default: false },
  },
  { versionKey: false }
);

export default model<INotification>('Notification', notificationSchema);
