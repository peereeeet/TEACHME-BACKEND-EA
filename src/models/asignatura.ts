import mongoose from 'mongoose';

const asignaturaSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nombre: { type: String },
  descripcion: { type: String },
  usuarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }]
});

const Asignatura = mongoose.model('Asignatura', asignaturaSchema);
export default Asignatura;