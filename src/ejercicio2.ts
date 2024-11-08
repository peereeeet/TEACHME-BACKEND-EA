import mongoose from 'mongoose';
import Profesor from './models/usuario';
import Asignatura from './models/asignatura';
import Usuario from './models/usuario';


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
//delete de todos los usuarios
async function eliminarTodosLosUsuarios() {
  const resultado = await Usuario.deleteMany({});
  console.log('Todos los usuarios eliminados:', resultado);
  
}

///////////////////////////////////////////MAIN//////////////////////////////////////////
async function main() {
  await eliminarTodoasLasAsignaturas();
  await eliminarTodosLosProfesores();
  await eliminarTodosLosUsuarios();
  console.log('ADIOOOOOS MUNDO CRUEL');
    mongoose.connection.close();

  
}
