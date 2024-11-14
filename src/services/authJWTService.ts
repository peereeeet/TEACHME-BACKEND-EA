
    import Usuario from '../models/usuario';
    import bcrypt from 'bcryptjs';
    import jwt from 'jsonwebtoken';
    
    export const loginUsuario = async (emailOrNombre: string, password: string) => {
      const usuario = await Usuario.findOne({$or: [{ email: emailOrNombre }, { nombre: emailOrNombre }]});
    
      if (!usuario) throw new Error('Usuario no encontrado');
    
      const isMatch = await bcrypt.compare(password, usuario.password);
      if (!isMatch) throw new Error('Contraseña incorrecta');
    
      const token = jwt.sign({ userId: usuario._id, isAdmin: usuario.isAdmin }, 
        'yourSecretKey', { expiresIn: '1h' });
    
      console.log('Usuario logueado:', usuario);
    
      return { token, usuario };
    };


  
    export const registerUsuario = async (nombre: string, edad: number,email: string, password: string,isProfesor = false, isAlumno = false, isAdmin = false
    ) => {

      if (!nombre || !edad || !email || !password || isProfesor === undefined || isAlumno === undefined || isAdmin === undefined) {
        throw new Error('Faltan datos requeridos en la solicitud.');
      }
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        throw new Error('Correo electrónico inválido.');
      }
      const usuarioExistente = await Usuario.findOne({ email });
      if (usuarioExistente) {
        throw new Error('El correo electrónico ya está registrado.');
      }
      if (password.length < 3) {
        throw new Error('La contraseña debe tener al menos 3 caracteres.');
      }

  
      const usuario = new Usuario({nombre,edad,email,password,isProfesor,isAlumno,isAdmin
      });
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

