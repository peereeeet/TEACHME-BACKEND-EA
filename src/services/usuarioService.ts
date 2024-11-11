import mongoose from 'mongoose';
import Usuario from '../models/usuario';
import Asignatura from '../models/asignatura';

////////////////////////////////////////CREAR NUEVO USUARIO//////////////////////////////////////////
export const crearUsuario = async (_id: mongoose.Types.ObjectId, nombre: string, edad: number, email: string, password: string, isProfesor = false, isAlumno = false, isAdmin = false) => {
  const usuario = new Usuario({_id,  nombre, edad, email, password, isProfesor, isAlumno, isAdmin });
  return await usuario.save();
};

////////////////////////////////////////LISTAR USUARIOS//////////////////////////////////////////
export const listarUsuarios = async () => {
  return await Usuario.find().populate('asignaturasImparte');
};

//OBTENER ID DE USUARIO POR NOMBRE
export const obtenerIdUsuarioPorNombre = async (nombre: string) => {
  const usuario = await Usuario.findOne({ nombre });
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  return usuario._id;
};

////////////////////////////////////////VER USUARIO POR ID Y POR NOMBRE///////////////////////////////////
export const verUsuarioPorNombre = async (_id: string) => {
  console.log(_id);
  const usuario = await Usuario.findOne({ _id }).populate('asignaturasImparte');
  console.log(usuario);
  return usuario;
}

export const verUsuarioPorId = async (nombre: string) => {
  return await Usuario.findOne({ nombre }).populate('asignaturasImparte');
};

////////////////////////////////////////ASIGNAR ASIGNATURAS A USUARIO/////////////////////////////////
export const asignarAsignaturasAUsuario = async (nombre: string, asignaturas: string[]) => {
  const usuario = await Usuario.findOne({ nombre });
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  const asignaturasEncontradas = await Asignatura.find({ nombre: { $in: asignaturas } });
  //algo de control de errores no viene mal xd
  if (asignaturasEncontradas.length !== asignaturas.length) {
    throw new Error('Algunas asignaturas no fueron encontradas');
  }
  usuario.asignaturasImparte = asignaturasEncontradas.map(asignatura => asignatura._id);
  return await usuario.save();
};
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

////////////////////////////////////////ACTUALIZAR USUARIO (NOMBRE/ID)//////////////////////////////////////////
export const actualizarUsuarioPorId = async (_id: string, datos: any) => {
  return await Usuario.findByIdAndUpdate(_id, datos, { new: true });
};
////////////////////////////////////////ACTUALIZAR ASIGNATURAS DE USUARIO POR NOMBRE E ID///////////////////////////
export const actualizarAsignaturasUsuarioPorNombre = async (nombre: string, asignaturas: string[]) => {
  const usuario = await Usuario.findOne({ nombre });
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  const asignaturasEncontradas = await Asignatura.find({ nombre: { $in: asignaturas } });
  usuario.asignaturasImparte = asignaturasEncontradas.map(asignatura => asignatura._id);
  return await usuario.save();
};

export const actualizarAsignaturasUsuarioPorId = async (_id: string, asignaturas: string[]) => {
  const usuario = await Usuario.findById(_id);
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  const asignaturasEncontradas = await Asignatura.find({ nombre: { $in: asignaturas } });
  usuario.asignaturasImparte = asignaturasEncontradas.map(asignatura => asignatura._id);
  return await usuario.save();
}

////////////////////////////////////////ELIMINAR USUARIO//////////////////////////////////////////
export const eliminarUsuarioPorId = async (_id: string) => {
  return await Usuario.findOneAndDelete({ _id });
};

////////////////////////////////////////ELIMINAR ASIGNATURA DE USUARIO POR NOMBRE E ID//////////////////////////////////////////
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

export const eliminarAsignaturaDeUsuarioPorId = async (_id: string, asignaturaId: string) => {
  const usuarioObjectId = new mongoose.Types.ObjectId(_id);
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

////////////////////////////////////////FUNCIONES PARA MODIFICAR CAMPOS DE USUARIO///////////////////////////////

////////////////////////////////////////MODIFICAR NOMBRE DE USUARIO POR ID//////////////////////////////////////////
export const modificarNombreUsuarioPorId = async (_id: string, nombre: string) => {
  return await Usuario.findByIdAndUpdate(_id, { nombre }, { new: true });
};

////////////////////////////////////////MODIFICAR EDAD DE USUARIO POR ID//////////////////////////////////////////
export const modificarEdadUsuarioPorId = async (_id: string, edad: number) => {
  return await Usuario.findByIdAndUpdate(_id, { edad }, { new: true });
};

////////////////////////////////////////MODIFICAR EMAIL DE USUARIO POR ID//////////////////////////////////////////
export const modificarEmailUsuarioPorId = async (_id: string, email: string) => {
  return await Usuario.findByIdAndUpdate(_id, { email }, { new: true });
};

////////////////////////////////////////MODIFICAR PASSWORD DE USUARIO POR ID//////////////////////////////////////////
export const modificarPasswordUsuarioPorId = async (_id: string, password: string) => {
  return await Usuario.findByIdAndUpdate(_id, { password  }, { new: true });
}

////////////////////////////////////////MODIFICAR ROL DE USUARIO POR ID//////////////////////////////////////////
export const modificarRolUsuarioPorId = async (_id: string, isProfesor: boolean, isAlumno: boolean, isAdmin: boolean) => {
  return await Usuario.findByIdAndUpdate(_id, { isProfesor, isAlumno, isAdmin }, { new: true });
};




