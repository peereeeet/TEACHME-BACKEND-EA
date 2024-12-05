import { Server } from 'socket.io';
import { connectedUsers } from '../app'; // Importa el mapa de usuarios conectados si está en `app.ts`
import Usuario from '../models/usuario'; // Importar el modelo de usuario

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
    socket.on('user-connected', async (data) => {
      console.log('Estic a userConnected', data);
      const { userId } = data;
      if (userId) {
        connectedUsers.set(userId, socket.id);

        // Actualizar el estado `conectado` en la base de datos
        try {
          await Usuario.findByIdAndUpdate(userId, { conectado: true });
          console.log(
            `Usuario ${userId} conectado. Usuarios conectados:`,
            Array.from(connectedUsers.keys())
          );
        } catch (error) {
          console.error(`Error al actualizar el estado conectado para el usuario ${userId}:`, error);
        }

        // Emitir actualización de usuarios conectados a todos los clientes
        io.emit('update-user-status', Array.from(connectedUsers.keys()));
      }
    });

    // Manejar desconexión
    socket.on('disconnect', async () => {
      const disconnectedUser = [...connectedUsers.entries()].find(
        ([_, id]) => id === socket.id
      );
      if (disconnectedUser) {
        connectedUsers.delete(disconnectedUser[0]);
        console.log(`Usuario ${disconnectedUser[0]} desconectado.`);

        // Actualizar el estado `conectado` en la base de datos
        try {
          await Usuario.findByIdAndUpdate(disconnectedUser[0], { conectado: false });
          console.log(
            `Estado de conexión actualizado para el usuario ${disconnectedUser[0]}`
          );
        } catch (error) {
          console.error(
            `Error al actualizar el estado desconectado para el usuario ${disconnectedUser[0]}:`,
            error
          );
        }

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
