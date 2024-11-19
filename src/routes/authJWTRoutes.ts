// auth.ts
import { Router } from 'express';
import { loginUsuarioController, registerUsuario } from '../controller/authJWTController';

const router = Router();

router.post('/loginUsuario', loginUsuarioController);
router.post('/register', registerUsuario);

export default router;
