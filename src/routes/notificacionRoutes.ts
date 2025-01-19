import { Router } from 'express';
import NotificationController from '../controller/notificacionController'; // Ruta correcta
import { TokenValidation } from '../middleware/verifyJWT';

const router = Router();

// Crear una nueva notificación
router.post('/', TokenValidation, NotificationController.crearNotificacion);

// Listar notificaciones de un usuario
router.get('/:userId', TokenValidation, NotificationController.listarNotificaciones);

// Marcar una notificación como leída
router.put('/:notificationId/leida', TokenValidation, NotificationController.marcarComoLeida);

// Eliminar todas las notificaciones de un usuario
router.delete('/:userId', TokenValidation, NotificationController.eliminarNotificaciones);

export default router;
