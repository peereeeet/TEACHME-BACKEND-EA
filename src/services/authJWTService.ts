
    import Usuario from '../models/usuario';
    import bcrypt from 'bcryptjs';
    import jwt from 'jsonwebtoken';
    import IJwtPayload from '../models/authModel';
import { error } from 'console';

    const _SECRET: string = 'api+jwt';
   
   //////////////////////////////////////////LOGIN USUARIO////////////////////////////////////////// 
    export const loginUsuario = async (email: string, password: string) => {
      const usuario= await Usuario.findOne({ email: email });
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      
      }
      const session = { 'id': usuario._id.toString() } as IJwtPayload;

      const token = jwt.sign(session, _SECRET, {
              expiresIn: 86400,
          });
      
      console.log('Usuario logueado:', usuario);
      return { token, usuario };

    };
  


    //////////////////////////////////////////REGISTRO USUARIO//////////////////////////////////////////
    export const registerUsuario = async (nombre: string, edad: number,email: string, password: string,isProfesor = false, isAlumno = false, isAdmin = false
    ) => {

      if (!nombre || !edad || !email || !password || isProfesor === undefined || isAlumno === undefined || isAdmin === undefined) {
        throw new Error('Faltan datos requeridos en la solicitud.');
      }
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        throw new Error('Correo electrónico inválido.');
      }
    
      const nombreExistente= await Usuario.findOne({ nombre });
      if (nombreExistente) {
        throw new Error('El nombre ya está registrado, escoge otro.');
      }
      
      const usuarioExistente = await Usuario.findOne({ email });
      if (usuarioExistente) {
        throw new Error('El correo electrónico ya está registrado.');
      }
      if (password.length < 3) {
        throw new Error('La contraseña debe tener al menos 3 caracteres.');
      }

      const usuario = new Usuario({nombre,edad,email});

      try {
        await usuario.save();
        return usuario;
      } catch (error) {
        if ((error as any).code === 11000) { 
          throw new Error('El correo electrónico ya está registrado.');
        }
        if (error instanceof Error) {
          throw new Error('Error al registrar al usuario: ' + error.message);
        }
        throw error;
      }
    };
