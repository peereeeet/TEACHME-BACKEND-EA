import { Router, Request, Response } from 'express';
import {
  crearAsignatura,
  listarAsignaturas,
  verAsignaturaPorId,
  asignarProfesoresAAsignatura,
  eliminarAsignaturaPorId,
  actualizarProfesoresAsignaturaPorNombre,
} from '../services/asignaturaService';

const router = Router();

// Crear una nueva asignatura
router.post('/', async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion } = req.body;
    const asignatura = await crearAsignatura(nombre, descripcion);
    res.status(201).json(asignatura);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

// Listar todas las asignaturas
router.get('/', async (req: Request, res: Response) => {
  try {
    const asignaturas = await listarAsignaturas();
    res.status(200).json(asignaturas);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Ver una asignatura por id
router.get('/:_id', async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const asignatura = await verAsignaturaPorId(_id);
    if (!asignatura) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.status(200).json(asignatura);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Asignar profesores a una asignatura
router.put('/:nombre/asignar-profesores', async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const { nombresProfesores } = req.body;
    const asignatura = await asignarProfesoresAAsignatura(nombre, nombresProfesores);
    res.status(200).json(asignatura);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

// Eliminar una asignatura por id
router.delete('/:_id', async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const resultado = await eliminarAsignaturaPorId(_id);
    if (!resultado) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.status(204).send(); // No hay contenido que devolver
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Actualizar profesores de una asignatura por nombre
router.put('/:nombre/actualizar-profesores', async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const { nuevosProfesores } = req.body;
    const asignatura = await actualizarProfesoresAsignaturaPorNombre(nombre, nuevosProfesores);
    res.status(200).json(asignatura);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

export default router;
