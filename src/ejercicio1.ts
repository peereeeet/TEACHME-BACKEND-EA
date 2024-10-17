import mongoose from 'mongoose';
import Profesor from './models/profesor';
import Asignatura from './models/asignatura';

mongoose.connect('mongodb://127.0.0.1:27017/ejercicio1')
  .then(() => {
    console.log('Conectado a MongoDB parece que te vas a tener que esperar xd...');
    main();
  })

  .catch(err => console.error('No se pudo conectar a MongoDB, que pena xdxd...', err));
 

/////////////////////////////////////FUNCIONES CRUD//////////////////////////////////////////
//////////////////////////////////////////CREATE//////////////////////////////////////////
async function crearProfesor(nombre: string, edad: number) {
    const profesor = new Profesor({ nombre, edad });
    const resultado = await profesor.save();
    console.log('Profesor creado:', resultado);
  }

async function crearAsignatura(nombre: string, descripcion: string) {
    const asignatura = new Asignatura({ nombre, descripcion });
    const resultado = await asignatura.save();
    console.log('Asignatura creada:', resultado);
  }

//////////////////////////////////////////ASIGNAR ASIGNATURAS A PROFESOR////////////////////////////
async function asignarAsignaturasAProfesor(nombreProfesor: string, nombresAsignaturas: string[]) {
  const profesor = await Profesor.findOne({ nombre: nombreProfesor });

  if (!profesor) {
    console.error('Profesor no encontrado');
    return;
  }

  const asignaturas = await Asignatura.find({ nombre: { $in: nombresAsignaturas } });
  if (asignaturas.length === 0) {
    console.error('Asignaturas no encontradas');
    return;
  }

  
  asignaturas.forEach(asignatura => {
    if (!profesor.asignaturasImparte.includes(asignatura._id)) {
      profesor.asignaturasImparte.push(asignatura._id);
    }
  });

  await profesor.save();
  console.log(`Asignaturas asignadas a ${nombreProfesor}:`, profesor.asignaturasImparte);
}

  //////////////////////////////////////////ASIGNAR PROFESORES A LAS ASIGNATURAS QUE IMPARTEN///////////////
    async function asignarProfesoresAAsignatura(nombreAsignatura: string, nombresProfesores: string[]) {
        const asignatura = await Asignatura.findOne({ nombre: nombreAsignatura }).populate('profesores');
        
        if (!asignatura) {
        console.error('Asignatura no encontrada');
        return;
        }
    
        const profesores = await Profesor.find({ nombre: { $in: nombresProfesores } });
        if (profesores.length === 0) {
        console.error('Profesores no encontrados');
        return;
        }
    
        profesores.forEach(profesor => asignatura.profesores.push(profesor._id));
        await asignatura.save();
        console.log(`Profesores asignados a ${nombreAsignatura}:`, asignatura.profesores);
    }
  

  /////////////////////////////////////////////READ//////////////////////////////////////////
async function listarProfesores() {
    const profesores = await Profesor.find().populate('asignaturasImparte');
    console.log('Profesores:', profesores);
  }


async function listarAsignaturas() {
    const asignaturas = await Asignatura.find().populate('profesores');
    console.log('Asignaturas:', asignaturas);
  }

  /////////////////////////////////////////////READ BY ID//////////////////////////////////////////

  async function verProfesor(id: string) {
    const profesor = await Profesor.findById(id);
    console.log('Profesor:', profesor);
  }
  

  async function verAsignatura(id: string) {
    const asignatura = await Asignatura.findById(id).populate('profesores'); 
    console.log('Asignatura:', asignatura);
  }
  
//////////////////////////////READ BY NAME//////////////////////////////////////////
async function verProfesorPorNombre(nombre: string) {
    const profesor = await Profesor.findOne({ nombre });
    console.log('Profesor:', profesor);
  }

async function verAsignaturaPorNombre(nombre: string) {
    const asignatura = await Asignatura.findOne({ nombre });
    console.log('Asignatura:', asignatura);
  }
  

