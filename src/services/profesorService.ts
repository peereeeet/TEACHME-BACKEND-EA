import Profesor from '../models/profesor';
import Asignatura from '../models/asignatura';

/////////////////////////////////////////CREAR PROFESOR////////////////////////////////////////
export const crearProfesor = async (nombre: string, edad: number) => {
  const profesor = new Profesor({ nombre, edad });
  return await profesor.save();
};

/////////////////////////////////////////LISTAR PROFESORES//////////////////////////////////////
export const listarProfesores = async () => {
  return await Profesor.find().populate('asignaturasImparte');
};

/////////////////////////////////////////VER PROFESOR POR NOMBRE/////////////////////////////////////
export const verProfesorPorNombre = async (nombre: string) => {
  return await Profesor.findOne({ nombre }).populate('asignaturasImparte');
};

/////////////////////////////////////////ASIGNAR ASIGNATURAS A PROFESOR/////////////////////////////////////
export const asignarAsignaturasAProfesor = async (nombreProfesor: string, nombresAsignaturas: string[]) => {
  const profesor = await Profesor.findOne({ nombre: nombreProfesor });

  if (!profesor) {
    throw new Error('Profesor no encontrado');
  }

  console.log(`Profesor encontrado: ${JSON.stringify(profesor)}`);

  const asignaturas = await Asignatura.find({ nombre: { $in: nombresAsignaturas } });

  console.log(`Asignaturas encontradas: ${JSON.stringify(asignaturas)}`);

  if (asignaturas.length === 0) {
    throw new Error('Asignaturas no encontradas');
  }

  asignaturas.forEach(asignatura => {
    
    if (!profesor.asignaturasImparte.includes(asignatura._id)) {
      profesor.asignaturasImparte.push(asignatura._id);
    }
  });

  await profesor.save();
  console.log(`Profesor actualizado: ${JSON.stringify(profesor)}`);
  return profesor;
};


///////////////////////////////ACTUALIZAR ASIGNATURAS DE PROFESOR POR NOMBRE///////////////////////////
export const actualizarAsignaturasProfesorPorNombre = async (nombreProfesor: string, nuevasAsignaturas: string[]) => {
  const profesor = await Profesor.findOne({ nombre: nombreProfesor });

  if (!profesor) {
    throw new Error('Profesor no encontrado');
  }

  const asignaturas = await Asignatura.find({ nombre: { $in: nuevasAsignaturas } });

  if (asignaturas.length === 0) {
    throw new Error('Asignaturas no encontradas');
  }

  await Profesor.findByIdAndUpdate(profesor._id, {
    asignaturasImparte: asignaturas.map(asignatura => asignatura._id)
  });

  console.log(`Asignaturas actualizadas para ${nombreProfesor}`);
};

/////////////////////////////////////ELIMINAR PROFESOR POR NOMBRE////////////////////////////////////////
export const eliminarProfesorPorNombre = async (nombre: string) => {
  const resultado = await Profesor.findOneAndDelete({ nombre });
  return resultado;
};

/////////////////////////////////////////////ELIMINAR ASIGNATURA DE PROFESOR POR NOMBRE///////////////////////////////////

export const eliminarAsignaturaDeProfesorPorNombre = async (nombreProfesor: string, nombreAsignatura: string) => {
  const profesor = await Profesor.findOne({ nombre: nombreProfesor });

  if (!profesor) {
    throw new Error('Profesor no encontrado');
  }

  const asignatura = await Asignatura.findOne({ nombre: nombreAsignatura });

  if (!asignatura) {
    throw new Error('Asignatura no encontrada');
  }

  await Profesor.findByIdAndUpdate(profesor._id, {
    asignaturasImparte: profesor.asignaturasImparte.filter(asignaturaId => asignaturaId.toString() !== asignatura._id.toString())
  });

  console.log(`Asignatura eliminada de ${nombreProfesor}`);
};




