// authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Usuario from '../models/usuario';
import { loginUsuario } from '../services/authJWTService';
import { verifyToken } from '../middlewares/authJWT';
import IJwtPayload from '../models/authModel';


const _SECRET: string = 'api+jwt';

export async function loginUsuarioController(req: Request, res: Response) {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      message: 'Faltan campos requeridos: email o password',
    });
  }
  try {
    const { token, usuario } = await loginUsuario(email, password);
    
    res.json({ token, usuario });
   
  } catch (error: any) {
    console.error('Error en login:', error);
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({
        message: 'Usuario no encontrado. Asegúrate de que el email sea correctos.',
      });
    }
    if (error.message === 'Contraseña incorrecta') {
      return res.status(401).json({
        message: 'Contraseña incorrecta. Asegúrate de que la contraseña sea correcta.',
      });
    }
    res.status(500).json({ message: 'Server error' });
    
  }
}


export async function registerUsuario(req: Request, res: Response) {
  const { nombre, edad, email, password, isProfesor,  isAlumno, isAdmin} = req.body;

  try {
    const usuario = new Usuario({ nombre, edad, email, password, isProfesor, isAlumno, isAdmin });
    await usuario.save();
  
    res.json(usuario);
  } catch (error:any) {
    if (error.message === 'Faltan datos requeridos en la solicitud.') {
      return res.status(400).json({
        message: 'Faltan datos requeridos en la solicitud.',
      });
    }
    if (error.message === 'Correo electrónico inválido.') {
      return res.status(400).json({
        message: 'Correo electrónico inválido.',
      });
    }
    if (error.message === 'El nombre ya está registrado, escoge otro.') {
      return res.status(400).json({
        message: 'El nombre ya está registrado, escoge otro.',
      });
    }
    if (error.message === 'El correo electrónico ya está registrado.') {
      return res.status(400).json({
        message: 'El correo electrónico ya está registrado.',
      });
    }
    if (error.message === 'La contraseña debe tener al menos 3 caracteres.') {
      return res.status(400).json({
        message: 'La contraseña debe tener al menos 3 caracteres.',
      });
    }
    console.error('Error en registro:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
  
}


