import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import * as claseService from '../services/claseService';

export const crearClase = async (req: Request, res: Response) => {
  try {
    const { profesor, alumno, asignatura, fecha, duracion } = req.body;
    const clase = await claseService.crearClase(profesor, alumno, asignatura, new Date(fecha), duracion);
    res.status(201).json(clase);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const finalizarClase = async (req: Request, res: Response) => {
  try {
    const claseId = req.params.id;
    const clase = await claseService.finalizarClase(claseId);
    res.status(200).json(clase);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listarClasesDeUsuario = async (req: Request, res: Response) => {
  try {
    const { usuarioId, rol } = req.params;

    // Validar si el ID es válido
    if (!isValidObjectId(usuarioId)) {
      return res.status(400).json({ error: 'El ID del usuario no es válido' });
    }

    const clases = await claseService.listarClasesDeUsuario(usuarioId, rol as 'profesor' | 'alumno');
    res.status(200).json(clases);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Nueva función para listar todas las clases
export const listarTodasLasClases = async (req: Request, res: Response) => {
  try {
    const clases = await claseService.listarTodasLasClases();
    res.status(200).json(clases);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
