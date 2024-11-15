// auth.ts
import { Router } from 'express';
import { loginUsuarioController, registerUsuario } from '../controller/authJWTController';

const router = Router();

//ruta para login con verificacion de token jwt
router.post('/loginUsuario', loginUsuarioController);
router.post('/register', registerUsuario);



export default router;
