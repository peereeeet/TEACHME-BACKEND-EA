// authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Usuario from '../models/usuario';

const _SECRET: string = 'api+jwt';

// Login y generación de token
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ message: 'User not found' });

    // Verificar la contraseña
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
