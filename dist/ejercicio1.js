"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usuario_1 = __importDefault(require("./models/usuario"));
const asignatura_1 = __importDefault(require("./models/asignatura"));
mongoose_1.default.connect('mongodb://127.0.0.1:27017/ejercicio1')
    .then(() => {
    console.log('Conectado a MongoDB parece que te vas a tener que esperar xd...');
    main();
})
    .catch(err => console.error('No se pudo conectar a MongoDB, que pena xdxd...', err));
/////////////////////////////////////FUNCIONES CRUD//////////////////////////////////////////
//////////////////////////////////////////CREATE//////////////////////////////////////////
function crearProfesor(nombre, edad) {
    return __awaiter(this, void 0, void 0, function* () {
        const profesor = new usuario_1.default({ nombre, edad });
        const resultado = yield profesor.save();
        console.log('Profesor creado:', resultado);
    });
}
function crearAsignatura(nombre, descripcion) {
    return __awaiter(this, void 0, void 0, function* () {
        const asignatura = new asignatura_1.default({ nombre, descripcion });
        const resultado = yield asignatura.save();
        console.log('Asignatura creada:', resultado);
    });
}
//////////////////////////////////////////ASIGNAR ASIGNATURAS A PROFESOR////////////////////////////
function asignarAsignaturasAProfesor(nombreProfesor, nombresAsignaturas) {
    return __awaiter(this, void 0, void 0, function* () {
        const profesor = yield usuario_1.default.findOne({ nombre: nombreProfesor });
        if (!profesor) {
            console.error('Profesor no encontrado');
            return;
        }
        const asignaturas = yield asignatura_1.default.find({ nombre: { $in: nombresAsignaturas } });
        if (asignaturas.length === 0) {
            console.error('Asignaturas no encontradas');
            return;
        }
        asignaturas.forEach(asignatura => {
            if (!profesor.asignaturasImparte.includes(asignatura._id)) {
                profesor.asignaturasImparte.push(asignatura._id);
            }
        });
        yield profesor.save();
        console.log(`Asignaturas asignadas a ${nombreProfesor}:`, profesor.asignaturasImparte);
    });
}
/*
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
    }*/
/////////////////////////////////////////////READ//////////////////////////////////////////
function listarProfesores() {
    return __awaiter(this, void 0, void 0, function* () {
        const profesores = yield usuario_1.default.find().populate('asignaturasImparte');
        console.log('Profesores:', profesores);
    });
}
function listarAsignaturas() {
    return __awaiter(this, void 0, void 0, function* () {
        const asignaturas = yield asignatura_1.default.find().populate('profesores');
        console.log('Asignaturas:', asignaturas);
    });
}
/////////////////////////////////////////////READ BY ID//////////////////////////////////////////
function verProfesor(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const profesor = yield usuario_1.default.findById(id);
        console.log('Profesor:', profesor);
    });
}
function verAsignatura(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const asignatura = yield asignatura_1.default.findById(id).populate('profesores');
        console.log('Asignatura:', asignatura);
    });
}
//////////////////////////////READ BY NAME//////////////////////////////////////////
function verProfesorPorNombre(nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        const profesor = yield usuario_1.default.findOne({ nombre });
        console.log('Profesor:', profesor);
    });
}
function verAsignaturaPorNombre(nombre) {
    return __awaiter(this, void 0, void 0, function* () {
        const asignatura = yield asignatura_1.default.findOne({ nombre });
        console.log('Asignatura:', asignatura);
    });
}
/////////////////////////////////////////////AGREGATION PIPELINE//////////////////////////////////////////
function obtenerNumeroDeProfesoresPorAsignatura() {
    return __awaiter(this, void 0, void 0, function* () {
        const resultado = yield asignatura_1.default.aggregate([
            { $unwind: '$profesores' },
            { $group: { _id: '$nombre', numeroDeProfesores: { $sum: 1 } } }
        ]);
        console.log('Número de profesores por asignatura:', resultado);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        ////////CREAR 4 PROFESORES Y 10 ASIGNATURAS//////////////////
        /* console.log('CREAR 4 PROFESORES Y 10 ASIGNATURAS');
         await crearProfesor('Juan', 30);
         await crearProfesor('Pedro', 40);
         await crearProfesor('Jordi', 35);
         await crearProfesor('Bryan', 23);*/
        console.log('CREAR 10 ASIGNATURAS');
        yield crearAsignatura('Matematicas', 'Calculo y algebra');
        yield crearAsignatura('Fisica', 'Estudio de la materia');
        yield crearAsignatura('Quimica', 'Estudio de los atomos');
        yield crearAsignatura('Biologia', 'Estudio de los seres vivos');
        yield crearAsignatura('Historia', 'Estudio de la historia');
        yield crearAsignatura('Geografia', 'Estudio de la tierra');
        yield crearAsignatura('Ingles', 'Estudio del idioma');
        yield crearAsignatura('Programacion', 'Estudio de la programacion');
        yield crearAsignatura('Lenguaje', 'Estudio del lenguaje');
        yield crearAsignatura('Musica', 'Estudio de la musica');
        /////////ASIGNAR ASIGNATURAS A PROFESORES CON POPULATE////////////////////////
        /////////ASIGNAR 3 ASIGNATURAS A CADA PROFESOR ////////////////////////
        /*console.log('ASIGNAR ASIGNATURAS A PROFESORES CON POPULATE:  3 ASIGNATURAS A CADA PROFESOR');
       
        await asignarAsignaturasAProfesor('Juan', ['Matematicas', 'Fisica', 'Quimica']);
        await asignarAsignaturasAProfesor('Pedro', ['Biologia', 'Historia', 'Geografia']);
        await asignarAsignaturasAProfesor('Jordi', ['Ingles', 'Programacion', 'Lenguaje']);
        await asignarAsignaturasAProfesor('Bryan', ['Musica', 'Lenguaje', 'Programacion']);*/
        /*
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
    */ /*
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
            */
        mongoose_1.default.connection.close();
    });
}
//# sourceMappingURL=ejercicio1.js.map