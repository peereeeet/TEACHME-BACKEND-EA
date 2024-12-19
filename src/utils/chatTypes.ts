export interface IMessage {
  senderId: string;
  roomId: string; // Cambiado para usar roomId en lugar de receiverId
  messageContent: string;
  timestamp: Date;
  senderName?: string;
}
