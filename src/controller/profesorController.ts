import cors from 'cors';
import { Router, Request, Response } from 'express';
import {
  crearProfesor,
  listarProfesores,
  verProfesorPorNombre,
  asignarAsignaturasAProfesor,
  eliminarProfesorPorNombre,
  actualizarAsignaturasProfesorPorNombre,
  eliminarAsignaturaDeProfesorPorNombre,

} from '../services/profesorService';

const router = Router();
router.use(cors());

///////////////////////////////////////CREAR PROFESOR//////////////////////////////////////
router.post('/', async (req: Request, res: Response) => {
  try {
    const { nombre, edad } = req.query; 
    const profesor = await crearProfesor(String(nombre), Number(edad)); 
    res.status(201).json(profesor);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});


///////////////////////////////////////LISTAR PROFESORES//////////////////////////////////////
router.get('/', async (req: Request, res: Response) => {
  try {
    const profesores = await listarProfesores();
    res.status(200).json(profesores);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

///////////////////////////////////////VER PROFESOR POR NOMBRE/////////////////////////////////////
router.get('/:nombre', async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const profesor = await verProfesorPorNombre(nombre);
    if (!profesor) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }
    res.status(200).json(profesor);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

////////////////////////////////ASIGNAR ASIGNATURAS A PROFESOR/////////////////////////////////////
router.put('/:nombre/asignaturas', async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const { nombresAsignaturas } = req.body;
    const profesor = await asignarAsignaturasAProfesor(nombre, nombresAsignaturas);
    res.status(200).json(profesor);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});
/////////////////////////////////////////////ELIMINAR ASIGNATURA DE PROFESOR POR NOMBRE//////////////////////////////////
router.delete('/:nombre/asignaturas', async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const { nombreAsignatura } = req.body;
    const profesor = await eliminarAsignaturaDeProfesorPorNombre(nombre, nombreAsignatura);
    res.status(200).json(profesor);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

////////////////////////////////ELIMINAR PROFESOR POR NOMBRE///////////////////////////////////////
router.delete('/:nombre', async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const resultado = await eliminarProfesorPorNombre(nombre);
    if (!resultado) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }
    // Devuelve 204 No Content ya que el profesor fue eliminado
    res.status(204).send();
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

////////////////////////////////ACTUALIZAR ASIGNATURAS DE PROFESOR POR NOMBRE///////////////////////////
router.put('/:nombre/asignaturas/actualizar', async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const { nuevasAsignaturas } = req.body;
    const profesor = await actualizarAsignaturasProfesorPorNombre(nombre, nuevasAsignaturas);
    res.status(200).json(profesor);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});


export default router;
