import Usuario from '../models/usuario';

// Función para validar coordenadas geográficas
const validarCoordenadas = (lat: number, lng: number): boolean => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

// Función para validar distancia
const validarDistancia = (distancia: number): boolean => {
  return distancia > 0 && distancia <= 100000; // Limitar distancia a 100 km (100,000 metros)
};

// Guardar o actualizar la ubicación del usuario
export const actualizarUbicacionUsuario = async (usuarioId: string, lat: number, lng: number) => {
  try {
    // Validar las coordenadas
    if (!validarCoordenadas(lat, lng)) {
      throw new Error('Las coordenadas son inválidas. Latitud debe estar entre -90 y 90, y longitud entre -180 y 180.');
    }

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) throw new Error('Usuario no encontrado.');

    usuario.location = {
      type: 'Point',
      coordinates: [lng, lat],
    };

    await usuario.save();
    return usuario;
  } catch (error: any) {
    throw new Error(`Error al actualizar la ubicación: ${error.message}`);
  }
};

// Obtener usuarios cercanos a una ubicación
export const obtenerUsuariosCercanos = async (lat: number, lng: number, distancia: number) => {
  try {
    // Validar distancia
    if (!validarDistancia(distancia)) {
      throw new Error('La distancia debe ser un valor positivo y no mayor a 100 km.');
    }

    const usuarios = await Usuario.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: distancia, // Distancia en metros
        },
      },
    }).select('nombre username location');

    return usuarios;
  } catch (error: any) {
    throw new Error(`Error al buscar usuarios cercanos: ${error.message}`);
  }
};

// Obtener todas las ubicaciones de los usuarios
export const obtenerTodasLasUbicaciones = async () => {
  try {
    return await Usuario.find(
      { location: { $exists: true } },
      { location: 1, nombre: 1, username: 1 }
    );
  } catch (error: any) {
    throw new Error(`Error al obtener las ubicaciones: ${error.message}`);
  }
};

// Listar usuarios desde una ubicación específica (de cerca a lejos)
export const listarUsuariosPorProximidad = async (lat: number, lng: number) => {
  try {
    // Validar coordenadas antes de hacer la consulta
    if (!validarCoordenadas(lat, lng)) {
      throw new Error('Las coordenadas son inválidas. Latitud debe estar entre -90 y 90, y longitud entre -180 y 180.');
    }

    const usuarios = await Usuario.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lng, lat] },
          distanceField: 'distancia', // Campo que contendrá la distancia calculada
          spherical: true, // Usa esfericidad para cálculos más precisos
        },
      },
    ]).exec();

    return usuarios.map(usuario => ({
      id: usuario._id,
      nombre: usuario.nombre,
      username: usuario.username,
      distancia: usuario.distancia, // Distancia en metros
      location: usuario.location,
    }));
  } catch (error: any) {
    throw new Error(`Error al listar usuarios por proximidad: ${error.message}`);
  }
};
