import mongoose from 'mongoose';
import Usuario from '../models/usuario';
import Asignatura from '../models/asignatura';

export const crearUsuario = async (nombre: string, edad: number, email: string, password: string, isProfesor = false, isAlumno = false, isAdmin = false) => {
  const usuario = new Usuario({ nombre, edad, email, password, isProfesor, isAlumno, isAdmin });
  return await usuario.save();
};

export const listarUsuarios = async () => {
  return await Usuario.find().populate('asignaturasImparte');
};

export const verUsuarioPorNombre = async (nombre: string) => {
  return await Usuario.findOne({ nombre }).populate('asignaturasImparte');
};

export const asignarAsignaturasAUsuario = async (nombre: string, asignaturas: string[]) => {
  const usuario = await Usuario.findOne({ nombre });
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  const asignaturasEncontradas = await Asignatura.find({ nombre: { $in: asignaturas } });
  usuario.asignaturasImparte = asignaturasEncontradas.map(asignatura => asignatura._id);
  return await usuario.save();
};

export const actualizarUsuarioPorId = async (id: string, datos: any) => {
  return await Usuario.findByIdAndUpdate(id, datos, { new: true });
};

export const eliminarUsuarioPorId = async (_id: string) => {
  return await Usuario.findOneAndDelete({ _id });
};

export const actualizarAsignaturasUsuarioPorNombre = async (nombre: string, asignaturas: string[]) => {
  const usuario = await Usuario.findOne({ nombre });
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  const asignaturasEncontradas = await Asignatura.find({ nombre: { $in: asignaturas } });
  usuario.asignaturasImparte = asignaturasEncontradas.map(asignatura => asignatura._id);
  return await usuario.save();
};

export const eliminarAsignaturaDeUsuarioPorNombre = async (nombre: string, asignaturaId: string) => {
  const usuario = await Usuario.findOne({ nombre });
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  usuario.asignaturasImparte = usuario.asignaturasImparte.filter(
    id => id.toString() !== asignaturaId
  );
  return await usuario.save();
};

// Función para agregar una asignatura a un usuario por _id
export const asignarAsignaturaAUsuarioPorId = async (usuarioId: string, asignaturaId: string) => {
  const usuarioObjectId = new mongoose.Types.ObjectId(usuarioId);
  const asignaturaObjectId = new mongoose.Types.ObjectId(asignaturaId);

  const usuario = await Usuario.findById(usuarioObjectId);
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  if (!usuario.asignaturasImparte.includes(asignaturaObjectId)) {
    usuario.asignaturasImparte.push(asignaturaObjectId);
  }

  return await usuario.save();
};

// Función para eliminar una asignatura de un usuario por _id
export const eliminarAsignaturaDeUsuarioPorId = async (usuarioId: string, asignaturaId: string) => {
  const usuarioObjectId = new mongoose.Types.ObjectId(usuarioId);
  const asignaturaObjectId = new mongoose.Types.ObjectId(asignaturaId);

  const usuario = await Usuario.findById(usuarioObjectId);
  if (!usuario) {
    throw new Error('Usuario no encontrado'+usuarioObjectId);
  }

  usuario.asignaturasImparte = usuario.asignaturasImparte.filter(
    id => id.toString() !== asignaturaObjectId.toString()
  );

  return await usuario.save();
};