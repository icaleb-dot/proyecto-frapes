// backend/createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User'); // Ajusta la ruta si es necesario

const crearAdmin = async () => {
  try {
    // 1. Conectar a la BD (usando la variable de entorno local o directa)
    // Nota: Si corres esto desde TU pc (no docker), usa localhost.
    // Si lo corres dentro de docker, usa mongo.
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/frapes_db';
    
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB');

    const emailAdmin = 'admin@frapes.com';
    const passwordAdmin = '1158245';

    // 2. Verificar si ya existe
    const existe = await User.findOne({ email: emailAdmin });
    if (existe) {
      console.log('El usuario ya existe. No se hizo nada.');
      process.exit();
    }

    // 3. Crear el Admin
    // Como estamos usando el Modelo directamente (y no el servicio),
    // podemos poner el rol que queramos.
    const nuevoAdmin = new User({
      email: emailAdmin,
      nombre: 'chichiweba',
      rol: 'admin'
    });

    await User.register(nuevoAdmin, passwordAdmin);
    console.log(`Administrador creado: ${emailAdmin}`);
    
    process.exit();

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

crearAdmin();