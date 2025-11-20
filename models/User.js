const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose'); // <--- IMPORTAR

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  // ¡YA NO NECESITAS EL CAMPO PASSWORD AQUÍ!
  // El plugin se encarga de crear 'hash' y 'salt' internamente.
  
  rol: {
    type: String,
    enum: ['cliente', 'admin', 'empleado'],
    default: 'cliente'
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

// Conectar el plugin al esquema
// 'usernameField' le dice que usaremos el email para loguearnos en vez del 'username'
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);