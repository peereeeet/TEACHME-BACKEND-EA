import Notification, { INotification } from '../models/notificacion';
import mongoose from 'mongoose';

class NotificationService {
  static async crearNotificacion(userId: mongoose.Types.ObjectId, descripcion: string): Promise<INotification> {
    const nuevaNotificacion = new Notification({ userId, descripcion });
    return await nuevaNotificacion.save();
  }

  static async listarNotificaciones(userId: mongoose.Types.ObjectId): Promise<INotification[]> {
    // Filtrar notificaciones no leídas
    return await Notification.find({ userId, leida: false }).sort({ fecha: -1 });
  }

  static async marcarComoLeida(notificationId: mongoose.Types.ObjectId): Promise<INotification | null> {
    return await Notification.findByIdAndUpdate(notificationId, { leida: true }, { new: true });
  }

  static async eliminarNotificaciones(userId: mongoose.Types.ObjectId): Promise<void> {
    await Notification.deleteMany({ userId });
  }
}

export default NotificationService;
