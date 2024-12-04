import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io'; // Importamos Socket.IO
import http from 'http'; // Para crear el servidor HTTP
import usuarioRoutes from './routes/usuarioRoutes';
import asignaturaRoutes from './routes/asignaturaRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Crear servidor HTTP
const server = http.createServer(app);

// Configurar Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Permitir acceso desde cualquier origen
    methods: ['GET', 'POST'], // Métodos permitidos
  },
});

// Mapa para manejar los usuarios conectados
const connectedUsers = new Map<string, string>(); // userId -> socketId
export { connectedUsers, io }; // Exportamos `connectedUsers` y `io` para otros módulos

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/BBDD')
  .then(() => {
    console.log('Conectado a MongoDB');
    server.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('No se pudo conectar a MongoDB...', err));

// Rutas REST
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/asignaturas', asignaturaRoutes);

// Configuración de eventos WebSocket
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

export default app;
