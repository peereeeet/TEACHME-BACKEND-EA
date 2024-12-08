import { Server, Socket } from "socket.io";
import { IMessage } from "../utils/chatTypes";

const activeRooms = new Map<string, Set<string>>(); // Para rastrear usuarios en salas
const userToSocketMap = new Map<string, string>(); // Mapear userId a socketId

export const configureChatEvents = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Cliente conectado al chat: ${socket.id}`);

    // Registrar el userId en el mapa
    socket.on("register-user", (userId) => {
      if (userId) {
        userToSocketMap.set(userId, socket.id);
        console.log(`Usuario ${userId} registrado con socket ${socket.id}`);
      }
    });

    // Evento para notificar inicio de chat
    socket.on("start-chat", (data) => {
      const { senderId, receiverId } = data;

      if (!senderId || !receiverId) {
        console.error("Datos incompletos para iniciar chat:", data);
        return;
      }

      const receiverSocketId = userToSocketMap.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("chat-request", {
          senderId,
          senderName: data.senderName,
        });
        console.log(`Notificación enviada a ${receiverId} desde ${senderId}`);
      } else {
        console.warn(`Usuario ${receiverId} no está conectado`);
      }
    });

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
      io.to(room).emit("chat-status", {
        message: `Usuario ${senderId} se unió al chat.`,
      });
    });

    // Evento para manejar mensajes privados
    socket.on("private-message", (message: IMessage) => {
      const { senderId, receiverId, messageContent, timestamp } = message;

      if (!senderId || !receiverId || !messageContent) {
        console.error("Datos incompletos para enviar mensaje:", message);
        return;
      }

      const room = [senderId, receiverId].sort().join("-");
      const usersInRoom = activeRooms.get(room);

      if (usersInRoom && usersInRoom.has(receiverId)) {
        io.to(room).emit("receive-message", {
          senderId,
          receiverId,
          messageContent,
          timestamp,
        });
        console.log(
          `Mensaje enviado de ${senderId} a ${receiverId} en la sala ${room}: ${messageContent}`
        );
      } else {
        io.to(userToSocketMap.get(senderId)!).emit("chat-status", {
          message: `El usuario ${receiverId} no está conectado. Los mensajes no serán visibles hasta que vuelva a conectarse.`,
        });
        console.warn(`Usuario ${receiverId} no está en la sala ${room}`);
      }
    });

    // Manejar desconexión del chat
    socket.on("disconnect", () => {
      console.log(`Cliente desconectado del chat: ${socket.id}`);

      // Encontrar y eliminar al usuario desconectado
      const userId = [...userToSocketMap.entries()].find(
        ([, socketId]) => socketId === socket.id
      )?.[0];
      if (userId) {
        userToSocketMap.delete(userId);

        // Informar a las salas en las que estaba el usuario
        for (const [room, users] of activeRooms) {
          if (users.has(userId)) {
            users.delete(userId);

            if (users.size === 0) {
              activeRooms.delete(room);
            } else {
              io.to(room).emit("chat-status", {
                message: `El usuario ${userId} se desconectó. Solo podrás continuar el chat cuando ambos estén conectados.`,
              });
            }
          }
        }
      }
    });
  });
};
