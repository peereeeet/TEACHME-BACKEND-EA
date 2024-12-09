import mongoose, { Types } from 'mongoose';
import Usuario, { IUsuario } from '../models/usuario'; // Importamos IUsuario
import Asignatura from '../models/asignatura';
import bcrypt from 'bcrypt';

// Crear usuario
export const crearUsuario = async (
  nombre: string,
  edad: number,
  email: string,
  password: string,
  isProfesor = false,
  isAlumno = false,
  isAdmin = false
) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const usuario = new Usuario({
    nombre,
    edad,
    email,
    password: hashedPassword,
    isProfesor,
    isAlumno,
    isAdmin,
    conectado: false, // Inicializar como desconectado
  });
  return await usuario.save();
};

// Autenticar usuario
export const autenticarUsuario = async (email: string, password: string) => {
  const usuario = await Usuario.findOne({ email });
  if (!usuario) throw new Error('Usuario no encontrado');
  const isValid = await bcrypt.compare(password, usuario.password);
  if (!isValid) throw new Error('Contraseña incorrecta');
  return usuario;
};

// Login de usuario y guardar coordenadas

// Login de usuario y guardar coordenadas
export const loginYGuardarCoordenadas = async (email: string, password: string, lat: number, lng: number) => {
  const usuario = await Usuario.findOne({ email });
  if (!usuario) throw new Error('Usuario no encontrado');

  const isValid = await bcrypt.compare(password, usuario.password);
  if (!isValid) throw new Error('Contraseña incorrecta');

  // Actualizar coordenadas independientemente de su estado anterior
  usuario.location = {
      type: 'Point',
      coordinates: [lng, lat],
  };

  await usuario.save();
  return usuario;
};


// Obtener todas las coordenadas de los usuarios
export const obtenerCoordenadasDeUsuarios = async () => {
  return await Usuario.find({ location: { $exists: true } }, { location: 1, nombre: 1 });
};


// Buscar usuarios por nombre
export const buscarUsuarios = async (nombre: string) => {
  const regex = new RegExp(`^${nombre}`, 'i'); // Buscar usuarios cuyo nombre comience con el término ingresado (no sensible a mayúsculas)
  return await Usuario.find({ nombre: regex }).populate('asignaturasImparte'); // Retornar usuarios y asignaturas
};
// Obtener ID de usuario por nombre
export const obtenerIdUsuarioPorNombre = async (nombre: string) => {
  const usuario = await Usuario.findOne({ nombre });
  if (!usuario) throw new Error('Usuario no encontrado');
  return usuario._id;
};

export const findByUsername = async (username: string): Promise<IUsuario | null> => {
  return await Usuario.findOne({ nombre: username });
};

// En usuarioService.ts

export const findByEmail = async (email: string): Promise<IUsuario | null> => {
  return await Usuario.findOne({ email }); // Busca un usuario por su email
};

// Listar usuarios
export const listarUsuarios = async () => {
  return await Usuario.find().populate('asignaturasImparte');
};

// Ver usuario por nombre
export const verUsuarioPorNombre = async (nombre: string): Promise<IUsuario | null> => {
  return await Usuario.findOne({ nombre }).populate('asignaturasImparte');
};

export const verUsuarioPorId = async (_id: string): Promise<IUsuario | null> => {
  console.log("Buscando usuario con ID:", _id); // Log del ID recibido
  try {
      //const objectId = new mongoose.Types.ObjectId(_id); // Convierte a ObjectId si no lo es
      const usuario = await Usuario.findById(_id).populate('asignaturasImparte');
      console.log("Resultado de la búsqueda:", usuario); // Log del resultado
      return usuario;
  } catch (error) {
      console.error("Error en la búsqueda por ID:", error);
      throw error; // Lanza el error para que sea capturado en el controlador
  }
};


// Actualizar usuario por ID
export const actualizarUsuarioPorId = async (_id: string, datos: any) => {
  return await Usuario.findByIdAndUpdate(_id, datos, { new: true });
};

// Eliminar usuario por ID
export const eliminarUsuarioPorId = async (_id: string) => {
  return await Usuario.findByIdAndDelete(_id);
};

// Modificar nombre de usuario por ID
export const modificarNombreUsuarioPorId = async (_id: string, nombre: string) => {
  return await Usuario.findByIdAndUpdate(_id, { nombre }, { new: true });
};

// Modificar edad de usuario por ID
export const modificarEdadUsuarioPorId = async (_id: string, edad: number) => {
  return await Usuario.findByIdAndUpdate(_id, { edad }, { new: true });
};

