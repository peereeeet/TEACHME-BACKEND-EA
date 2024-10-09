import mongoose from 'mongoose';
import Profesor from './models/profesor';
import Asignatura from './models/asignatura';


mongoose.connect('mongodb://localhost:27017/ejercicio1')
  .then(() => {
    console.log('Conectado a MongoDB para el ejercicio 2...');
    main();
    })
    .catch(err => console.error('No se pudo conectar a MongoDB...', err));


////////////////////////////DELETE TODOS LOS PROFESORES Y ASIGNATURAS ////////////////////////////////
async function eliminarTodosLosProfesores() {
  const resultado = await Profesor.deleteMany({});
  console.log('Todos los profesores eliminados:', resultado);
}

async function eliminarTodoasLasAsignaturas() {
    const resultado = await Asignatura.deleteMany({});
    console.log('Todas las asignaturas eliminadas:', resultado);
}

///////////////////////////////////////////MAIN//////////////////////////////////////////
async function main() {
  await eliminarTodoasLasAsignaturas();
  await eliminarTodosLosProfesores();
  console.log('ADIOOOOOS MUNDO CRUEL');
    mongoose.connection.close();

  
}
