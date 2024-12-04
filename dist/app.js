"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.connectedUsers = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io"); // Importamos Socket.IO
const http_1 = __importDefault(require("http")); // Para crear el servidor HTTP
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const asignaturaRoutes_1 = __importDefault(require("./routes/asignaturaRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Crear servidor HTTP
const server = http_1.default.createServer(app);
// Configurar Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // Permitir acceso desde cualquier origen
        methods: ['GET', 'POST'], // Métodos permitidos
    },
});
exports.io = io;
// Mapa para manejar los usuarios conectados
const connectedUsers = new Map(); // userId -> socketId
exports.connectedUsers = connectedUsers;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Conexión a MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/BBDD')
    .then(() => {
    console.log('Conectado a MongoDB');
    server.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})
    .catch((err) => console.error('No se pudo conectar a MongoDB...', err));
// Rutas REST
app.use('/api/usuarios', usuarioRoutes_1.default);
app.use('/api/asignaturas', asignaturaRoutes_1.default);
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
            console.log(`Usuario ${userId} conectado. Usuarios conectados:`, Array.from(connectedUsers.keys()));
            // Emitir actualización de usuarios conectados a todos los clientes
            io.emit('update-user-status', Array.from(connectedUsers.keys()));
        }
    });
    // Manejar desconexión
    socket.on('disconnect', () => {
        const disconnectedUser = [...connectedUsers.entries()].find(([_, id]) => id === socket.id);
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
exports.default = app;
//# sourceMappingURL=app.js.map