// auth.ts
import { Router } from 'express';
import { login,loginUsuarioController } from '../controller/authJWTController';

const router = Router();

// Ruta para login
router.post('/login', login);
//ruta para login con verificacion de token jwt
router.post('/loginUsuario', loginUsuarioController);



export default router;
