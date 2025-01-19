import { Router } from 'express';
import { crearReview, listarReviewsDeClase } from '../controller/reviewController';
import { obtenerReviewsPorProfesor } from '../controller/reviewController';
import { TokenValidation } from '../middleware/verifyJWT';

const router = Router();

router.post('/', TokenValidation, crearReview);
router.get('/:claseId', TokenValidation, listarReviewsDeClase);
// Ruta para obtener las reviews de un profesor
router.get('/profesor/:profesorId', TokenValidation, obtenerReviewsPorProfesor);

export default router;
