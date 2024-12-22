import mongoose, { Types } from 'mongoose';
import Usuario, { IUsuario } from '../models/usuario';
import Asignatura from '../models/asignatura';
import bcrypt from 'bcrypt';

// Crear usuario
export const crearUsuario = async (
  nombre: string,
  username: string,
  fechaNacimiento: Date,
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
    username,
    fechaNacimiento,
    email,
    password: hashedPassword,
    isProfesor,
    isAlumno,
    isAdmin,
    conectado: false,
  });
  return await usuario.save();
};

export const obtenerTodosLosUsuarios = async () => {
  try {
    const usuarios = await Usuario.find();
    return usuarios;
  } catch (error: any) {
    throw new Error(`Error al obtener los usuarios: ${error.message}`);
  }
};

// Modificar edad de usuario por ID
export const modificarEdadUsuarioPorId = async (_id: string, edad: number) => {
  return await Usuario.findByIdAndUpdate(_id, { edad }, { new: true });
};

// Modificar rol de usuario por ID
export const modificarRolUsuarioPorId = async (
  _id: string,
  isProfesor?: boolean,
  isAlumno?: boolean,
  isAdmin?: boolean
) => {
  const updates: Partial<IUsuario> = {};
  if (isProfesor !== undefined) updates.isProfesor = isProfesor;
  if (isAlumno !== undefined) updates.isAlumno = isAlumno;
  if (isAdmin !== undefined) updates.isAdmin = isAdmin;

  return await Usuario.findByIdAndUpdate(_id, updates, { new: true });
};

// Login de usuario y guardar coordenadas
export const loginYGuardarCoordenadas = async (
  identifier: string,
  password: string,
  lat: number,
  lng: number
) => {
  const usuario = await Usuario.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!usuario) throw new Error('Usuario no encontrado');

  const isValid = await bcrypt.compare(password, usuario.password);
  if (!isValid) throw new Error('Contraseña incorrecta');

  // Guardar las coordenadas del usuario
  usuario.location = {
    type: 'Point',
    coordinates: [lng, lat],
  };
  await usuario.save();

  // Devolver todos los atributos relevantes del usuario
  return {
    id: usuario._id,
    nombre: usuario.nombre,
    username: usuario.username,
    email: usuario.email,
    fechaNacimiento: usuario.fechaNacimiento,
    isProfesor: usuario.isProfesor,
    isAlumno: usuario.isAlumno,
    isAdmin: usuario.isAdmin,
    location: usuario.location,
    conectado: usuario.conectado,
    asignaturasImparte: usuario.asignaturasImparte,
  };
};


// Obtener todas las coordenadas de los usuarios
export const obtenerCoordenadasDeUsuarios = async () => {
  return await Usuario.find(
    { location: { $exists: true } },
    { location: 1, nombre: 1, username: 1 }
  );
};

// Buscar usuarios por nombre
export const buscarUsuarios = async (nombre: string) => {
  const regex = new RegExp(`^${nombre}`, 'i');
  return await Usuario.find({ nombre: regex }).populate('asignaturasImparte');
};

// Obtener ID de usuario por nombre
export const obtenerIdUsuarioPorNombre = async (nombre: string) => {
  const usuario = await Usuario.findOne({ nombre });
  if (!usuario) throw new Error('Usuario no encontrado');
  return usuario._id;
};

// Obtener usuario por nombre
export const findByUsername = async (username: string): Promise<IUsuario | null> => {
  return await Usuario.findOne({ username });
};

// Obtener usuario por email
export const findByEmail = async (email: string): Promise<IUsuario | null> => {
  return await Usuario.findOne({ email });
};

// Listar usuarios
export const listarUsuarios = async () => {
  return await Usuario.find().populate('asignaturasImparte');
};

// Ver usuario por nombre
export const verUsuarioPorNombre = async (nombre: string): Promise<IUsuario | null> => {
  return await Usuario.findOne({ nombre }).populate('asignaturasImparte');
};

// Ver usuario por ID
export const verUsuarioPorId = async (_id: string): Promise<IUsuario | null> => {
  return await Usuario.findById(_id).populate('asignaturasImparte');
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

  usuario.asignaturasImparte = usuario.asignaturasImparte?.filter(
    id => id.toString() !== asignaturaId
  );

  return await usuario.save();
};

// Obtener asignaturas paginadas de usuario
export const obtenerAsignaturasPaginadasDeUsuario = async (
  usuarioId: string,
  page: number,
  limit: number
) => {
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
  usuario.asignaturasImparte = asignaturasEncontradas.map(asignatura => asignatura._id as Types.ObjectId);
  return await usuario.save();
};

// Asignar asignatura a usuario por ID
export const asignarAsignaturaAUsuarioPorId = async (usuarioId: string, asignaturaId: string) => {
  const usuario = await Usuario.findById(usuarioId);
  if (!usuario) throw new Error('Usuario no encontrado');
  const asignaturaObjectId = new Types.ObjectId(asignaturaId);

  usuario.asignaturasImparte = usuario.asignaturasImparte || [];
  if (!usuario.asignaturasImparte.some(id => id.toString() === asignaturaObjectId.toString())) {
    usuario.asignaturasImparte.push(asignaturaObjectId);
  }
  return await usuario.save();
};

// Eliminar asignatura de usuario por ID
export const eliminarAsignaturaDeUsuarioPorId = async (usuarioId: string, asignaturaId: string) => {
  const usuario = await Usuario.findById(usuarioId);
  if (!usuario) throw new Error('Usuario no encontrado');

  usuario.asignaturasImparte = usuario.asignaturasImparte?.filter(
    id => id.toString() !== asignaturaId
  );

  return await usuario.save();
};
