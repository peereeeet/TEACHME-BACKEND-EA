import cors from 'cors';
import { Router, Request, Response } from 'express';
import * as usuarioService from '../services/usuarioService';
import Usuario from '../models/usuario';


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
    const usuario = await usuarioService.verUsuarioPorId(req.params._id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    console.log(usuario);
    res.status(200).json(usuario);
  } catch (error: any) {
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
    const usuario = await usuarioService.actualizarUsuarioPorId(req.params._id, req.body);
    console.log(usuario);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
////////////////////////////////////ELIMINAR USUARIO/////////////////////////////////////
export async function eliminarUsuarioPorId(req: Request, res: Response) {
  try {
    const usuario = await usuarioService.eliminarUsuarioPorId(req.params.id);
    console.log(listarUsuarios);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
////////////////////////////////////ACTUALIZAR ASIGNATURAS DE UN USUARIO POR NOMBRE/////////////////////////////////////
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
    const usuario = await usuarioService.eliminarAsignaturaDeUsuarioPorId(req.params.usuarioId, req.body.asignaturaId);
    console.log(usuario);  
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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

/*
const router = Router();
router.use(cors());

// Crear un nuevo usuario
router.post('/', async (req: Request, res: Response) => {
  try {
    const { nombre, edad, email, password, isProfesor, isAlumno, isAdmin } = req.body;
    const usuario = await crearUsuario(nombre, edad, email, password, isProfesor, isAlumno, isAdmin);
    res.status(201).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos los usuarios
router.get('/', async (req: Request, res: Response) => {
  try {
    const usuarios = await listarUsuarios();
    res.status(200).json(usuarios);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Ver usuario por nombre
router.get('/:nombre', async (req: Request, res: Response) => {
  try {
    const usuario = await verUsuarioPorNombre(req.params.nombre);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Asignar asignaturas a un usuario
router.put('/:nombre/asignaturas', async (req: Request, res: Response) => {
  try {
    const usuario = await asignarAsignaturasAUsuario(req.params.nombre, req.body.asignaturas);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar usuario por ID
router.put('/:_id', async (req: Request, res: Response) => {
  try {
    const usuario = await actualizarUsuarioPorId(req.params._id, req.body);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar usuario por nombre
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const usuario = await eliminarUsuarioPorId(req.params.id);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar asignaturas de un usuario por nombre
router.put('/:nombre/asignaturas/actualizar', async (req: Request, res: Response) => {
  try {
    const usuario = await actualizarAsignaturasUsuarioPorNombre(req.params.nombre, req.body.asignaturas);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una asignatura de un usuario por nombre
router.delete('/:nombre/asignaturas/:asignaturaId', async (req: Request, res: Response) => {
  try {
    const usuario = await eliminarAsignaturaDeUsuarioPorNombre(req.params.nombre, req.params.asignaturaId);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para agregar asignatura a un usuario por _id
router.put('/:usuarioId/asignaturas/:asignaturaId', async (req: Request, res: Response) => {
  try {
    const usuario = await asignarAsignaturaAUsuarioPorId(req.params.usuarioId, req.params.asignaturaId);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para eliminar asignatura de un usuario por _id
router.delete('/:usuarioId/asignaturas/:asignaturaId', async (req: Request, res: Response) => {
  try {
    const usuario = await eliminarAsignaturaDeUsuarioPorId(req.params.usuarioId, req.params.asignaturaId);
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
*/
