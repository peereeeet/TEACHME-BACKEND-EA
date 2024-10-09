import mongoose from 'mongoose';

const asignaturaSchema = new mongoose.Schema({
  nombre: { type: String },
  descripcion: { type: String},
    profesores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profesor' }]
});

const Asignatura = mongoose.model('Asignatura', asignaturaSchema);
export default Asignatura;