// Modificar email de usuario por ID
export const modificarEmailUsuarioPorId = async (_id: string, email: string) => {
  return await Usuario.findByIdAndUpdate(_id, { email }, { new: true });
};

// Modificar contraseña de usuario por ID
export const modificarPasswordUsuarioPorId = async (_id: string, password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return await Usuario.findByIdAndUpdate(_id, { password: hashedPassword }, { new: true });
};

// Modificar rol de usuario por ID
export const modificarRolUsuarioPorId = async (_id: string, isProfesor: boolean, isAlumno: boolean, isAdmin: boolean) => {
  return await Usuario.findByIdAndUpdate(_id, { isProfesor, isAlumno, isAdmin }, { new: true });
};

// Obtener usuarios paginados
export const obtenerUsuariosPaginados = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const usuarios = await Usuario.find().skip(skip).limit(limit).populate('asignaturasImparte');
  const total = await Usuario.countDocuments();
  return { total, page, limit, totalPages: Math.ceil(total / limit), usuarios };
};

// Actualizar asignaturas de usuario por nombre
export const actualizarAsignaturasUsuarioPorNombre = async (nombre: string, asignaturas: string[]) => {
  const usuario = await Usuario.findOne({ nombre });
  if (!usuario) throw new Error('Usuario no encontrado');
  const asignaturasEncontradas = await Asignatura.find({ nombre: { $in: asignaturas } });
  usuario.asignaturasImparte = asignaturasEncontradas.map(asignatura => asignatura._id as Types.ObjectId);
  return await usuario.save();
};

// Eliminar asignatura de usuario por nombre
export const eliminarAsignaturaDeUsuarioPorNombre = async (nombre: string, asignaturaId: string) => {
  const usuario = await Usuario.findOne({ nombre });
  if (!usuario) throw new Error('Usuario no encontrado');

  if (!usuario.asignaturasImparte) {
    usuario.asignaturasImparte = [];
  }

  usuario.asignaturasImparte = usuario.asignaturasImparte.filter(id => id.toString() !== asignaturaId);

  return await usuario.save();
};

// Obtener asignaturas paginadas de usuario
export const obtenerAsignaturasPaginadasDeUsuario = async (usuarioId: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const usuario = await Usuario.findById(usuarioId);
  if (!usuario) throw new Error('Usuario no encontrado');

  const totalAsignaturas = usuario.asignaturasImparte?.length || 0;

  const asignaturasPaginadas = await Usuario.findById(usuarioId).populate({
    path: 'asignaturasImparte',
    options: { limit, skip },
  });

  return {
    total: totalAsignaturas,
    page,
    limit,
    totalPages: Math.ceil(totalAsignaturas / limit),
    asignaturas: asignaturasPaginadas?.asignaturasImparte || [],
  };
};

// Asignar asignaturas a usuario por nombre
export const asignarAsignaturasAUsuario = async (nombre: string, asignaturas: string[]) => {
  const usuario = await Usuario.findOne({ nombre });
  if (!usuario) throw new Error('Usuario no encontrado');

  const asignaturasEncontradas = await Asignatura.find({ nombre: { $in: asignaturas } });
  if (!usuario.asignaturasImparte) usuario.asignaturasImparte = [];
  usuario.asignaturasImparte = asignaturasEncontradas.map(asignatura => asignatura._id as Types.ObjectId);
  return await usuario.save();
};

// Asignar asignatura a usuario por ID
export const asignarAsignaturaAUsuarioPorId = async (usuarioId: string, asignaturaId: string) => {
  const usuario = await Usuario.findById(usuarioId);
  if (!usuario) throw new Error('Usuario no encontrado');
  const asignaturaObjectId = new Types.ObjectId(asignaturaId);

  if (!usuario.asignaturasImparte) usuario.asignaturasImparte = [];
  if (!usuario.asignaturasImparte.some(id => id.toString() === asignaturaObjectId.toString())) {
    usuario.asignaturasImparte.push(asignaturaObjectId);
  }
  return await usuario.save();
};

// Eliminar asignatura de usuario por ID
export const eliminarAsignaturaDeUsuarioPorId = async (usuarioId: string, asignaturaId: string) => {
  const usuario = await Usuario.findById(usuarioId);
  if (!usuario) throw new Error('Usuario no encontrado');

  if (!usuario.asignaturasImparte) usuario.asignaturasImparte = [];
  usuario.asignaturasImparte = usuario.asignaturasImparte.filter(id => id.toString() !== asignaturaId);
  return await usuario.save();
};
