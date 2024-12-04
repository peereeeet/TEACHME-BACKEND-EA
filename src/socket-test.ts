import express from 'express';
import { Server } from 'socket.io';

const app = express();
const PORT = 3000;

// Crear servidor HTTP con Express
const server = app.listen(PORT, () => {
  console.log(`Servidor WebSocket escuchando en http://localhost:${PORT}`);
});

// Configurar Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Socket conectado: ${socket.id}`);
  socket.emit('welcome', 'Bienvenido al servidor WebSocket');

  socket.on('message', (message) => {
    console.log('Mensaje recibido del cliente:', message);
    socket.emit('response', 'Mensaje recibido correctamente');
  });

  socket.on('disconnect', () => {
    console.log(`Socket desconectado: ${socket.id}`);
  });
});
