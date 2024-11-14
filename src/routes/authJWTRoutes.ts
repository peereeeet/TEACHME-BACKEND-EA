// auth.ts
import { Router } from 'express';
import { login,loginUsuarioController, registerUsuario } from '../controller/authJWTController';

const router = Router();


//router.post('/login', login);-------> login chapucero
//ruta para login con verificacion de token jwt
router.post('/loginUsuario', loginUsuarioController);
router.post('/register', registerUsuario);



export default router;
