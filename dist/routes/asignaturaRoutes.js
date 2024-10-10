"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asignaturaService_1 = require("../services/asignaturaService");
const router = express_1.default.Router();
// Rutas para asignaturas
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion } = req.body;
    try {
        const nuevaAsignatura = yield (0, asignaturaService_1.crearAsignatura)(nombre, descripcion);
        res.status(201).json(nuevaAsignatura);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear asignatura' });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asignaturas = yield (0, asignaturaService_1.listarAsignaturas)();
        res.json(asignaturas);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al listar asignaturas' });
    }
}));
exports.default = router;
//# sourceMappingURL=asignaturaRoutes.js.map