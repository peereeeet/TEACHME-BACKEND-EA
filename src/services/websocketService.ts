import { Server } from 'socket.io';
import { connectedUsers } from '../app'; // Importa el mapa de usuarios conectados
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

    // Manejar conexión de usuario
    socket.on('user-connected', async (data) => {
      console.log('Estic a userConnected', data);
      const { userId } = data;

      if (userId) {
        // Verificar si el usuario ya tiene un socket registrado
        if (connectedUsers.has(userId)) {
          console.log(
            `El usuario ${userId} ya tiene un socket conectado. Desconectando socket anterior.`
          );
          const previousSocketId = connectedUsers.get(userId);

          // Desconectar el socket previo si existe
          if (previousSocketId) {
            io.sockets.sockets.get(previousSocketId)?.disconnect();
            connectedUsers.delete(userId);
          }
        }

        // Registrar el nuevo socket
        connectedUsers.set(userId, socket.id);

        // Actualizar el estado `conectado` en la base de datos
        try {
          await Usuario.findByIdAndUpdate(userId, { conectado: true });
          console.log(
            `Usuario ${userId} conectado. Usuarios conectados:`,
            Array.from(connectedUsers.keys())
          );
        } catch (error) {
          console.error(
            `Error al actualizar el estado conectado para el usuario ${userId}:`,
            error
          );
        }

        // Emitir actualización de usuarios conectados a todos los clientes
        io.emit('update-user-status', Array.from(connectedUsers.keys()));
      }
    });

    // Manejar desconexión manual desde el cliente
    socket.on('user-disconnected', async (data) => {
      const { userId } = data;
      console.log(`Evento user-disconnected recibido con data:`, data);
    
      if (userId && connectedUsers.has(userId)) {
        connectedUsers.delete(userId); // Elimina al usuario de `connectedUsers`
        console.log(`Usuario ${userId} desconectado manualmente.`);
    
        try {
          await Usuario.findByIdAndUpdate(userId, { conectado: false }); // Actualiza la BD
          console.log(`Estado de conexión actualizado para el usuario ${userId}`);
        } catch (error) {
          console.error(`Error al actualizar el estado desconectado: ${error}`);
        }
    
        // Emitir la actualización a todos los clientes
        io.emit('update-user-status', Array.from(connectedUsers.keys()));
      } else {
        console.warn(`Intento de desconexión manual para un usuario no registrado: ${userId}`);
      }
    });
    
  
  // Manejar desconexiones automáticas
  socket.on('disconnect', async () => {
    try {
      // Buscar al usuario desconectado en `connectedUsers` por el `socket.id`
      const disconnectedUser = [...connectedUsers.entries()].find(([_, id]) => id === socket.id);
  
      if (disconnectedUser) {
        const userId = disconnectedUser[0]; // Obtener el ID del usuario
        connectedUsers.delete(userId); // Eliminar al usuario del mapa `connectedUsers`
        console.log(`Usuario ${userId} desconectado por evento 'disconnect'.`);
  
        // Actualizar el estado de conexión del usuario en la base de datos
        try {
          await Usuario.findByIdAndUpdate(userId, { conectado: false });
          console.log(`Estado de conexión actualizado para el usuario ${userId}`);
        } catch (error) {
          console.error(`Error al actualizar estado de conexión en 'disconnect': ${error}`);
        }
  
        // Emitir actualización a todos los clientes
        io.emit('update-user-status', Array.from(connectedUsers.keys()));
      } else {
        console.warn(`Socket desconectado sin usuario registrado: ${socket.id}`);
      }
    } catch (error) {
      console.error(`Error manejando el evento 'disconnect': ${error}`);
    }
  });
  
  

    // Manejo de errores en el socket
    socket.on('error', (err) => {
      console.error(`Error en el socket ${socket.id}:`, err);
    });
  });
};
