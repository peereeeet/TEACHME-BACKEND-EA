import mongoose, { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interfaz para el tipo GeoJSON
export interface IGeoJSON {
  type: 'Point';
  coordinates: [number, number]; // Coordenadas con longitud y latitud
}

// Interfaz para los documentos de Usuario
export interface IUsuario extends Document {
  nombre: string;
  username: string;
  fechaNacimiento: Date;
  email: string;
  password: string;
  isProfesor?: boolean;
  isAlumno?: boolean;
  isAdmin?: boolean;
  asignaturasImparte?: Types.ObjectId[];
  conectado: boolean;
  location?: IGeoJSON;
  encryptPassword(password: string): Promise<string>;
  comparePassword(password: string): Promise<boolean>;
}

// Esquema de Usuario
const usuarioSchema = new Schema<IUsuario>(
  {
    nombre: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    fechaNacimiento: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isProfesor: { type: Boolean, default: false },
    isAlumno: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    asignaturasImparte: { type: [Types.ObjectId], ref: 'Asignatura', default: [] },
    conectado: { type: Boolean, default: false },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: undefined,
      },
    },
  },
  { versionKey: false }
);

// Método para encriptar contraseña
usuarioSchema.methods.encryptPassword = async function (password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const Usuario = model<IUsuario>('Usuario', usuarioSchema);
export default Usuario;
