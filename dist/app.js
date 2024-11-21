"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const asignaturaRoutes_1 = __importDefault(require("./routes/asignaturaRoutes"));
const dotenv_1 = __importDefault(require("dotenv")); // Importar dotenv
// Cargar las variables de entorno desde el archivo .env
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
// Aplica el middleware CORS
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Conexión a MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/BBDD')
    .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})
    .catch(err => console.error('No se pudo conectar a MongoDB...', err));
// Rutas
app.use('/api/usuarios', usuarioRoutes_1.default);
app.use('/api/asignaturas', asignaturaRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map