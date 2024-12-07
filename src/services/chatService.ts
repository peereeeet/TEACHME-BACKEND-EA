import { Server, Socket } from "socket.io";
import { IMessage } from "../utils/chatTypes";

const activeRooms = new Map<string, Set<string>>(); // Para rastrear usuarios en salas

export const configureChatEvents = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Cliente conectado al chat: ${socket.id}`);

    // Evento para unirse a un chat
    socket.on("join-chat", (data) => {
      const { senderId, receiverId } = data;

      if (!senderId || !receiverId) {
        console.error("Datos incompletos para unirse al chat:", data);
        return;
      }

      const room = [senderId, receiverId].sort().join("-");
      socket.join(room);

      // Añadir el usuario a la lista de la sala
      if (!activeRooms.has(room)) {
        activeRooms.set(room, new Set());
      }
      activeRooms.get(room)?.add(senderId);

      console.log(`Usuario ${senderId} se unió a la sala: ${room}`);
      console.log(`Usuarios en la sala ${room}:`, Array.from(activeRooms.get(room) || []));
    });

    // Evento para salir de un chat
    socket.on("leave-chat", (data) => {
      const { senderId, receiverId } = data;

      if (!senderId || !receiverId) {
        console.error("Datos incompletos para salir del chat:", data);
        return;
      }

      const room = [senderId, receiverId].sort().join("-");
      socket.leave(room);

      // Eliminar el usuario de la lista de la sala
      activeRooms.get(room)?.delete(senderId);

      if (activeRooms.get(room)?.size === 0) {
        activeRooms.delete(room); // Eliminar la sala si está vacía
      }

      console.log(`Usuario ${senderId} salió de la sala: ${room}`);
    });

    // Evento para manejar mensajes privados
    socket.on("private-message", (message: IMessage) => {
      const { senderId, receiverId, messageContent, timestamp } = message;

      if (!senderId || !receiverId || !messageContent) {
        console.error("Datos incompletos para enviar mensaje:", message);
        return;
      }

      const room = [senderId, receiverId].sort().join("-");
      io.to(room).emit("receive-message", {
        senderId,
        receiverId,
        messageContent,
        timestamp,
      });

      console.log(`Mensaje enviado de ${senderId} a ${receiverId} en la sala ${room}: ${messageContent}`);
    });

    // Manejar desconexión del chat
    socket.on("disconnect", () => {
      console.log(`Cliente desconectado del chat: ${socket.id}`);
      for (const [room, users] of activeRooms) {
        users.delete(socket.id);
        if (users.size === 0) {
          activeRooms.delete(room);
        }
      }
    });
  });
};
