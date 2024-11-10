import mongoose from 'mongoose';
import Usuario from '../models/usuario';
import Asignatura from '../models/asignatura';

////////////////////////////////////////CREAR NUEVO USUARIO//////////////////////////////////////////
export const crearUsuario = async (nombre: string, edad: number, email: string, password: string, isProfesor = false, isAlumno = false, isAdmin = false) => {
  const usuario = new Usuario({ nombre, edad, email, password, isProfesor, isAlumno, isAdmin });
  return await usuario.save();
};

////////////////////////////////////////LISTAR USUARIOS//////////////////////////////////////////
export const listarUsuarios = async () => {
  return await Usuario.find().populate('asignaturasImparte');
};

export const obtenerUsuariosPaginados = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const usuarios = await Usuario.find()
    .skip(skip)
    .limit(limit)
    .populate('asignaturasImparte');

  const total = await Usuario.countDocuments();
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    usuarios,
  };
};

//OBTENER ID DE USUARIO POR NOMBRE
export const obtenerIdUsuarioPorNombre = async (nombre: string) => {
  const usuario = await Usuario.findOne({ nombre });
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  return usuario._id;
};

export const obtenerAsignaturasDeUsuario = async (usuarioId: string) => {
  const usuario = await Usuario.findById(new mongoose.Types.ObjectId(usuarioId)).populate('asignaturasImparte');
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  return usuario.asignaturasImparte;
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

// Eliminar usuario por ID usando ObjectId
export const eliminarUsuarioPorId = async (_id: string) => {
  const objectId = new mongoose.Types.ObjectId(_id);
  return await Usuario.findOneAndDelete({ _id: objectId });
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

export const eliminarAsignaturaDeUsuarioPorId = async (usuarioId: string, asignaturaId: string) => {
  const usuarioObjectId = new mongoose.Types.ObjectId(usuarioId);
  const asignaturaObjectId = new mongoose.Types.ObjectId(asignaturaId);

  const usuario = await Usuario.findById(usuarioObjectId);
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  // Filtra el array `asignaturasImparte` para eliminar la asignatura específica
  usuario.asignaturasImparte = usuario.asignaturasImparte.filter(
    id => !id.equals(asignaturaObjectId)  // Usa `.equals()` para comparar `ObjectId`s
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

export const obtenerAsignaturasPaginadasDeUsuario = async (usuarioId: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;

  // Primero encuentra al usuario
  const usuario = await Usuario.findById(usuarioId);
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  // Cuenta el total de asignaturas antes de la paginación
  const totalAsignaturas = usuario.asignaturasImparte.length;

  // Luego aplica la paginación en la consulta
  const asignaturasPaginadas = await Usuario.findById(usuarioId)
    .populate({
      path: 'asignaturasImparte',
      options: { limit: limit, skip: skip }
    });

  return {
    total: totalAsignaturas,
    page: page,
    limit: limit,
    totalPages: Math.ceil(totalAsignaturas / limit),
    asignaturas: asignaturasPaginadas ? asignaturasPaginadas.asignaturasImparte : []
  };
};



