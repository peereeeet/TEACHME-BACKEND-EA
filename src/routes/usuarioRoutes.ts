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
    obtenerAsignaturasPaginadasDeUsuario,
    loginUsuario,
    buscarUsuarios,
    obtenerUsuariosConectados,
    obtenerCoordenadasUsuarios
} from '../controller/usuarioController';
import { TokenValidation } from '../middleware/verifyJWT';
import { AdminValidation } from '../middleware/verifyAdmin';
import { verifyOwnership } from '../middleware/verifyOwner';
import { connectedUsers } from '../app';


const router = express.Router();


// Nueva ruta para obtener las coordenadas
router.get('/coordenadas', TokenValidation, obtenerCoordenadasUsuarios);

// Búsqueda de usuarios conectados
router.get('/conectados', TokenValidation, obtenerUsuariosConectados);

// Búsqueda de usuarios por nombre
router.get('/buscar', TokenValidation, buscarUsuarios); // Nueva ruta para buscar usuarios

////////////////////////////////////RUTAS SIN PARÁMETROS/////////////////////////////////////
router.post('/', crearUsuario); // Crear usuario sin protección para permitir registro inicial
router.post('/login', loginUsuario); // Login no protegido
router.get('/listar-paginados', TokenValidation, AdminValidation, obtenerUsuariosPaginados); // Solo admin
//router.get('/', TokenValidation, AdminValidation, listarUsuarios); // Solo admin

router.get('/', listarUsuarios); // Solo admin

//router.get('/conectados', TokenValidation, obtenerUsuariosConectados);
router.get('/:id', TokenValidation, AdminValidation, verUsuarioPorId);

////////////////////////////////////RUTAS CON PARÁMETROS DINÁMICOS/////////////////////////////////////
//router.get('/:usuarioId/asignaturas', TokenValidation, obtenerAsignaturasDelUsuario); // Ver asignaturas de un usuario
//router.get('/:usuarioId/asignaturas/paginacion', TokenValidation, AdminValidation, obtenerAsignaturasPaginadasDeUsuario); // Paginación de asignaturas

router.get('/:usuarioId/asignaturas', obtenerAsignaturasDelUsuario); // Ver asignaturas de un usuario
router.get('/:usuarioId/asignaturas/paginacion', obtenerAsignaturasPaginadasDeUsuario); // Paginación de asignaturas


router.get('/:nombre', TokenValidation, verUsuarioPorNombre); // Ver usuario por nombre
router.get('/:nombre/asignaturas', TokenValidation, obtenerIdUsuarioPorNombre); // Obtener ID de usuario por nombre

// Otros métodos PUT y DELETE que dependen de los parámetros
router.put('/:nombre/asignaturas', TokenValidation, asignarAsignaturasAUsuario); // Asignar asignaturas
router.put('/:_id', TokenValidation, verifyOwnership, actualizarUsuarioPorId); // Actualizar datos propios
router.put('/:nombre/asignaturas/actualizar', TokenValidation, AdminValidation, actualizarAsignaturasUsuarioPorNombre); // Solo admin
router.put('/:usuarioId/asignaturas/:asignaturaId', TokenValidation, AdminValidation, asignarAsignaturaAUsuarioPorId); // Asignar asignatura a usuario
router.put('/:_id/edad', TokenValidation, verifyOwnership, modificarEdadUsuarioPorId); // Modificar edad propio
router.put('/:_id/email', TokenValidation, verifyOwnership, modificarEmailUsuarioPorId); // Modificar email propio
router.put('/:_id/nombre', TokenValidation, verifyOwnership, modificarNombreUsuarioPorId); // Modificar nombre propio
router.put('/:_id/password', TokenValidation, verifyOwnership, modificarPasswordUsuarioPorId); // Modificar contraseña
router.put('/:_id/rol', TokenValidation, AdminValidation, modificarRolUsuarioPorId); // Solo admin
router.delete('/:usuarioId/asignaturas/:asignaturaId', TokenValidation, AdminValidation, eliminarAsignaturaDeUsuarioPorId); // Eliminar asignatura propia
router.delete('/:nombre/asignaturas/:asignaturaId', TokenValidation, AdminValidation, eliminarAsignaturaDeUsuarioPorNombre); // Solo admin
router.delete('/:usuarioId', TokenValidation, AdminValidation, eliminarUsuarioPorId); // Solo admin

export default router;
