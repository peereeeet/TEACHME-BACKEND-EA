import * as express from 'express';
import {
    crearUsuario,
    listarUsuarios,
    obtenerUsuariosPaginados,
    obtenerIdUsuarioPorNombre,
    verUsuarioPorNombre,
    verUsuarioPorId,
    obtenerAsignaturasDelUsuario,
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
    obtenerAsignaturasPaginadasDeUsuario
} from '../controller/usuarioController';

const router = express.Router();

////////////////////////////////////RUTAS SIN PARÁMETROS/////////////////////////////////////
router.post('/', crearUsuario);  // Crear usuario
router.get('/listar-paginados', obtenerUsuariosPaginados);  // Nueva ruta de paginación (asegúrate de que esté antes de las rutas con parámetros)
router.get('/', listarUsuarios);  // Listar todos los usuarios

////////////////////////////////////RUTAS CON PARÁMETROS DINÁMICOS/////////////////////////////////////
router.get('/:usuarioId/asignaturas', obtenerAsignaturasDelUsuario);  // Obtener asignaturas de un usuario
router.get('/:usuarioId/asignaturas/paginacion', obtenerAsignaturasPaginadasDeUsuario);
router.get('/:nombre', verUsuarioPorNombre);  // Ver usuario por nombre
router.get('/:_id', verUsuarioPorId);  // Ver usuario por ID
router.get('/:nombre/asignaturas', obtenerIdUsuarioPorNombre);  // Obtener ID de usuario por nombre

// Otros métodos PUT y DELETE que dependen de los parámetros
router.put('/:nombre/asignaturas', asignarAsignaturasAUsuario);
router.put('/:_id', actualizarUsuarioPorId);
router.put('/:nombre/asignaturas/actualizar', actualizarAsignaturasUsuarioPorNombre);
router.put('/:usuarioId/asignaturas/:asignaturaId', asignarAsignaturaAUsuarioPorId);
router.put('/:_id/edad', modificarEdadUsuarioPorId);
router.put('/:_id/email', modificarEmailUsuarioPorId);
router.put('/:_id/nombre', modificarNombreUsuarioPorId);
router.put('/:_id/password', modificarPasswordUsuarioPorId);
router.put('/:_id/rol', modificarRolUsuarioPorId);
router.delete('/:usuarioId/asignaturas/:asignaturaId', eliminarAsignaturaDeUsuarioPorId);
router.delete('/:nombre/asignaturas/:asignaturaId', eliminarAsignaturaDeUsuarioPorNombre);
router.delete('/:usuarioId', eliminarUsuarioPorId);

export default router;
