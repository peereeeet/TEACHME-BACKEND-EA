import * as express from 'express';
import {
    crearUsuario,
    obtenerIdUsuarioPorNombre,
    listarUsuarios,
    verUsuarioPorNombre,
    verUsuarioPorId,
    asignarAsignaturasAUsuario,
    actualizarUsuarioPorId,
    eliminarUsuarioPorId,
    actualizarAsignaturasUsuarioPorNombre,
    eliminarAsignaturaDeUsuarioPorNombre,
    asignarAsignaturaAUsuarioPorId,
    eliminarAsignaturaDeUsuarioPorId,
    modificarEdadUsuarioPorId,
    modificarEmailUsuarioPorId,
    modificarNombreUsuarioPorId,
    modificarPasswordUsuarioPorId,
    modificarRolUsuarioPorId,

} from '../controller/usuarioController';

const router = express.Router();


////////////////////////////////////POSTS/////////////////////////////////////
router.post('/', crearUsuario);

////////////////////////////////////GETS/////////////////////////////////////
router.get('/', listarUsuarios);
router.get('/:nombre', verUsuarioPorNombre);
router.get('/:_id', verUsuarioPorId);
router.get('/:nombre/asignaturas', obtenerIdUsuarioPorNombre);
////////////////////////////////////PUTS/////////////////////////////////////
router.put('/:nombre/asignaturas', asignarAsignaturasAUsuario);
router.put('/:_id', actualizarUsuarioPorId);
router.put('/:nombre/asignaturas/actualizar', actualizarAsignaturasUsuarioPorNombre);
router.put('/:usuarioId/asignaturas/:asignaturaId', asignarAsignaturaAUsuarioPorId);
router.put('/:_id/edad', modificarEdadUsuarioPorId);
router.put('/:_id/email', modificarEmailUsuarioPorId);
router.put('/:_id/nombre', modificarNombreUsuarioPorId);
router.put('/:_id/password', modificarPasswordUsuarioPorId);
router.put('/:_id/rol', modificarRolUsuarioPorId);
////////////////////////////////////DELETES/////////////////////////////////////
router.delete('/:usuarioId/asignaturas/:asignaturaId', eliminarAsignaturaDeUsuarioPorId);
router.delete('/:nombre/asignaturas/:asignaturaId', eliminarAsignaturaDeUsuarioPorNombre);
router.delete('/:usuarioId', eliminarUsuarioPorId);



export default router;