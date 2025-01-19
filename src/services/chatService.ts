import { Server, Socket } from "socket.io";
import { IMessage } from "../utils/chatTypes";
import Usuario from "../models/usuario"; // Importar el modelo de usuario

const activeRooms = new Map<string, Set<string>>(); // Para rastrear usuarios en salas privadas
const generalChatUsers = new Set<string>(); // Usuarios conectados al chat general

export const configureChatEvents = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Cliente conectado al chat: ${socket.id}`);

    // ==========================
    // Lógica para el chat de pares
    // ==========================
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

    socket.on("private-message", async (message: IMessage) => {
      const { senderId, receiverId, messageContent, timestamp } = message;

      const sender = await Usuario.findById(senderId);
      const senderName = sender?.nombre || "Desconocido";

      if (!senderId || !receiverId || !messageContent) {
        console.error("Datos incompletos para enviar mensaje:", message);
        return;
      }

      const room = [senderId, receiverId].sort().join("-");
      const clients = Array.from(io.sockets.adapter.rooms.get(room) || []);

      // Emitir el mensaje solo a otros clientes en la sala
      clients.forEach((clientId) => {
        if (clientId !== socket.id) {
          io.to(clientId).emit("receive-message", {
            senderId,
            senderName,
            receiverId,
            messageContent,
            timestamp,
          });
        }
      });

      console.log(
        `Mensaje enviado de ${senderId} (${senderName}) a ${receiverId} en la sala ${room}: ${messageContent}`
      );
    });

    // ==========================
    // Lógica para el chat general
    // ==========================
    socket.on("join-general-chat", (userId: string) => {
      if (!userId) {
        console.error("Falta userId para unirse al chat general.");
        return;
      }

      generalChatUsers.add(userId);
      socket.join("general-chat");
      console.log(`Usuario ${userId} se unió al chat general.`);
    });

    socket.on("message-general-chat", async (message: IMessage) => {
      const { senderId, messageContent, timestamp } = message;

      if (!senderId || !messageContent) {
        console.error("Datos incompletos para enviar mensaje al chat general:", message);
        return;
      }

      const sender = await Usuario.findById(senderId);
      const senderName = sender?.nombre || "Desconocido";

      io.to("general-chat").emit("message-general-chat", {
        senderId,
        senderName,
        messageContent,
        timestamp,
      });

      console.log(`Mensaje enviado al chat general por ${senderId}: ${messageContent}`);
    });

    socket.on("leave-general-chat", (userId: string) => {
      if (!userId) {
        console.error("Falta userId para salir del chat general.");
        return;
      }

      generalChatUsers.delete(userId);
      socket.leave("general-chat");
      console.log(`Usuario ${userId} salió del chat general.`);
    });

    // ==========================
    // Manejo de desconexión
    // ==========================
    socket.on("disconnect", () => {
      console.log(`Cliente desconectado del chat: ${socket.id}`);

      // Remover al usuario del chat general si está conectado
      generalChatUsers.forEach((userId) => {
        if (socket.rooms.has(userId)) {
          generalChatUsers.delete(userId);
        }
      });

      // Remover al usuario de salas privadas
      for (const [room, users] of activeRooms) {
        users.delete(socket.id);
        if (users.size === 0) {
          activeRooms.delete(room);
        }
      }
    });
  });
};
