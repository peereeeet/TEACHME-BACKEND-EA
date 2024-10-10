import mongoose from 'mongoose';

const profesorSchema = new mongoose.Schema({
  nombre: { type: String},
  edad: { type: Number },
  asignaturasImparte: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asignatura' }]
}, { versionKey: false });

  
const Profesor = mongoose.model('Profesor', profesorSchema);
export default Profesor;
