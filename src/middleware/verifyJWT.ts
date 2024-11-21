import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { handleHttp } from '../utils/error.handle';

// Definir la interfaz del payload del JWT
interface IPayload {
    email: string;
    isAdmin: boolean;
    iat: number;
    exp: number;
}

// Extendemos el tipo Request para incluir el tipo de `user`
export interface CustomRequest extends Request {
    user?: IPayload; // Establecemos que req.user tendrá el tipo IPayload
}

export const TokenValidation = (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log('Verifying token');
    // Recoge el token escrito en el header
    const token = req.header('auth-token');
    console.log('Token:', token); // Imprime el token en la consola
    // Comprobamos 
    if (!token) return handleHttp(res, 'Access denied', 'No token provided');

    try {
        // Obtenemos de nuevo los datos codificados del token
        const payload = jwt.verify(token, process.env.SECRET || 'tokentest') as IPayload;
        console.log('Contenido del token decodificado:', payload); // Imprime el contenido del token
        req.user = payload;  // Establecemos el tipo de req.user
        next();
    } catch (error) {
        handleHttp(res, 'Your token is not valid', error); 
    }
};
