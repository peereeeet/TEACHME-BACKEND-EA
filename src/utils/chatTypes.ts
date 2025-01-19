export interface IMessage {
    senderId: string; // ID del usuario que envía el mensaje
    receiverId?: string; // Opcional para el chat general
    messageContent: string; // Contenido del mensaje
    timestamp: Date; // Fecha y hora del mensaje
    senderName?: string; // Agregar el nombre del usuario que envía el mensaje
  }
  