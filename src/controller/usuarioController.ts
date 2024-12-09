import cors from 'cors';
import { Router, Request, Response } from 'express';
import * as usuarioService from '../services/usuarioService';
import Usuario from '../models/usuario';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { io, connectedUsers } from '../app';



////////////////////////////////////////CREAR NUEVO USUARIO//////////////////////////////////////////
export async function crearUsuario(req: Request, res: Response) {
  try {
    const { nombre, edad, email, password, isProfesor, isAlumno, isAdmin } = req.body;
    const usuario = await usuarioService.crearUsuario(nombre, edad, email, password, isProfesor, isAlumno, isAdmin);
    console.log(usuario);
    res.status(201).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}


// Buscar usuarios por nombre
export const buscarUsuarios = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.query; // Obtener el parámetro "nombre" de la consulta
    if (!nombre) {
      return res.status(400).json({ error: 'El parámetro "nombre" es obligatorio.' });
    }

    const usuarios = await usuarioService.buscarUsuarios(nombre.toString());
    if (usuarios.length === 0) {
      return res.status(404).json({ error: 'No se encontraron usuarios con ese nombre.' });
    }

    // Añadir estado de conexión
    const usuariosConEstado = usuarios.map((usuario) => ({
      ...usuario.toObject(),
      conectado: connectedUsers.has((usuario._id as string)), // Forzar el tipo de `_id` como `string`
    }));

    res.status(200).json(usuariosConEstado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { email, password, lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Las coordenadas son obligatorias para el login' });
    }

    const usuario = await usuarioService.loginYGuardarCoordenadas(email, password, lat, lng);

    // Generar el token JWT
    const token = jwt.sign(
      { email: usuario.email, isAdmin: usuario.isAdmin },
      process.env.SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      usuario: {
        id: usuario._id,
        email: usuario.email,
        isAdmin: usuario.isAdmin,
        location: usuario.location,
      },
      token: token,
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

// Nuevo endpoint para obtener todas las coordenadas
export const obtenerCoordenadasUsuarios = async (req: Request, res: Response) => {
  try {
    const coordenadas = await usuarioService.obtenerCoordenadasDeUsuarios();
    res.status(200).json(coordenadas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


// Controlador para obtener usuarios conectados
export const obtenerUsuariosConectados = async (req: Request, res: Response) => {
  try {
    const usuariosConectados = Array.from(connectedUsers.keys());
    console.log('Usuarios conectados:', usuariosConectados);
    res.status(200).json(usuariosConectados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios conectados' });
  }
};


////////////////////////////////////////OBTENER ID DE USUARIO POR NOMBRE//////////////////////////////////////////
export async function obtenerIdUsuarioPorNombre(req: Request, res: Response) {
  try {
    const usuario = await usuarioService.obtenerIdUsuarioPorNombre(req.params.nombre);
    console.log(usuario);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}



////////////////////////////////////////LISTAR USUARIOS//////////////////////////////////////////
export async function listarUsuarios(req: Request, res: Response) {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    console.log(usuarios);  
    res.status(200).json(usuarios);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
////////////////////////////////////////VER USUARIO POR ID Y POR NOMBRE///////////////////////////////////
export async function verUsuarioPorNombre(req: Request, res: Response) {
  try {
    const usuario = await usuarioService.verUsuarioPorNombre(req.params.nombre);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    console.log(usuario);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function verUsuarioPorId(req: Request, res: Response) {
  try {
    const userId = req.params.id; // Asegúrate de que sea "id" y no "_id"
    console.log("ID recibido:", userId); // Log del ID recibido

    const usuario = await usuarioService.verUsuarioPorId(userId);
    if (!usuario) {
      console.log("Usuario no encontrado en la base de datos");
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    console.log("Usuario encontrado:", usuario);
    res.status(200).json(usuario);
  } catch (error: any) {
    console.error("Error al buscar usuario por ID:", error);
    res.status(500).json({ error: error.message });
  }
}


////////////////////////////////////ASIGNAR ASIGNATURAS A UN USUARIO/////////////////////////////////////
export async function asignarAsignaturasAUsuario(req: Request, res: Response) { 
  try {
    const usuario = await usuarioService.asignarAsignaturasAUsuario(req.params.nombre, req.body.asignaturas);
    console.log(usuario);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}


////////////////////////////////////ACTUALIZAR USUARIO POR ID/////////////////////////////////////
export async function actualizarUsuarioPorId(req: Request, res: Response) {
  try {
      const datos = req.body;

      // Si se incluye una contraseña, hashearla
      if (datos.password) {
          const saltRounds = 10;
          datos.password = await bcrypt.hash(datos.password, saltRounds);
      }

      const usuario = await usuarioService.actualizarUsuarioPorId(req.params._id, datos);
      console.log(usuario);
      res.status(200).json(usuario);
  } catch (error: any) {
      res.status(400).json({ error: error.message });
  }
}
export async function eliminarUsuarioPorId(req: Request, res: Response) {
  try {
    const usuario = await usuarioService.eliminarUsuarioPorId(req.params.usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
////////////////////////////////ACTUALIZAR ASIGNATURAS DE UN USUARIO POR NOMBRE/////////////////////////////////////
export async function actualizarAsignaturasUsuarioPorNombre(req: Request, res: Response) {
  try {
    const usuario = await usuarioService.actualizarAsignaturasUsuarioPorNombre(req.params.nombre, req.body.asignaturas);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
////////////////////////////////////ELIMINAR UNA ASIGNATURA DE UN USUARIO POR NOMBRE/////////////////////////////////////
export async function eliminarAsignaturaDeUsuarioPorNombre(req: Request, res: Response) {
  try {
    const usuario = await usuarioService.eliminarAsignaturaDeUsuarioPorNombre(req.params.nombre, req.params.asignaturaId);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
////////////////////////////////////ASIGNAR ASIGNATURA A UN USUARIO POR ID/////////////////////////////////////
export async function asignarAsignaturaAUsuarioPorId(req: Request, res: Response) {
  try {
    const usuario = await usuarioService.asignarAsignaturaAUsuarioPorId(req.params.usuarioId, req.params.asignaturaId);
    console.log(usuario);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
////////////////////////////////////ELIMINAR ASIGNATURA DE UN USUARIO POR ID/////////////////////////////////////
export async function eliminarAsignaturaDeUsuarioPorId(req: Request, res: Response) {
  try {
    const usuario = await usuarioService.eliminarAsignaturaDeUsuarioPorId(req.params.usuarioId, req.params.asignaturaId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario o asignatura no encontrados' });
    }
    res.status(200).json({ message: 'Asignatura desasignada con éxito', usuario });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

////////////////////////////////////añadir las funciones restantes de usuarioService.ts/////////////////////////////////////

////////////////////////////////////MODIFICAR NOMBRE DE USUARIO POR ID/////////////////////////////////////
export async function modificarNombreUsuarioPorId(req: Request, res: Response) {
  try {
    const usuario = await usuarioService.modificarNombreUsuarioPorId(req.params._id, req.body.nombre);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

////////////////////////////////////MODIFICAR EDAD DE USUARIO POR ID/////////////////////////////////////
export async function modificarEdadUsuarioPorId(req: Request, res: Response) {
  try {
    const usuario = await usuarioService.modificarEdadUsuarioPorId(req.params._id, req.body.edad);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

////////////////////////////////////MODIFICAR EMAIL DE USUARIO POR ID/////////////////////////////////////
export async function modificarEmailUsuarioPorId(req: Request, res: Response) {
  try {
    const usuario = await usuarioService.modificarEmailUsuarioPorId(req.params._id, req.body.email);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

////////////////////////////////////MODIFICAR PASSWORD DE USUARIO POR ID/////////////////////////////////////
export async function modificarPasswordUsuarioPorId(req: Request, res: Response) {
  try {
    const usuario = await usuarioService.modificarPasswordUsuarioPorId(req.params._id, req.body.password);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const obtenerAsignaturasDelUsuario = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.params.usuarioId;
    console.log("ID del usuario recibido:", usuarioId); // Verificación de ID

    const usuario = await Usuario.findById(usuarioId).populate('asignaturasImparte');
    
    if (usuario) {
      console.log("Usuario encontrado:", usuario);
      res.status(200).json(usuario.asignaturasImparte);
    } else {
      console.log("Usuario no encontrado con ID:", usuarioId);
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener las asignaturas:", error);
    res.status(500).json({ message: 'Error al obtener las asignaturas', error });
  }
};




////////////////////////////////////MODIFICAR ROL DE USUARIO POR ID/////////////////////////////////////
export async function modificarRolUsuarioPorId(req: Request, res: Response) {
  try {
    const { isProfesor, isAlumno, isAdmin } = req.body;
    const usuario = await usuarioService.modificarRolUsuarioPorId(req.params._id, isProfesor, isAlumno, isAdmin);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}


export const obtenerUsuariosPaginados = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const usuariosPaginados = await usuarioService.obtenerUsuariosPaginados(
      parseInt(page as string),
      parseInt(limit as string)
    );
    res.status(200).json(usuariosPaginados);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerAsignaturasPaginadasDeUsuario = async (req: Request, res: Response) => {
  try {
    const { usuarioId } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const asignaturasPaginadas = await usuarioService.obtenerAsignaturasPaginadasDeUsuario(
      usuarioId,
      parseInt(page as string),
      parseInt(limit as string)
    );

    res.status(200).json(asignaturasPaginadas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};