import { Router } from 'express';
import { crearClase, finalizarClase, listarClasesDeUsuario, listarTodasLasClases } from '../controller/claseController';
import { TokenValidation } from '../middleware/verifyJWT';

const router = Router();

router.post('/', TokenValidation, crearClase);
router.put('/:id/finalizar', TokenValidation, finalizarClase);
router.get('/:usuarioId/:rol', TokenValidation, listarClasesDeUsuario);
router.get('/todas', listarTodasLasClases);

export default router;
