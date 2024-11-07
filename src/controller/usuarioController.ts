import cors from 'cors';
import { Router, Request, Response } from 'express';
import {
  crearUsuario,
  listarUsuarios,
  verUsuarioPorNombre,
  asignarAsignaturasAUsuario,
  eliminarUsuarioPorId,
  actualizarAsignaturasUsuarioPorNombre,
  eliminarAsignaturaDeUsuarioPorNombre,
  actualizarUsuarioPorId,
  asignarAsignaturaAUsuarioPorId,
  eliminarAsignaturaDeUsuarioPorId,
} from '../services/usuarioService';

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

export default router;
