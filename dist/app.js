"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.connectedUsers = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const asignaturaRoutes_1 = __importDefault(require("./routes/asignaturaRoutes"));
const claseRoutes_1 = __importDefault(require("./routes/claseRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const notificacionRoutes_1 = __importDefault(require("./routes/notificacionRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const websocketService_1 = require("./services/websocketService"); // Importar la configuración de WebSocket
const chatService_1 = require("./services/chatService"); // Importar el servicio de chat
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Crear servidor HTTP
const server = http_1.default.createServer(app);
// Configurar Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
exports.io = io;
// Exportar el mapa de usuarios conectados y el servidor WebSocket
const connectedUsers = new Map();
exports.connectedUsers = connectedUsers;
// Configurar eventos de WebSocket
(0, websocketService_1.configureWebSocketEvents)(io); // Configuración desde el archivo separado
(0, chatService_1.configureChatEvents)(io); // Configuración de eventos del chat
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
app.use('/api/clases', claseRoutes_1.default);
app.use('/api/reviews', reviewRoutes_1.default);
app.use('/api/notificaciones', notificacionRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map