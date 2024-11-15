// authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Usuario from '../models/usuario';
import { loginUsuario } from '../services/authJWTService';
import { verifyToken } from '../middlewares/authJWT';

const _SECRET: string = 'api+jwt';



export async function loginUsuarioController(req: Request, res: Response) {
  const { emailOrNombre, password } = req.body;

  try {
    const { token, usuario } = await loginUsuario(emailOrNombre, password);
    res.json({ token, usuario });
    console.log ('Token del usuario:', token);
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


export async function registerUsuario(req: Request, res: Response) {
  const { nombre, edad, email, password, isProfesor, isAlumno, isAdmin } = req.body;

  try {
    const usuario = new Usuario({ nombre, edad, email, password, isProfesor, isAlumno, isAdmin });
    await usuario.save();
  
    res.json(usuario);
  } catch (error) {
    console.error('Error al registrarse:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


