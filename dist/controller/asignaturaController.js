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
exports.crearAsignatura = crearAsignatura;
exports.listarAsignaturas = listarAsignaturas;
exports.verAsignaturaPorId = verAsignaturaPorId;
exports.asignarProfesoresAAsignatura = asignarProfesoresAAsignatura;
exports.eliminarAsignaturaPorId = eliminarAsignaturaPorId;
exports.actualizarProfesoresAsignaturaPorNombre = actualizarProfesoresAsignaturaPorNombre;
const asignaturaService = __importStar(require("../services/asignaturaService"));
////////////////////////////////////CREAR ASIGNATURA/////////////////////////////////////
function crearAsignatura(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nombre, descripcion } = req.body;
            const asignatura = yield asignaturaService.crearAsignatura(nombre, descripcion);
            res.status(201).json(asignatura);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
////////////////////////////////////LISTAR ASIGNATURAS/////////////////////////////////////
function listarAsignaturas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const asignaturas = yield asignaturaService.listarAsignaturas();
            res.status(200).json(asignaturas);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
////////////////////////////////////VER ASIGNATURA POR ID/////////////////////////////////////
function verAsignaturaPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const asignatura = yield asignaturaService.verAsignaturaPorId(req.params._id);
            if (!asignatura) {
                return res.status(404).json({ error: 'Asignatura no encontrada' });
            }
            res.status(200).json(asignatura);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
////////////////////////////////////ASIGNAR PROFESORES A UNA ASIGNATURA/////////////////////////////////////
function asignarProfesoresAAsignatura(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const asignatura = yield asignaturaService.asignarProfesoresAAsignatura(req.params.nombre, req.body.nombresProfesores);
            res.status(200).json(asignatura);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
////////////////////////////////////ELIMINAR ASIGNATURA POR ID/////////////////////////////////////
function eliminarAsignaturaPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const asignatura = yield asignaturaService.eliminarAsignaturaPorId(req.params._id);
            res.status(200).json(asignatura);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
////////////////////////////////////ACTUALIZAR PROFESORES DE UNA ASIGNATURA POR NOMBRE/////////////////////////////////////
function actualizarProfesoresAsignaturaPorNombre(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const asignatura = yield asignaturaService.actualizarProfesoresAsignaturaPorNombre(req.params.nombre, req.body.nuevosProfesores);
            res.status(200).json(asignatura);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
/*
const router = Router();

// Crear una nueva asignatura
router.post('/', async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion } = req.body;
    const asignatura = await crearAsignatura(nombre, descripcion);
    res.status(201).json(asignatura);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

// Listar todas las asignaturas
router.get('/', async (req: Request, res: Response) => {
  try {
    const asignaturas = await listarAsignaturas();
    res.status(200).json(asignaturas);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Ver una asignatura por id
router.get('/:_id', async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const asignatura = await verAsignaturaPorId(_id);
    if (!asignatura) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.status(200).json(asignatura);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Asignar profesores a una asignatura
router.put('/:nombre/asignar-profesores', async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const { nombresProfesores } = req.body;
    const asignatura = await asignarProfesoresAAsignatura(nombre, nombresProfesores);
    res.status(200).json(asignatura);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

// Eliminar una asignatura por id
router.delete('/:_id', async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const resultado = await eliminarAsignaturaPorId(_id);
    if (!resultado) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.status(204).send(); // No hay contenido que devolver
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// Actualizar profesores de una asignatura por nombre
router.put('/:nombre/actualizar-profesores', async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const { nuevosProfesores } = req.body;
    const asignatura = await actualizarProfesoresAsignaturaPorNombre(nombre, nuevosProfesores);
    res.status(200).json(asignatura);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

export default router;*/
//# sourceMappingURL=asignaturaController.js.map