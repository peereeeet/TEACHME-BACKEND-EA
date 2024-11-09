import { Router, Request, Response } from 'express';
import * as asignaturaService from '../services/asignaturaService';

////////////////////////////////////CREAR ASIGNATURA/////////////////////////////////////
export async function crearAsignatura(req: Request, res: Response) {
  try {
    const { nombre, descripcion } = req.body;
    const asignatura = await asignaturaService.crearAsignatura(nombre, descripcion);
    return res.status(201).json(asignatura); // Usar `return` para asegurar una única respuesta
  } catch (error: any) {
    return res.status(400).json({ error: error.message }); // Usar `return` aquí también
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
    console.log(asignatura);
    res.status(200).send().json(asignatura);  
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
    console.log(asignatura);
    res.status(200).json(asignatura);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

//AÑADIR USUARIO A ASIGNATURA POR NOMBRE E ID
export async function asignarUsuariosAAsignaturaPorNombre(req: Request, res: Response) {
  try {
    const { nombreAsignatura, nombresUsuarios } = req.body;
    const asignatura = await asignaturaService.asignarUsuariosAAsignaturaPorNombre(nombreAsignatura, nombresUsuarios);
    console.log(asignatura);
    res.status(200).send().json(asignatura);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function asignarUsuariosAAsignaturaPorId(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    const { nombresUsuarios } = req.body;
    const asignatura = await asignaturaService.asignarUsuariosAAsignaturaPorId(_id, nombresUsuarios);
    console.log(asignatura);
    res.status(200).send().json(asignatura);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
} 
//ELIMINAR ASIGNATURA DE LA BASE DE DATOS POR NOMBRE E ID
export async function eliminarAsignaturaPorNombre(req: Request, res: Response) {
  try {
    const { nombre } = req.params;
    const resultado = await asignaturaService.eliminarAsignaturaPorNombre(nombre);
    if (!resultado) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    console.log(listarAsignaturas);
    res.status(200).send().json(listarAsignaturas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function eliminarAsignaturaPorId(req: Request, res: Response) {
  try {
    console.log("ID recibido para eliminar:", req.params._id); // Agrega este log
    const asignatura = await asignaturaService.eliminarAsignaturaPorId(req.params._id);
    if (!asignatura) {
      return res.status(404).json({ error: 'Asignatura no encontrada' });
    }
    res.status(200).json({ message: 'Asignatura eliminada con éxito' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
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
