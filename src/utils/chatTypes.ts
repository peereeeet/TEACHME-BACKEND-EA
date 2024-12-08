export interface IMessage {
    senderId: string; // ID del usuario que envía el mensaje
    receiverId: string; // ID del usuario que recibe el mensaje
    messageContent: string; // Contenido del mensaje
    timestamp: Date; // Fecha y hora del mensaje
    senderName?: string; // Agregar el nombre del usuario que envía el mensaje
  }
  