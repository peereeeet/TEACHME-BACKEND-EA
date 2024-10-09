import mongoose from 'mongoose';
import Profesor from './models/profesor';
import Asignatura from './models/asignatura'; // Asegúrate de importar el modelo Asignatura

mongoose.connect('mongodb://localhost:27017/ejercicio1')
  .then(() => {
    console.log('Conectado a MongoDB para el ejercicio 3...');
    main();
  })
  .catch(err => console.error('No se pudo conectar a MongoDB...', err));

////////////////////////////////ACTUALIZAR ASIGNATURAS DE UN PROFESOR POR NOMBRE//////////////////////////////////////////
async function actualizarAsignaturasProfesorPorNombre(nombreProfesor: string, nuevasAsignaturas: string[]) {
  const profesor = await Profesor.findOne({ nombre: nombreProfesor });

  if (!profesor) {
    console.error('Profesor no encontrado');
    return;
  }

  const asignaturas = await Asignatura.find({ nombre: { $in: nuevasAsignaturas } });

  if (asignaturas.length === 0) {
    console.error('Asignaturas no encontradas');
    return;
  }

  await Profesor.findByIdAndUpdate(profesor._id, {
    asignaturasImparte: asignaturas.map(asignatura => asignatura._id)
  });

  console.log(`Asignaturas actualizadas para ${nombreProfesor}`);
}

////////////////////////////////////////////MAIN//////////////////////////////////////////
async function main() {
  const nombreProfesor = 'Juan';
  const nuevasAsignaturas = ['Matemáticas', 'Física', 'Química'];

  console.log('Actualizando asignaturas ...');
  await actualizarAsignaturasProfesorPorNombre(nombreProfesor, nuevasAsignaturas);

  const profesor = await Profesor.findOne({ nombre: nombreProfesor }).populate('asignaturasImparte');
  console.log('Asignaturas', profesor?.asignaturasImparte);

  console.log('Adiós mundo cruel!');
  
  mongoose.connection.close(); // Ahora cierra la conexión después de completar las operaciones
}

main().catch(err => console.error(err));
