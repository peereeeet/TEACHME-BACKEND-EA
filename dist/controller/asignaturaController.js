"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerAsignaturasPaginadas = void 0;
exports.crearAsignatura = crearAsignatura;
exports.listarAsignaturas = listarAsignaturas;
exports.verAsignaturaPorId = verAsignaturaPorId;
exports.verAsignaturaPorNombre = verAsignaturaPorNombre;
exports.asignarUsuariosAAsignaturaPorNombre = asignarUsuariosAAsignaturaPorNombre;
exports.asignarUsuariosAAsignaturaPorId = asignarUsuariosAAsignaturaPorId;
exports.eliminarAsignaturaPorNombre = eliminarAsignaturaPorNombre;
exports.eliminarAsignaturaPorId = eliminarAsignaturaPorId;
const asignaturaService = __importStar(require("../services/asignaturaService"));
////////////////////////////////////CREAR ASIGNATURA/////////////////////////////////////
function crearAsignatura(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nombre, descripcion } = req.body;
            const asignatura = yield asignaturaService.crearAsignatura(nombre, descripcion);
            return res.status(201).json(asignatura); // Usar `return` para asegurar una única respuesta
        }
        catch (error) {
            return res.status(400).json({ error: error.message }); // Usar `return` aquí también
        }
    });
}
////////////////////////////////////LISTAR ASIGNATURAS/////////////////////////////////////
function listarAsignaturas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const asignaturas = yield asignaturaService.listarAsignaturas();
            return res.status(200).json(asignaturas);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
////////////////////////////////////VER ASIGNATURA POR NOMBRE E ID/////////////////////////////////////
function verAsignaturaPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const asignatura = yield asignaturaService.verAsignaturaPorId(req.params._id);
            if (!asignatura) {
                return res.status(404).json({ error: 'Asignatura no encontrada' });
            }
            console.log(asignatura);
            res.status(200).send().json(asignatura);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function verAsignaturaPorNombre(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const asignatura = yield asignaturaService.verAsignaturaPorNombre(req.params.nombre);
            if (!asignatura) {
                return res.status(404).json({ error: 'Asignatura no encontrada' });
            }
            console.log(asignatura);
            res.status(200).json(asignatura);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
//AÑADIR USUARIO A ASIGNATURA POR NOMBRE E ID
function asignarUsuariosAAsignaturaPorNombre(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nombreAsignatura, nombresUsuarios } = req.body;
            const asignatura = yield asignaturaService.asignarUsuariosAAsignaturaPorNombre(nombreAsignatura, nombresUsuarios);
            console.log(asignatura);
            res.status(200).send().json(asignatura);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
function asignarUsuariosAAsignaturaPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id } = req.params;
            const { nombresUsuarios } = req.body;
            const asignatura = yield asignaturaService.asignarUsuariosAAsignaturaPorId(_id, nombresUsuarios);
            console.log(asignatura);
            res.status(200).send().json(asignatura);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
//ELIMINAR ASIGNATURA DE LA BASE DE DATOS POR NOMBRE E ID
function eliminarAsignaturaPorNombre(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nombre } = req.params;
            const resultado = yield asignaturaService.eliminarAsignaturaPorNombre(nombre);
            if (!resultado) {
                return res.status(404).json({ error: 'Asignatura no encontrada' });
            }
            console.log(listarAsignaturas);
            res.status(200).send().json(listarAsignaturas);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function eliminarAsignaturaPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("ID recibido para eliminar:", req.params._id); // Agrega este log
            const asignatura = yield asignaturaService.eliminarAsignaturaPorId(req.params._id);
            if (!asignatura) {
                return res.status(404).json({ error: 'Asignatura no encontrada' });
            }
            res.status(200).json({ message: 'Asignatura eliminada con éxito' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
const obtenerAsignaturasPaginadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 5 } = req.query;
        const asignaturasPaginadas = yield asignaturaService.obtenerAsignaturasPaginadas(parseInt(page), parseInt(limit));
        res.status(200).json(asignaturasPaginadas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.obtenerAsignaturasPaginadas = obtenerAsignaturasPaginadas;
//# sourceMappingURL=asignaturaController.js.map