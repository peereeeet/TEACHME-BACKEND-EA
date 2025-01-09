import mongoose from 'mongoose';
import Asignatura from '../models/asignatura';
import Usuario from '../models/usuario';
import { Types } from 'mongoose';

/////////////////////////////////////CREAR NUEVA ASIGNATURA//////////////////////////////////////////
export const crearAsignatura = async (nombre: string, nivel: string) => {
  const asignatura = new Asignatura({ nombre, nivel });
  return await asignatura.save();
};

////////////////////////////////////MODIFICAR NOMBRE ASIGNATURA POR ID////////////////////////////
export const modificarNombreAsignaturaPorId = async (_id: string, nombre: string) => {
  return await Asignatura.findByIdAndUpdate(_id, { nombre }, { new: true });
};

/////////////////////////////////// LISTAR TODAS LAS ASIGNATURAS/////////////////////////////////////
export const listarAsignaturas = async () => {
  return await Asignatura.find();
};

//////////////////////////////////////VER ASIGNATURA POR NOMBRE E ID///////////////////////////////////////
export const verAsignaturaPorId = async (_id: string) => {
  return await Asignatura.findById(_id);
};

export const verAsignaturaPorNombre = async (nombre: string) => {
  return await Asignatura.findOne({ nombre });
};

//////////////////////////////////////ELIMINAR ASIGNATURA POR NOMBRE E ID//////////////////////
export const eliminarAsignaturaPorId = async (_id: string) => {
  return await Asignatura.findByIdAndDelete(_id);
};

export const eliminarAsignaturaPorNombre = async (nombre: string) => {
  return await Asignatura.findOneAndDelete({ nombre });
};

//////////////////////////////////////OBTENER ASIGNATURAS PAGINADAS//////////////////////////////////////
export const obtenerAsignaturasPaginadas = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const asignaturas = await Asignatura.find().skip(skip).limit(limit);
  const total = await Asignatura.countDocuments();
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    asignaturas,
  };
};
