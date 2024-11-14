import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';
import Asignatura from '../models/asignatura';

const _SECRET: string = 'api+jwt';

interface JwtPayload {
  id: string;
}

// Extiende Request para incluir el userId
interface CustomRequest extends Request {
  userId?: string;
}

// Middleware para verificar el token JWT
export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  console.log("Executing verifyToken middleware");
  const token = req.header('Authorization');
  console.log("Token:", token);

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

export async function isOwner(req: Request, res: Response, next: NextFunction) {
  try {
    const userIdFromToken = (req as CustomRequest).userId;
    const userIdToModify = req.params._id;
    const usuario = await Usuario.findById(userIdFromToken);

    if (!usuario) {
      return res.status(404).json({ message: "No user found" });
    }

    if (userIdFromToken !== userIdToModify) {
      return res.status(403).json({ message: "Not Owner" });
    }

     //PERMITIR ACCESO AL USUARIO
     next();
  }
  catch (error) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }
}

