import * as express from 'express';
import { 
  actualizarUbicacion,
  usuariosCercanos,
  todasLasUbicaciones,
  usuariosPorProximidad 
} from '../controller/mapaController';
import { TokenValidation } from '../middleware/verifyJWT';

const router = express.Router();

// Rutas sin parámetros
router.put('/ubicacion', TokenValidation, actualizarUbicacion); // Actualizar ubicación del usuario
router.post('/usuarios-cercanos', TokenValidation, usuariosCercanos); // Obtener usuarios cercanos
router.get('/todas-ubicaciones', TokenValidation, todasLasUbicaciones); // Obtener todas las ubicaciones de los usuarios
router.post('/usuarios-proximidad', TokenValidation, usuariosPorProximidad); // Listar usuarios por proximidad

export default router;
