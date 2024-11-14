/*creame las export const (nombre de la funcion) para crear el login de un usuario, quiero que cuando
 un usuario introduzca su email o nombre de usuario y el paswword le de acceso a la aplicacion, 
    si no le da acceso que le muestre un mensaje de error. */
    import Usuario from '../models/usuario';
    import bcrypt from 'bcryptjs';
    import jwt from 'jsonwebtoken';
    
    export const loginUsuario = async (emailOrNombre: string, password: string) => {
      const usuario = await Usuario.findOne({$or: [{ email: emailOrNombre }, { nombre: emailOrNombre }]});
    
      if (!usuario) throw new Error('Usuario no encontrado');
    
      const isMatch = await bcrypt.compare(password, usuario.password);
      if (!isMatch) throw new Error('Contraseña incorrecta');
    
      const token = jwt.sign({ userId: usuario._id, isAdmin: usuario.isAdmin }, 'yourSecretKey', { expiresIn: '1h' });
    
      console.log('Usuario logueado:', usuario);
    
      return { token, usuario };
    };
