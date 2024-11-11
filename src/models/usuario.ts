// usuario.ts (modelo)
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true , required: true },
  nombre: { type: String },
  edad: { type: Number },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isProfesor: { type: Boolean, default: false },
  isAlumno: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  asignaturasImparte: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asignatura' }]
}, { versionKey: false });
 
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;
