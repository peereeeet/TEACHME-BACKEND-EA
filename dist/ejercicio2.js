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
mongoose_1.default.connect('mongodb://localhost:27017/ejercicio1')
    .then(() => {
    console.log('Conectado a MongoDB para el ejercicio 2...');
    main();
})
    .catch(err => console.error('No se pudo conectar a MongoDB...', err));
////////////////////////////DELETE TODOS LOS PROFESORES Y ASIGNATURAS ////////////////////////////////
function eliminarTodosLosProfesores() {
    return __awaiter(this, void 0, void 0, function* () {
        const resultado = yield profesor_1.default.deleteMany({});
        console.log('Todos los profesores eliminados:', resultado);
    });
}
function eliminarTodoasLasAsignaturas() {
    return __awaiter(this, void 0, void 0, function* () {
        const resultado = yield asignatura_1.default.deleteMany({});
        console.log('Todas las asignaturas eliminadas:', resultado);
    });
}
///////////////////////////////////////////MAIN//////////////////////////////////////////
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield eliminarTodoasLasAsignaturas();
        yield eliminarTodosLosProfesores();
        console.log('ADIOOOOOS MUNDO CRUEL');
        mongoose_1.default.connection.close();
    });
}
//# sourceMappingURL=ejercicio2.js.map