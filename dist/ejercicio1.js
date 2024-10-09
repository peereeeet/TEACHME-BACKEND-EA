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
const profesor_1 = __importDefault(require("./models/profesor"));
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
        const profesor = new profesor_1.default({ nombre, edad });
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
        const profesor = yield profesor_1.default.findOne({ nombre: nombreProfesor }).populate('asignaturasImparte');
        if (!profesor) {
            console.error('Profesor no encontrado');
            return;
        }
        const asignaturas = yield asignatura_1.default.find({ nombre: { $in: nombresAsignaturas } });
        if (asignaturas.length === 0) {
            console.error('Asignaturas no encontradas');
            return;
        }
        asignaturas.forEach(asignatura => profesor.asignaturasImparte.push(asignatura._id));
        yield profesor.save();
        console.log(`Asignaturas asignadas a ${nombreProfesor}:`, profesor.asignaturasImparte);
    });
}
//////////////////////////////////////////ASIGNAR PROFESORES A LAS ASIGNATURAS QUE IMPARTEN///////////////
function asignarProfesoresAAsignatura(nombreAsignatura, nombresProfesores) {
    return __awaiter(this, void 0, void 0, function* () {
        const asignatura = yield asignatura_1.default.findOne({ nombre: nombreAsignatura }).populate('profesores');
        if (!asignatura) {
            console.error('Asignatura no encontrada');
            return;
        }
        const profesores = yield profesor_1.default.find({ nombre: { $in: nombresProfesores } });
        if (profesores.length === 0) {
            console.error('Profesores no encontrados');
            return;
        }
        profesores.forEach(profesor => asignatura.profesores.push(profesor._id));
        yield asignatura.save();
        console.log(`Profesores asignados a ${nombreAsignatura}:`, asignatura.profesores);
    });
}
/////////////////////////////////////////////READ//////////////////////////////////////////
function listarProfesores() {
    return __awaiter(this, void 0, void 0, function* () {
        const profesores = yield profesor_1.default.find().populate('asignaturasImparte');
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
        const profesor = yield profesor_1.default.findById(id);
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
        const profesor = yield profesor_1.default.findOne({ nombre });
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
        console.log('CREAR 4 PROFESORES Y 10 ASIGNATURAS');
        yield crearProfesor('Juan', 30);
        yield crearProfesor('Pedro', 40);
        yield crearProfesor('Jordi', 35);
        yield crearProfesor('Bryan', 23);
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
        console.log('ASIGNAR ASIGNATURAS A PROFESORES CON POPULATE:  3 ASIGNATURAS A CADA PROFESOR');
        yield asignarAsignaturasAProfesor('Juan', ['Matematicas', 'Fisica', 'Quimica']);
        yield asignarAsignaturasAProfesor('Pedro', ['Biologia', 'Historia', 'Geografia']);
        yield asignarAsignaturasAProfesor('Jordi', ['Ingles', 'Programacion', 'Lenguaje']);
        yield asignarAsignaturasAProfesor('Bryan', ['Musica', 'Lenguaje', 'Programacion']);
        /////////ASIGNAR PROFESORES A CADA ASIGNATURA CORRESPONDIENTE ////////////////////////
        console.log('ASIGNAR PROFESORES A CADA ASIGNATURA CORRESPONDIENTE');
        yield asignarProfesoresAAsignatura('Matematicas', ['Juan']);
        yield asignarProfesoresAAsignatura('Fisica', ['Juan']);
        yield asignarProfesoresAAsignatura('Quimica', ['Juan']);
        yield asignarProfesoresAAsignatura('Biologia', ['Pedro']);
        yield asignarProfesoresAAsignatura('Historia', ['Pedro']);
        yield asignarProfesoresAAsignatura('Geografia', ['Pedro']);
        yield asignarProfesoresAAsignatura('Ingles', ['Jordi']);
        yield asignarProfesoresAAsignatura('Programacion', ['Jordi']);
        yield asignarProfesoresAAsignatura('Lenguaje', ['Jordi']);
        yield asignarProfesoresAAsignatura('Musica', ['Bryan']);
        yield asignarProfesoresAAsignatura('Lenguaje', ['Bryan']);
        yield asignarProfesoresAAsignatura('Programacion', ['Bryan']);
        /////////LISTAR PROFESORES Y ASIGNATURAS////////////////////////
        console.log('LISTAR PROFESORES Y ASIGNATURAS');
        yield listarProfesores();
        yield listarAsignaturas();
        /////////VER PROFESOR Y ASIGNATURA////////////////////////
        console.log('VER PROFESOR Y ASIGNATURA');
        yield verProfesorPorNombre('Juan');
        yield verAsignaturaPorNombre('Matematicas');
        /////////////////////////////////////////////AGREGATION PIPELINE//////////////////////////////////////////
        console.log('AGREGATION PIPELINE');
        yield obtenerNumeroDeProfesoresPorAsignatura();
        mongoose_1.default.connection.close();
    });
}
//# sourceMappingURL=ejercicio1.js.map