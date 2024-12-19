import { Server, Socket } from "socket.io";
import { IMessage } from "../utils/chatTypes";
import Usuario from "../models/usuario"; // Importar el modelo de usuario

const activeRooms = new Map<string, Set<string>>(); // Para rastrear usuarios en salas

export const configureChatEvents = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Cliente conectado al chat: ${socket.id}`);

    // Evento para unirse a un chat
    socket.on("join-chat", (data) => {
      const { roomId, userId } = data;

      if (!roomId || !userId) {
        console.error("Datos incompletos para unirse al chat:", data);
        return;
      }

      // Crear la sala si no existe
      if (!activeRooms.has(roomId)) {
        activeRooms.set(roomId, new Set());
      }

      // Añadir el usuario al conjunto de la sala
      activeRooms.get(roomId)?.add(socket.id);
      socket.join(roomId);

      console.log(`Usuario ${userId} se unió a la sala: ${roomId}`);
      console.log(`Usuarios en la sala ${roomId}:`, Array.from(activeRooms.get(roomId) || []));

      // Notificar a los demás usuarios en la sala
      io.to(roomId).emit("user-joined", { userId, roomId });
    });

    // Evento para manejar mensajes en una room
    socket.on("room-message", async (message: IMessage) => {
      const { senderId, roomId, messageContent } = message;

      const sender = await Usuario.findById(senderId);
      const senderName = sender?.nombre || "Desconocido";

      if (!senderId || !roomId || !messageContent) {
        console.error("Datos incompletos para enviar mensaje:", message);
        return;
      }

      const timestamp = new Date();

      console.log(
        `Mensaje enviado por ${senderId} (${senderName}) en la sala ${roomId}: ${messageContent}`
      );

      // Emitir el mensaje a todos los usuarios en la sala
      io.to(roomId).emit("receive-message", {
        senderId,
        senderName,
        roomId,
        messageContent,
        timestamp,
      });
    });

    // Evento para salir de un chat
    socket.on("leave-chat", (data) => {
      const { roomId, userId } = data;

      if (!roomId || !userId) {
        console.error("Datos incompletos para salir del chat:", data);
        return;
      }

      socket.leave(roomId);

      // Eliminar el usuario de la lista de la sala
      activeRooms.get(roomId)?.delete(socket.id);

      // Eliminar la sala si está vacía
      if (activeRooms.get(roomId)?.size === 0) {
        activeRooms.delete(roomId);
      }

      console.log(`Usuario ${userId} salió de la sala: ${roomId}`);

      // Notificar a los demás usuarios en la sala
      io.to(roomId).emit("user-left", { userId, roomId });
    });

    // Manejar desconexión del chat
    socket.on("disconnect", () => {
      console.log(`Cliente desconectado del chat: ${socket.id}`);

      for (const [roomId, users] of activeRooms.entries()) {
        if (users.has(socket.id)) {
          users.delete(socket.id);
          if (users.size === 0) {
            activeRooms.delete(roomId);
          }
          console.log(`Socket eliminado de la sala ${roomId}`);
        }
      }
    });

    // Manejo de errores en el socket
    socket.on("error", (err) => {
      console.error(`Error en el socket ${socket.id}:`, err);
    });
  });
};
