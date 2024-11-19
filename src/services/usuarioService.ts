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
////////////////////////////////////////EJERCICIO SEMINARIO 7//////////////////////////////////////////
////////////////////////////////////////LISTAR USUARIOS CON PERMISO DE ADMIN//////////////////////////////////////////
export const listarUsuariosAdmin = async (_id: string) => {
  const usuario = await Usuario.findOne({ _id });
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  if (usuario && usuario.isAdmin === true) {
    return await Usuario.find().populate('asignaturasImparte');
  }
  
  return 'No tienes permisos para ver la lista de usuarios';
}
//CON NOMBRE 
export const listarUsuariosAdminNombre = async (nombre: string) => {
  const usuario = await Usuario.findOne({ nombre });
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  if (usuario && usuario.isAdmin === true) {
    return await Usuario.find().populate('asignaturasImparte');
  }
  
  return 'No tienes permisos para ver la lista de usuarios';
}


////////////////////////////////////////VER USUARIO POR ID Y POR NOMBRE///////////////////////////////////
export const verUsuarioPorId = async (_id: string) => {
  const usuario = await Usuario.findOne({ _id }).populate('asignaturasImparte');
  console.log(usuario);
  return usuario;
};

export const verUsuarioPorNombre = async (nombre: string) => {
  return await Usuario.findOne({ nombre }).populate('asignaturasImparte');
};

////////////////////////////////////////ASIGNAR ASIGNATURAS A USUARIO/////////////////////////////////
export const asignarAsignaturasAUsuarioEmail = async (email: string, asignaturas: string[]) => {
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  // Buscar las asignaturas solicitadas
  const asignaturasEncontradas = await Asignatura.find({ nombre: { $in: asignaturas } });
  if (asignaturasEncontradas.length !== asignaturas.length) {
    throw new Error('Algunas asignaturas no fueron encontradas, te has inventado el nombre?');
  }

  // Obtener IDs de las asignaturas encontradas
  const nuevosIds = asignaturasEncontradas.map(asignatura => asignatura._id);

  // Combinar las asignaturas existentes con las nuevas, eliminando duplicados
  const asignaturasActualizadas = Array.from(
    new Set([...usuario.asignaturasImparte.map(id => id.toString()), ...nuevosIds.map(id => id.toString())])
  );

  // Convertir de nuevo a ObjectId
  usuario.asignaturasImparte = asignaturasActualizadas.map(id => new mongoose.Types.ObjectId(id));

  // Guardar y devolver el usuario actualizado
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
  return await Usuario.findByIdAndUpdate(_id, datos);
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
  const resultado = await Usuario.findOneAndDelete({ _id });
  return await resultado;
};

/*export const eliminarUsuarioPorNombre = async (nombre: string) => {
  const resultado = await Usuario.findOneAndDelete({ nombre });
  return await resultado;
};
*/

////////////////////////////////////////ELIMINAR ASIGNATURA DE USUARIO POR EMAIL E ID//////////////////////////////////////////
export const eliminarAsignaturasDeUsuarioPorEmail = async (email: string, asignaturas: string[]) => {
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
  let asignaturasEliminadas: boolean[] = [];
  for (const asignatura of asignaturas) {
    let asignaturaId: mongoose.Types.ObjectId;

    if (mongoose.Types.ObjectId.isValid(asignatura)) {
      asignaturaId = new mongoose.Types.ObjectId(asignatura);
    } else {
      
      const asignaturaEncontrada = await Asignatura.findOne({ nombre: asignatura });
      if (!asignaturaEncontrada) {
        asignaturasEliminadas.push(false);
        continue;
      }
      asignaturaId = asignaturaEncontrada._id;
    }

    const asignaturasActuales = usuario.asignaturasImparte.map(id => id.toString());
    const index = asignaturasActuales.indexOf(asignaturaId.toString());

    if (index === -1) {
      asignaturasEliminadas.push(false); 
    } else {
      usuario.asignaturasImparte.splice(index, 1);
      asignaturasEliminadas.push(true);
    }
  }
  await usuario.save();

  return usuario;
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




