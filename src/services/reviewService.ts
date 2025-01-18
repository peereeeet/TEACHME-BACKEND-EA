import Review, { IReview } from '../models/review';
import Clase from '../models/clase';
import { Types } from 'mongoose';

// Crear review
export const crearReview = async (claseId: string, autorId: string, contenido: string, puntuacion: number) => {
  if (!Types.ObjectId.isValid(claseId)) {
    throw new Error('El ID de la clase no es válido.');
  }

  const clase = await Clase.findById(claseId);

  if (!clase) {
    throw new Error('La clase no existe.');
  }

  if (clase.estado !== 'finalizada') {
    throw new Error('No se puede hacer una review de una clase no finalizada.');
  }

  const review = new Review({
    clase: new Types.ObjectId(claseId),
    autor: new Types.ObjectId(autorId),
    contenido,
    puntuacion,
  });

  return await review.save();
};

// Listar reviews de una clase
export const listarReviewsDeClase = async (claseId: string) => {
  if (!Types.ObjectId.isValid(claseId)) {
    throw new Error('El ID de la clase no es válido.');
  }

  return await Review.find({ clase: claseId }).populate(['clase', 'autor']);
};

// Obtener reviews por profesor
export const obtenerReviewsPorProfesor = async (profesorId: string) => {
  if (!Types.ObjectId.isValid(profesorId)) {
    throw new Error('El ID del profesor no es válido.');
  }

  const clases = await Clase.find({ profesor: profesorId }).select('_id');

  if (!clases || clases.length === 0) {
    return [];
  }

  const claseIds = clases.map((clase) => clase._id);

  return await Review.find({ clase: { $in: claseIds } }).populate('autor clase');
};
