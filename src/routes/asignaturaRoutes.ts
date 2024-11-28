import * as express from 'express';
import {
    crearAsignatura,
    listarAsignaturas,
    verAsignaturaPorId,
    verAsignaturaPorNombre,
    eliminarAsignaturaPorId,
    eliminarAsignaturaPorNombre,
    asignarUsuariosAAsignaturaPorId,
    asignarUsuariosAAsignaturaPorNombre,
    obtenerAsignaturasPaginadas
} from '../controller/asignaturaController';
import { TokenValidation } from '../middleware/verifyJWT';
import { AdminValidation } from '../middleware/verifyAdmin';

const router = express.Router();

////////////////////////////////////POSTS/////////////////////////////////////
router.post('/', TokenValidation, AdminValidation, crearAsignatura); // Solo administradores pueden crear asignaturas
router.get('/paginacion', TokenValidation, AdminValidation, obtenerAsignaturasPaginadas); // Paginación protegida por autenticación

////////////////////////////////////GETS/////////////////////////////////////
//router.get('/', TokenValidation, listarAsignaturas); // Listar asignaturas protegido
router.get('/', listarAsignaturas); // Listar asignaturas protegido

router.get('/:_id', TokenValidation, verAsignaturaPorId); // Obtener asignatura por ID protegido
router.get('/:nombre', TokenValidation, verAsignaturaPorNombre); // Obtener asignatura por nombre protegido

////////////////////////////////////PUTS/////////////////////////////////////
router.put('/:nombre/usuario', TokenValidation, AdminValidation, asignarUsuariosAAsignaturaPorNombre); // Asignar usuarios a asignaturas (nombre)
router.put('/:_id/usuario', TokenValidation, AdminValidation, asignarUsuariosAAsignaturaPorId); // Asignar usuarios a asignaturas (ID)

////////////////////////////////////DELETES/////////////////////////////////////
router.delete('/:_id', TokenValidation, AdminValidation, eliminarAsignaturaPorId); // Solo administradores pueden eliminar asignaturas
router.delete('/:nombre', TokenValidation, AdminValidation, eliminarAsignaturaPorNombre); // Solo administradores pueden eliminar asignaturas por nombre

export default router;
