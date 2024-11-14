// authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Usuario from '../models/usuario';
import { loginUsuario } from '../services/authJWTService';

const _SECRET: string = 'api+jwt';

// Login y generación de token
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ message: 'User not found' });


    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    // Generar token JWT
    const token = jwt.sign({ id: usuario._id }, _SECRET, { expiresIn: 86400 }); // expira en 24 horas
    res.json({ token });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function loginUsuarioController(req: Request, res: Response) {
  const { emailOrNombre, password } = req.body;

  try {
    const { token, usuario } = await loginUsuario(emailOrNombre, password);
    res.json({ token, usuario });
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