/////////////////////////////////////////////AGREGATION PIPELINE//////////////////////////////////////////
async function obtenerNumeroDeProfesoresPorAsignatura() {
    const resultado = await Asignatura.aggregate([
      { $unwind: '$profesores' },
      { $group: { _id: '$nombre', numeroDeProfesores: { $sum: 1 } } }
    ]);
    console.log('Número de profesores por asignatura:', resultado);
  }




  async function main() {
    ////////CREAR 4 PROFESORES Y 10 ASIGNATURAS//////////////////
    console.log('CREAR 4 PROFESORES Y 10 ASIGNATURAS');
    await crearProfesor('Juan', 30);
    await crearProfesor('Pedro', 40);
    await crearProfesor('Jordi', 35);
    await crearProfesor('Bryan', 23);
    await crearAsignatura('Matematicas', 'Calculo y algebra');
    await crearAsignatura('Fisica', 'Estudio de la materia');
    await crearAsignatura('Quimica', 'Estudio de los atomos');
    await crearAsignatura('Biologia', 'Estudio de los seres vivos');
    await crearAsignatura('Historia', 'Estudio de la historia');
    await crearAsignatura('Geografia', 'Estudio de la tierra');
    await crearAsignatura('Ingles', 'Estudio del idioma');
    await crearAsignatura('Programacion', 'Estudio de la programacion');
    await crearAsignatura('Lenguaje', 'Estudio del lenguaje');
    await crearAsignatura('Musica', 'Estudio de la musica');

    /////////ASIGNAR ASIGNATURAS A PROFESORES CON POPULATE////////////////////////
    /////////ASIGNAR 3 ASIGNATURAS A CADA PROFESOR ////////////////////////
    console.log('ASIGNAR ASIGNATURAS A PROFESORES CON POPULATE:  3 ASIGNATURAS A CADA PROFESOR');
   
    await asignarAsignaturasAProfesor('Juan', ['Matematicas', 'Fisica', 'Quimica']);
    await asignarAsignaturasAProfesor('Pedro', ['Biologia', 'Historia', 'Geografia']);
    await asignarAsignaturasAProfesor('Jordi', ['Ingles', 'Programacion', 'Lenguaje']);
    await asignarAsignaturasAProfesor('Bryan', ['Musica', 'Lenguaje', 'Programacion']);
    
    /////////ASIGNAR PROFESORES A CADA ASIGNATURA CORRESPONDIENTE ////////////////////////
    console.log('ASIGNAR PROFESORES A CADA ASIGNATURA CORRESPONDIENTE');
    await asignarProfesoresAAsignatura('Matematicas', ['Juan']);
    await asignarProfesoresAAsignatura('Fisica', ['Juan']);
    await asignarProfesoresAAsignatura('Quimica', ['Juan']);
    await asignarProfesoresAAsignatura('Biologia', ['Pedro']);
    await asignarProfesoresAAsignatura('Historia', ['Pedro']);
    await asignarProfesoresAAsignatura('Geografia', ['Pedro']);
    await asignarProfesoresAAsignatura('Ingles', ['Jordi']);
    await asignarProfesoresAAsignatura('Programacion', ['Jordi']);
    await asignarProfesoresAAsignatura('Lenguaje', ['Jordi']);
    await asignarProfesoresAAsignatura('Musica', ['Bryan']);
    await asignarProfesoresAAsignatura('Lenguaje', ['Bryan']);
    await asignarProfesoresAAsignatura('Programacion', ['Bryan']);

    /////////LISTAR PROFESORES Y ASIGNATURAS////////////////////////
    console.log('LISTAR PROFESORES Y ASIGNATURAS');
    await listarProfesores();
    await listarAsignaturas();

    /////////VER PROFESOR Y ASIGNATURA////////////////////////
    console.log('VER PROFESOR Y ASIGNATURA');
    await verProfesorPorNombre('Juan');
   await verAsignaturaPorNombre('Matematicas');
    
    /////////////////////////////////////////////AGREGATION PIPELINE//////////////////////////////////////////
    console.log('AGREGATION PIPELINE');
    await obtenerNumeroDeProfesoresPorAsignatura();
    


    mongoose.connection.close();

  }

