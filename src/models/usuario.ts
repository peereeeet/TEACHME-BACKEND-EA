import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({

  nombre: { type: String },
  edad: { type: Number },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isProfesor: { type: Boolean, default: false },
  isAlumno: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  asignaturasImparte: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asignatura' }]
}, { versionKey: false });

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;
