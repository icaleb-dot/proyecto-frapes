// backend/createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const crearAdmin = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/frapes_db';
    
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB');

    const emailAdmin = 'admin@frapes.com';
    const passwordAdmin = '1158245';

    const existe = await User.findOne({ email: emailAdmin });
    if (existe) {
      console.log('El usuario ya existe. No se hizo nada.');
      process.exit();
    }

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