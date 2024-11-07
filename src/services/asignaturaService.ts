import Asignatura from '../models/asignatura';
import Usuario from '../models/usuario';

/////////////////////////////////////CREAR NUEVA ASIGNATURA//////////////////////////////////////////
export const crearAsignatura = async (nombre: string, descripcion: string) => {
  const asignatura = new Asignatura({ nombre, descripcion });
  return await asignatura.save();
};

/////////////////////////////////// LISTAR TODAS LAS ASIGNATURAS/////////////////////////////////////
export const listarAsignaturas = async () => {
  return await Asignatura.find().populate('profesores');
};

//////////////////////////////////////VER ASIGNATURA POR NOMBRE///////////////////////////////////////
export const verAsignaturaPorId = async (_id: string) => {
  return await Asignatura.findOne({ _id }).populate('profesores');
};

//////////////////////////////////////ASIGNAR PROFESORES A ASIGNATURA/////////////////////////////////
export const asignarProfesoresAAsignatura = async (nombreAsignatura: string, nombresProfesores: string[]) => {
  const asignatura = await Asignatura.findOne({ nombre: nombreAsignatura });

  if (!asignatura) {
    throw new Error('Asignatura no encontrada');
  }

  const profesores = await Usuario.find({ nombre: { $in: nombresProfesores }, isProfesor: true });

  if (profesores.length === 0) {
    throw new Error('Profesores no encontrados');
  }

  profesores.forEach(profesor => asignatura.profesores.push(profesor._id));
  await asignatura.save();
  return asignatura;
};

//////////////////////////////////////ELIMINAR ASIGNATURA POR NOMBRE//////////////////////////////////
export const eliminarAsignaturaPorId = async (_id: string) => {
  const resultado = await Asignatura.findOneAndDelete({ _id });
  return resultado;
};

//////////////////////////////////////ELIMINAR PROFESORES DE ASIGNATURA POR NOMBRE////////////////////
export const eliminarProfesoresAsignaturaPorNombre = async (nombreAsignatura: string, nombresProfesores: string[]) => {
  const asignatura = await Asignatura.findOne({ nombre: nombreAsignatura });

  if (!asignatura) {
    throw new Error('Asignatura no encontrada');
  }

  const profesores = await Usuario.find({ nombre: { $in: nombresProfesores }, isProfesor: true });

  if (profesores.length === 0) {
    throw new Error('Profesores no encontrados');
  }

  asignatura.profesores = asignatura.profesores.filter(
    profesor => !profesores.map(p => p._id).includes(profesor)
  );
  await asignatura.save();
  return asignatura;
};

//////////////////////////////////////ACTUALIZAR PROFESORES DE ASIGNATURA POR NOMBRE///////////////////
export const actualizarProfesoresAsignaturaPorNombre = async (nombreAsignatura: string, nuevosProfesores: string[]) => {
  const asignatura = await Asignatura.findOne({ nombre: nombreAsignatura });

  if (!asignatura) {
    throw new Error('Asignatura no encontrada');
  }

  const profesores = await Usuario.find({ nombre: { $in: nuevosProfesores }, isProfesor: true });

  if (profesores.length === 0) {
    throw new Error('Profesores no encontrados');
  }

  asignatura.profesores = profesores.map(profesor => profesor._id);
  await asignatura.save();
  return asignatura;
};
