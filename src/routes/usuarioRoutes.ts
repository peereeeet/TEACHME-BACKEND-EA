import * as express from 'express';
import {
    crearUsuario,
    listarUsuarios,
    verUsuarioPorNombre,
    verUsuarioPorId,
    asignarAsignaturasAUsuarioEmail,
    actualizarUsuarioPorId,
    eliminarUsuarioPorId,
    actualizarAsignaturasUsuarioPorNombre,
    eliminarAsignaturaDeUsuarioPorEmail,
    asignarAsignaturaAUsuarioPorId,
    eliminarAsignaturaDeUsuarioPorId,
    modificarEdadUsuarioPorId,
    modificarEmailUsuarioPorId,
    modificarNombreUsuarioPorId,
    modificarPasswordUsuarioPorId,
    modificarRolUsuarioPorId,
    listarUsuariosAdmin,
    listarUsuariosAdminPorNombre
} from '../controller/usuarioController';
import { verifyToken, isOwner } from '../middlewares/authJWT';


const router = express.Router();


////////////////////////////////////POSTS/////////////////////////////////////
router.post('/',crearUsuario);

////////////////////////////////////GETS/////////////////////////////////////
router.get('/', listarUsuarios);
router.get('/:nombre', verUsuarioPorNombre);
router.get('/porID/:_id', verUsuarioPorId);
router.get('/adminID/:_id',[verifyToken, isOwner ], listarUsuariosAdmin);
router.get('/adminNombre/:nombre',[verifyToken, isOwner ], listarUsuariosAdminPorNombre);
////////////////////////////////////PUTS/////////////////////////////////////
router.put('/:email/asignaturas',[verifyToken, isOwner ], asignarAsignaturasAUsuarioEmail);
router.put('/:_id',[verifyToken, isOwner ],actualizarUsuarioPorId);
router.put('/:nombre/asignaturas/actualizar',[verifyToken, isOwner ], actualizarAsignaturasUsuarioPorNombre);
router.put('/:_id/asignaturas/:asignaturaId',[verifyToken, isOwner ], asignarAsignaturaAUsuarioPorId);
router.put('/:_id/edad',[verifyToken, isOwner ], modificarEdadUsuarioPorId);
router.put('/:_id/email',[verifyToken, isOwner ], modificarEmailUsuarioPorId);
router.put('/:_id/nombre',[verifyToken, isOwner ], modificarNombreUsuarioPorId);
router.put('/:_id/password',[verifyToken, isOwner ], modificarPasswordUsuarioPorId);
router.put('/:_id/rol',[verifyToken, isOwner ], modificarRolUsuarioPorId);
////////////////////////////////////DELETES/////////////////////////////////////
router.delete('/:_id/asignaturas/:asignaturaid',[verifyToken, isOwner ], eliminarAsignaturaDeUsuarioPorId);
router.delete('/:email/asignaturas',[verifyToken, isOwner ], eliminarAsignaturaDeUsuarioPorEmail);
router.delete('/:_id', [verifyToken, isOwner ],eliminarUsuarioPorId);



export default router;