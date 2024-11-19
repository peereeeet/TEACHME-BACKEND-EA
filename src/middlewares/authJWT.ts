import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';
import IJwtPayload from '../models/authModel';


const _SECRET: string = 'api+jwt';


export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  console.log("Executing verifyToken middleware");
  //const token = req.header('Authorization');
  const token = req.headers['authorization'] as string;

  console.log("Token:", token);
  console.log(req.headers);

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  try { 
    const decoded = jwt.verify(token, _SECRET) as IJwtPayload;
    req.userId = decoded.id; 
    console.log("userId:", req.userId);
     
    const usuario = await Usuario.findById(req.userId, { password: 0 });
   
    if (!usuario) {
      return res.status(404).json({ message: 'No user found (verify token)' });
    }
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: 'Unauthorized!' });
  }
}

export async function isOwner(req: Request, res: Response, next: NextFunction) {
  try {
    const userIdFromToken = (req as any).userId;

    // Identificar si se pasó un _id o un email
    const paramId = req.params._id;
    const paramEmail = req.params.email;

    let usuario;
    if (paramId) {
      // Buscar usuario por ID
      usuario = await Usuario.findById(paramId);
    } else if (paramEmail) {
      // Buscar usuario por email
      usuario = await Usuario.findOne({ email: paramEmail });
    } else {
      // Si no hay parámetros válidos
      return res.status(400).json({ message: "No parameter provided for ownership verification" });
    }

    if (!usuario) {
      return res.status(404).json({ message: "No user found (owner)" });
    }

    // Verificar si el usuario autenticado es el mismo que el recurso solicitado
    if (usuario._id.toString() !== userIdFromToken) {
      return res.status(403).json({ message: "You do not own this resource" });
    }

    next();
  } catch (error) {
    console.error("Ownership verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
