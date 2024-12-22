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
  obtenerCoordenadasUsuarios,
  asignarRolUsuarioPorId,
  getAllUsers
} from '../controller/usuarioController';
import { TokenValidation } from '../middleware/verifyJWT';
import { AdminValidation } from '../middleware/verifyAdmin';
import { verifyOwnership } from '../middleware/verifyOwner';

const router = express.Router();

// Rutas sin parámetros
router.post('/', crearUsuario); // Crear usuario sin protección para registro inicial
router.post('/login', loginUsuario); // Login sin protección
router.put('/:id/rol', TokenValidation, asignarRolUsuarioPorId);
router.get('/listar-paginados', TokenValidation, obtenerUsuariosPaginados); // Listar usuarios paginados (solo admin)
router.get('/buscar', TokenValidation, buscarUsuarios); // Buscar usuarios por nombre
router.get('/coordenadas', TokenValidation, obtenerCoordenadasUsuarios); // Obtener coordenadas de usuarios
router.get('/conectados', TokenValidation, obtenerUsuariosConectados); // Ver usuarios conectados

// Rutas con parámetros dinámicos
router.get('/', getAllUsers);
router.get('/:id', TokenValidation, AdminValidation, verUsuarioPorId); // Ver usuario por ID
router.get('/:nombre', TokenValidation, verUsuarioPorNombre); // Ver usuario por nombre
router.get('/:nombre/asignaturas', TokenValidation, obtenerIdUsuarioPorNombre); // Obtener ID de usuario por nombre
router.get('/:usuarioId/asignaturas', TokenValidation, obtenerAsignaturasDelUsuario); // Ver asignaturas de un usuario
router.get('/:usuarioId/asignaturas/paginacion', TokenValidation, obtenerAsignaturasPaginadasDeUsuario); // Paginación de asignaturas

// Métodos PUT
router.put('/:nombre/asignaturas', TokenValidation, asignarAsignaturasAUsuario); // Asignar asignaturas a un usuario por nombre
router.put('/:_id', TokenValidation, verifyOwnership, actualizarUsuarioPorId); // Actualizar datos propios
router.put('/:nombre/asignaturas/actualizar', TokenValidation, AdminValidation, actualizarAsignaturasUsuarioPorNombre); // Actualizar asignaturas (solo admin)
router.put('/:usuarioId/asignaturas/:asignaturaId', TokenValidation, AdminValidation, asignarAsignaturaAUsuarioPorId); // Asignar asignatura por ID
router.put('/:_id/edad', TokenValidation, verifyOwnership, modificarEdadUsuarioPorId); // Modificar edad
router.put('/:_id/email', TokenValidation, verifyOwnership, modificarEmailUsuarioPorId); // Modificar email
router.put('/:_id/nombre', TokenValidation, verifyOwnership, modificarNombreUsuarioPorId); // Modificar nombre
router.put('/:_id/password', TokenValidation, verifyOwnership, modificarPasswordUsuarioPorId); // Modificar contraseña
router.put('/:_id/rol', TokenValidation, AdminValidation, modificarRolUsuarioPorId); // Modificar rol (solo admin)

// Métodos DELETE
router.delete('/:usuarioId', TokenValidation, AdminValidation, eliminarUsuarioPorId); // Eliminar usuario (solo admin)
router.delete('/:nombre/asignaturas/:asignaturaId', TokenValidation, AdminValidation, eliminarAsignaturaDeUsuarioPorNombre); // Eliminar asignatura por nombre (solo admin)
router.delete('/:usuarioId/asignaturas/:asignaturaId', TokenValidation, eliminarAsignaturaDeUsuarioPorId); // Eliminar asignatura por ID

export default router;
