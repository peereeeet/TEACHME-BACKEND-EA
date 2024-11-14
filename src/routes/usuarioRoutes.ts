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
import { verifyToken, isOwner } from '../middlewares/authJWT';


const router = express.Router();


////////////////////////////////////POSTS/////////////////////////////////////
router.post('/',crearUsuario);

////////////////////////////////////GETS/////////////////////////////////////
router.get('/', listarUsuarios);
router.get('/:nombre', verUsuarioPorNombre);
router.get('/:_id', verUsuarioPorId);
router.get('/:nombre/asignaturas', obtenerIdUsuarioPorNombre);
////////////////////////////////////PUTS/////////////////////////////////////
router.put('/:nombre/asignaturas',verifyToken, isOwner, asignarAsignaturasAUsuario);
router.put('/:_id',verifyToken, isOwner, actualizarUsuarioPorId);
router.put('/:nombre/asignaturas/actualizar',verifyToken, isOwner, actualizarAsignaturasUsuarioPorNombre);
router.put('/:usuarioId/asignaturas/:asignaturaId',verifyToken, isOwner, asignarAsignaturaAUsuarioPorId);
router.put('/:_id/edad',verifyToken, isOwner, modificarEdadUsuarioPorId);
router.put('/:_id/email',verifyToken, isOwner, modificarEmailUsuarioPorId);
router.put('/:_id/nombre',verifyToken, isOwner, modificarNombreUsuarioPorId);
router.put('/:_id/password',verifyToken, isOwner, modificarPasswordUsuarioPorId);
router.put('/:_id/rol',verifyToken, isOwner, modificarRolUsuarioPorId);
////////////////////////////////////DELETES/////////////////////////////////////
router.delete('/:usuarioId/asignaturas/:asignaturaid',verifyToken, isOwner, eliminarAsignaturaDeUsuarioPorId);
router.delete('/:nombre/asignaturas/:asignaturaId',verifyToken, isOwner, eliminarAsignaturaDeUsuarioPorNombre);
router.delete('/usuarioId',verifyToken, isOwner, eliminarUsuarioPorId);



export default router;