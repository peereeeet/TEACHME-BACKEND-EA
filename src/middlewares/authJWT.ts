// authJWT.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';
import Asignatura from '../models/asignatura';

const _SECRET: string = 'api+jwt';

interface JwtPayload {
  id: string;
}

// Middleware para verificar el token JWT
export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-access-token');
  if (!token) return res.status(403).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, _SECRET) as JwtPayload;
    req.userId = decoded.id;

    const usuario = await Usuario.findById(req.userId, { password: 0 });
    if (!usuario) return res.status(404).json({ message: 'No user found' });

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }
}

//ESTA FUNCION SE ENCARGA DE VERIFICAR SI EL USUARIO ES UN PROFESOR O NO (FUTUROS PERMISOS PARA LA APLICACION)
export async function isUsuario(req: Request, res: Response, next: NextFunction) {
    try {
      const usuario = await Usuario.findById(req.userId);
      if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
  
      const asignaturaId = req.params.id;
      const asignatura = await Asignatura.findById(asignaturaId);
  
      if (!asignatura) return res.status(404).json({ message: "Asignatura no encontrada" });
  
      const usuarioEnAsignatura = asignatura.usuarios.some(userId => userId.equals(req.userId));
      if (!usuarioEnAsignatura) return res.status(403).json({ message: "Acceso denegado: el usuario no pertenece a esta asignatura" });
  
      console.log("El usuario("+ usuario.nombre +") pertenece a la asignatura");
      next();
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error en el servidor", error });
    }
  }