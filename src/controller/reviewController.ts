import { Request, Response } from 'express';
import * as reviewService from '../services/reviewService';

export const crearReview = async (req: Request, res: Response) => {
    try {
      const { clase, autor, contenido, puntuacion } = req.body;
  
      // Validación de campos
      if (!clase || !autor || !contenido || puntuacion == null) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
      }
  
      // Crear la review
      const review = await reviewService.crearReview(clase, autor, contenido, puntuacion);
      res.status(201).json(review);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
  

export const listarReviewsDeClase = async (req: Request, res: Response) => {
  try {
    const { claseId } = req.params;

    if (!claseId) {
      return res.status(400).json({ error: 'El ID de la clase es obligatorio.' });
    }

    const reviews = await reviewService.listarReviewsDeClase(claseId);
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerReviewsPorProfesor = async (req: Request, res: Response) => {
  try {
    const { profesorId } = req.params;

    if (!profesorId) {
      return res.status(400).json({ error: 'El ID del profesor es obligatorio.' });
    }

    const reviews = await reviewService.obtenerReviewsPorProfesor(profesorId);
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
