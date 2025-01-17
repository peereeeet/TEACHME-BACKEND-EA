import { Request, Response } from 'express';
import {
  actualizarUbicacionUsuario,
  obtenerUsuariosCercanos,
  obtenerTodasLasUbicaciones,
  listarUsuariosPorProximidad,
} from '../services/mapaService';

// Actualizar o guardar la ubicación del usuario
export const actualizarUbicacion = async (req: Request, res: Response) => {
  const { usuarioId, lat, lng } = req.body;

  try {
    // Validación de parámetros
    if (!usuarioId || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: 'Faltan parámetros necesarios: usuarioId, lat, lng.' });
    }

    // Llamada al servicio para actualizar la ubicación
    const usuario = await actualizarUbicacionUsuario(usuarioId, lat, lng);
    res.status(200).json({ message: 'Ubicación actualizada correctamente.', usuario });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener usuarios cercanos a una ubicación específica
export const usuariosCercanos = async (req: Request, res: Response) => {
  const { lat, lng, distancia } = req.body;

  try {
    // Validación de parámetros
    if (lat === undefined || lng === undefined || distancia === undefined) {
      return res.status(400).json({ error: 'Faltan parámetros necesarios: lat, lng, distancia.' });
    }

    // Llamada al servicio para obtener usuarios cercanos
    const usuarios = await obtenerUsuariosCercanos(lat, lng, distancia);
    res.status(200).json({ usuarios });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las ubicaciones de los usuarios
export const todasLasUbicaciones = async (_req: Request, res: Response) => {
  try {
    // Llamada al servicio para obtener todas las ubicaciones
    const ubicaciones = await obtenerTodasLasUbicaciones();
    res.status(200).json({ ubicaciones });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Listar usuarios por proximidad desde una ubicación
export const usuariosPorProximidad = async (req: Request, res: Response) => {
  const { lat, lng } = req.body;

  try {
    // Validación de parámetros
    if (lat === undefined || lng === undefined) {
      return res.status(400).json({ error: 'Faltan parámetros necesarios: lat, lng.' });
    }

    // Llamada al servicio para listar usuarios por proximidad
    const usuarios = await listarUsuariosPorProximidad(lat, lng);
    res.status(200).json({ usuarios });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
