import { Request, Response } from 'express';
import NotificationService from '../services/notificacionService';
import mongoose from 'mongoose'; // Aseguramos la importación de mongoose

class NotificationController {
  static async crearNotificacion(req: Request, res: Response): Promise<void> {
    try {
      const { userId, descripcion } = req.body;
      const notificacion = await NotificationService.crearNotificacion(new mongoose.Types.ObjectId(userId), descripcion);
      res.status(201).json(notificacion);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la notificación' });
    }
  }

  static async listarNotificaciones(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const notificaciones = await NotificationService.listarNotificaciones(new mongoose.Types.ObjectId(userId));
      res.status(200).json(notificaciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al listar las notificaciones' });
    }
  }

  static async marcarComoLeida(req: Request, res: Response): Promise<void> {
    try {
      const { notificationId } = req.params;
      const notificacion = await NotificationService.marcarComoLeida(new mongoose.Types.ObjectId(notificationId));
      res.status(200).json(notificacion);
    } catch (error) {
      res.status(500).json({ error: 'Error al marcar la notificación como leída' });
    }
  }

  static async eliminarNotificaciones(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      await NotificationService.eliminarNotificaciones(new mongoose.Types.ObjectId(userId));
      res.status(200).json({ message: 'Notificaciones eliminadas' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar las notificaciones' });
    }
  }
}

export default NotificationController;
