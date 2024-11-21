// types.d.ts
import { IUsuario } from './models/usuario';

declare global {
  namespace Express {
    interface Request {
      user?: IUsuario; // Agrega el tipo de usuario
    }
  }
}