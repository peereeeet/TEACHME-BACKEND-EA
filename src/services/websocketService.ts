import { Server } from 'socket.io';
import { connectedUsers } from '../app'; // Importa el mapa de usuarios conectados si está en `app.ts`

export const configureWebSocketEvents = (io: Server) => {
  io.on('connection', (socket) => {
    console.log(`Socket conectado: ${socket.id}`);

    // Enviar un mensaje inicial al cliente
    socket.emit('server-message', 'Bienvenido al servidor WebSocket');
    socket.emit('user-connected', {
      message: 'Usuarios conectados:',
      users: Array.from(connectedUsers.entries()),
    });

    // Manejar eventos de mensajes
    socket.on('message', (message) => {
      console.log('Mensaje recibido del cliente:', message);
      socket.emit('message-response', 'Mensaje recibido correctamente');
    });

    // Manejar conexión de usuario
    socket.on('user-connected', (data) => {
      console.log('Estic a userConnected', data);
      const { userId } = data;
      if (userId) {
        connectedUsers.set(userId, socket.id);
        console.log(
          `Usuario ${userId} conectado. Usuarios conectados:`,
          Array.from(connectedUsers.keys())
        );

        // Emitir actualización de usuarios conectados a todos los clientes
        io.emit('update-user-status', Array.from(connectedUsers.keys()));
      }
    });

    // Manejar desconexión
    socket.on('disconnect', () => {
      const disconnectedUser = [...connectedUsers.entries()].find(
        ([_, id]) => id === socket.id
      );
      if (disconnectedUser) {
        connectedUsers.delete(disconnectedUser[0]);
        console.log(`Usuario ${disconnectedUser[0]} desconectado.`);

        // Emitir actualización de usuarios conectados a todos los clientes
        io.emit('update-user-status', Array.from(connectedUsers.keys()));
      }
    });

    // Manejo de errores en el socket
    socket.on('error', (err) => {
      console.error(`Error en el socket ${socket.id}:`, err);
    });
  });
};
