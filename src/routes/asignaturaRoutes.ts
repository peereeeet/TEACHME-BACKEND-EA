import * as express from 'express';
import {
  crearAsignatura,
  listarAsignaturas,
  verAsignaturaPorId,
  verAsignaturaPorNombre,
  eliminarAsignaturaPorId,
  eliminarAsignaturaPorNombre,
  obtenerAsignaturasPaginadas,
} from '../controller/asignaturaController';
import { TokenValidation } from '../middleware/verifyJWT';

const router = express.Router();

////////////////////////////////////POSTS/////////////////////////////////////
router.post('/', TokenValidation, crearAsignatura); // Crear nueva asignatura

////////////////////////////////////GETS/////////////////////////////////////
router.get('/', TokenValidation, listarAsignaturas); // Listar asignaturas
router.get('/paginacion', TokenValidation, obtenerAsignaturasPaginadas); // Obtener asignaturas con paginación
router.get('/:_id', TokenValidation, verAsignaturaPorId); // Obtener asignatura por ID
router.get('/:nombre', TokenValidation, verAsignaturaPorNombre); // Obtener asignatura por nombre

////////////////////////////////////DELETES/////////////////////////////////////
router.delete('/:_id', TokenValidation, eliminarAsignaturaPorId); // Eliminar asignatura por ID
router.delete('/:nombre', TokenValidation, eliminarAsignaturaPorNombre); // Eliminar asignatura por nombre

export default router;
