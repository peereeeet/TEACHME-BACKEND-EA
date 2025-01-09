import { Request, Response } from 'express';
import * as asignaturaService from '../services/asignaturaService';

////////////////////////////////////CREAR ASIGNATURA/////////////////////////////////////
export async function crearAsignatura(req: Request, res: Response) {
  try {
    const { nombre, nivel } = req.body;
    const asignatura = await asignaturaService.crearAsignatura(nombre, nivel);
    return res.status(201).json(asignatura);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

////////////////////////////////////LISTAR ASIGNATURAS/////////////////////////////////////
export async function listarAsignaturas(req: Request, res: Response) {
  try {
    const asignaturas = await asignaturaService.listarAsignaturas();
    return res.status(200).json(asignaturas);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

////////////////////////////////////VER ASIGNATURA POR NOMBRE E ID/////////////////////////////////////
export async function verAsignaturaPorId(req: Request, res: Response) {
  try {
    const asignatura = await asignaturaService.verAsignaturaPorId(req.params._id);
    if (!asignatura) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.status(200).json(asignatura);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function verAsignaturaPorNombre(req: Request, res: Response) {
  try {
    const asignatura = await asignaturaService.verAsignaturaPorNombre(req.params.nombre);
    if (!asignatura) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.status(200).json(asignatura);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

////////////////////////////////////ELIMINAR ASIGNATURA POR NOMBRE E ID/////////////////////////////////////
export async function eliminarAsignaturaPorId(req: Request, res: Response) {
  try {
    const asignatura = await asignaturaService.eliminarAsignaturaPorId(req.params._id);
    if (!asignatura) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.status(200).json({ message: 'Asignatura eliminada con éxito' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function eliminarAsignaturaPorNombre(req: Request, res: Response) {
  try {
    const asignatura = await asignaturaService.eliminarAsignaturaPorNombre(req.params.nombre);
    if (!asignatura) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.status(200).json({ message: 'Asignatura eliminada con éxito' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

////////////////////////////////////OBTENER ASIGNATURAS PAGINADAS/////////////////////////////////////
export const obtenerAsignaturasPaginadas = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const asignaturasPaginadas = await asignaturaService.obtenerAsignaturasPaginadas(
      parseInt(page as string),
      parseInt(limit as string)
    );
    res.status(200).json(asignaturasPaginadas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
