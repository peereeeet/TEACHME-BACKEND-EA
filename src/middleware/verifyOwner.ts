import { Response, NextFunction } from 'express';
import * as userServices from "../services/usuarioService";
import { handleHttp } from '../utils/error.handle';
import { IUsuario } from '../models/usuario';  // Importa IUsuario desde el modelo de usuario
import { CustomRequest } from '../middleware/verifyJWT'; // Importamos CustomRequest

export const verifyOwnership = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        console.log('Verificando usuario');
        
        // El ID del usuario a modificar es el parámetro de la URL
        const userIdToActOn = req.params._id; // Usa el nombre real del parámetro en tu ruta

        // Usamos el email del usuario desde el payload del JWT
        const email = req.user?.email;

        if (!email) {
            return res.status(400).json({ message: 'Email not found in request' });
        }

        // Buscar al usuario por email
        const user = await userServices.findByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validamos que el usuario tenga la propiedad `_id` como `ObjectId`
        if (!user._id) {
            return res.status(400).json({ message: 'User does not have a valid _id' });
        }

        // Hacemos un type assertion para asegurarnos de que `user` es de tipo `IUsuario`
        const currentUserId = user._id.toString(); // Convertimos el _id a string

        console.log({ userIdToActOn, currentUserId });

        // Verificar si el usuario actual tiene permiso para modificar el recurso
        if (currentUserId === userIdToActOn) {
            return next();  // Si tiene permiso, pasa al siguiente middleware
        }

        return res.status(403).json({ message: 'You are not the owner of this resource' });
    } catch (error) {
        handleHttp(res, 'Internal server error', error);
    }
};
