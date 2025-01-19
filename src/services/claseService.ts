import Clase, { IClase } from '../models/clase';
import Usuario from '../models/usuario';
import { Types } from 'mongoose';

// Crear clase
export const crearClase = async (
  profesor: string,
  alumno: string,
  asignatura: string,
  fecha: Date,
  duracion: number
) => {
  const clase = new Clase({
    profesor: new Types.ObjectId(profesor),
    alumno: new Types.ObjectId(alumno),
    asignatura: new Types.ObjectId(asignatura),
    fecha,
    duracion,
  });
  return await clase.save();
};

// Finalizar clase (manual)
export const finalizarClase = async (id: string) => {
  return await Clase.findByIdAndUpdate(id, { estado: 'finalizada' }, { new: true });
};

// Detectar automáticamente clases finalizadas
export const finalizarClasesAutomaticamente = async () => {
  const now = new Date();
  const clasesPendientes = await Clase.find({ estado: 'pendiente', fecha: { $lt: now } });
  for (const clase of clasesPendientes) {
    clase.estado = 'finalizada';
    await clase.save();
  }
};

// Listar clases de un usuario
export const listarClasesDeUsuario = async (usuarioId: string, rol: 'profesor' | 'alumno') => {
  try {
    const filtro = rol === 'profesor' ? { profesor: new Types.ObjectId(usuarioId) } : { alumno: new Types.ObjectId(usuarioId) };
    return await Clase.find(filtro).populate(['profesor', 'alumno', 'asignatura']);
  } catch (error: any) {
    throw new Error(`Error al listar clases: ${error.message}`);
  }
};

// Nueva función para listar todas las clases
export const listarTodasLasClases = async () => {
  try {
    return await Clase.find().populate(['profesor', 'alumno', 'asignatura']);
  } catch (error: any) {
    throw new Error(`Error al listar todas las clases: ${error.message}`);
  }
};
