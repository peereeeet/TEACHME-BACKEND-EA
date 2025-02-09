import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import usuarioRoutes from './routes/usuarioRoutes';
import asignaturaRoutes from './routes/asignaturaRoutes';
import claseRoutes from './routes/claseRoutes';
import reviewRoutes from './routes/reviewRoutes';
import notificacionRoutes from './routes/notificacionRoutes';
import dotenv from 'dotenv';
import { configureWebSocketEvents } from './services/websocketService'; // Importar la configuración de WebSocket
import { configureChatEvents } from './services/chatService'; // Importar el servicio de chat
import mapaRoutes from './routes/mapaRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Crear servidor HTTP
const server = http.createServer(app);

// Configurar Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Exportar el mapa de usuarios conectados y el servidor WebSocket
const connectedUsers = new Map<string, string>();
export { connectedUsers, io };

// Configurar eventos de WebSocket
configureWebSocketEvents(io); // Configuración desde el archivo separado
configureChatEvents(io); // Configuración de eventos del chat

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
<<<<<<< HEAD
app.use('/api/mapa', mapaRoutes);

=======
app.use('/api/clases', claseRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/notificaciones', notificacionRoutes);
>>>>>>> 38ad65057ada66d18a92f26e25e22e3b5f2e9f7c

export default app;
