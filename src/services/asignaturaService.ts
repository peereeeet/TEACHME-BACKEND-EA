import mongoose from 'mongoose';
import Asignatura from '../models/asignatura';
import Usuario from '../models/usuario';

/////////////////////////////////////CREAR NUEVA ASIGNATURA//////////////////////////////////////////
export const crearAsignatura = async (nombre: string, descripcion: string) => {
  const asignatura = new Asignatura({nombre, descripcion });
  return await asignatura.save();
};

////////////////////////////////////MODIFICAR NOMBRE ASIGNATURA POR ID////////////////////////////
export const modificarNombreAsignaturaPorId = async (_id: string, nombre: string) => {
  return await Asignatura.findByIdAndUpdate(_id, { nombre }, { new: true });
}

////////////////////////////////////MODIFICAR DESCRIPCION ASIGNATURA POR ID////////////////////////////
export const modificarDescripcionAsignaturaPorId = async (_id: string, descripcion: string) => {
  return await Asignatura.findByIdAndUpdate(_id, { descripcion }, { new: true });
}

/////////////////////////////////// LISTAR TODAS LAS ASIGNATURAS/////////////////////////////////////
export const listarAsignaturas = async () => {
  return await Asignatura.find().populate('usuarios');
};

//////////////////////////////////////VER ASIGNATURA POR NOMBRE E ID///////////////////////////////////////
export const verAsignaturaPorId = async (_id: string) => {
  return await Asignatura.findOne({ _id }).populate('usuarios');
};

export const verAsignaturaPorNombre = async (nombre: string) => {
  return await Asignatura.findOne({ nombre }).populate('usuarios');
};


//////////////////////////////////////ASIGNAR USUARIOS A ASIGNATURA POR NOMBRE E ID//////////////////////
export const asignarUsuariosAAsignaturaPorNombre = async (nombreAsignatura: string, nombresUsuarios: string[]) => {
  const asignatura = await Asignatura.findOne({ nombre: nombreAsignatura });

  if (!asignatura) {
    throw new Error('Asignatura no encontrada');
  }

  const usuarios = await Usuario.find({ nombre: { $in: nombresUsuarios } });

  if (usuarios.length === 0) {
    throw new Error('Usuarios no encontrados');
  }

  asignatura.usuarios = asignatura.usuarios.concat(usuarios.map(u => u._id));
  await asignatura.save();
  return asignatura;
};

export const asignarUsuariosAAsignaturaPorId = async (_id: string, nombresUsuarios: string[]) => {
  const asignatura = await Asignatura.findById(_id);

  if (!asignatura) {
    throw new Error('Asignatura no encontrada');
  }

  const usuarios = await Usuario.find({ nombre: { $in: nombresUsuarios } });

  if (usuarios.length === 0) {
    throw new Error('Usuarios no encontrados');
  }

  asignatura.usuarios = asignatura.usuarios.concat(usuarios.map(u => u._id));
  await asignatura.save();
  return asignatura;
}



export const eliminarAsignaturaPorId = async (_id: string) => {
  try {
    const objectId = new mongoose.Types.ObjectId(_id);
    const resultado = await Asignatura.findByIdAndDelete(objectId);
    return resultado;
  } catch (error) {
    console.error("Error en eliminarAsignaturaPorId:", error);
    throw error;
  }
};

export const eliminarAsignaturaPorNombre = async (nombre: string) => {
  const resultado = await Asignatura.findOneAndDelete({ nombre });
  return resultado;
}

export const obtenerAsignaturasPaginadas = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const asignaturas = await Asignatura.find()
    .skip(skip)
    .limit(limit);

  const total = await Asignatura.countDocuments();
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    asignaturas,
  };
};

