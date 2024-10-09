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
const asignatura_1 = __importDefault(require("./models/asignatura")); // Asegúrate de importar el modelo Asignatura
mongoose_1.default.connect('mongodb://localhost:27017/ejercicio1')
    .then(() => {
    console.log('Conectado a MongoDB para el ejercicio 3...');
})
    .catch(err => console.error('No se pudo conectar a MongoDB...', err));
////////////////////////////////ACTUALIZAR ASIGNATURAS DE UN PROFESOR POR NOMBRE//////////////////////////////////////////
function actualizarAsignaturasProfesorPorNombre(nombreProfesor, nuevasAsignaturas) {
    return __awaiter(this, void 0, void 0, function* () {
        const profesor = yield profesor_1.default.findOne({ nombre: nombreProfesor });
        if (!profesor) {
            console.error('Profesor no encontrado');
            return;
        }
        const asignaturas = yield asignatura_1.default.find({ nombre: { $in: nuevasAsignaturas } });
        if (asignaturas.length === 0) {
            console.error('Asignaturas no encontradas');
            return;
        }
        yield profesor_1.default.findByIdAndUpdate(profesor._id, {
            asignaturasImparte: asignaturas.map(asignatura => asignatura._id)
        });
        console.log(`Asignaturas actualizadas para ${nombreProfesor}`);
    });
}
////////////////////////////////////////////MAIN//////////////////////////////////////////
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const nombreProfesor = 'Bryan';
        const nuevasAsignaturas = ['Lengua'];
        console.log('Actualizando asignaturas de Juan...');
        yield actualizarAsignaturasProfesorPorNombre(nombreProfesor, nuevasAsignaturas);
        const profesor = yield profesor_1.default.findOne({ nombre: nombreProfesor }).populate('asignaturasImparte');
        console.log('Asignaturas de Juan:', profesor === null || profesor === void 0 ? void 0 : profesor.asignaturasImparte);
        console.log('Adiós mundo cruel!');
        mongoose_1.default.connection.close(); // Ahora cierra la conexión después de completar las operaciones
    });
}
main().catch(err => console.error(err));
//# sourceMappingURL=ejercicio3.js.map