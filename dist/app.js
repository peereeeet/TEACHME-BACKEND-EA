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
const PORT = 3000;
// Crear servidor HTTP
const server = http_1.default.createServer(app);
// Configurar Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // Permitir acceso desde cualquier origen
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
mongoose_1.default.connect('mongodb://localhost:27017/BBDD')
    .then(() => {
    console.log('Conectado a MongoDB');
    server.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})
    .catch(err => console.error('No se pudo conectar a MongoDB...', err));
// Rutas REST
app.use('/api/usuarios', usuarioRoutes_1.default);
app.use('/api/asignaturas', asignaturaRoutes_1.default);
// Configuración de eventos WebSocket
// Evento para manejar conexión de usuario
io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);
    socket.on('user-connected', (data) => {
        const { userId } = data;
        if (userId) {
            connectedUsers.set(userId, socket.id);
            console.log(`Usuario ${userId} conectado. Usuarios conectados:`, Array.from(connectedUsers.keys()));
            io.emit('update-user-status', Array.from(connectedUsers.keys())); // Emitir usuarios conectados
        }
    });
    // Manejar desconexión
    socket.on('disconnect', () => {
        const disconnectedUser = [...connectedUsers.entries()].find(([_, id]) => id === socket.id);
        if (disconnectedUser) {
            connectedUsers.delete(disconnectedUser[0]);
            console.log(`Usuario ${disconnectedUser[0]} desconectado.`);
            io.emit('update-user-status', Array.from(connectedUsers.keys())); // Emitir actualización
        }
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map