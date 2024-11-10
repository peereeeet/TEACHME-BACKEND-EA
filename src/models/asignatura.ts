import mongoose from 'mongoose';

const asignaturaSchema = new mongoose.Schema({

  nombre: { type: String },
  descripcion: { type: String },
  usuarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }]
});

const Asignatura = mongoose.model('Asignatura', asignaturaSchema);
export default Asignatura;