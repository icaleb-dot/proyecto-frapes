const User = require('../models/User');

const registrarUsuario = async (datosUsuario) => {
  const { email, nombre, password, rol } = datosUsuario;
  
  // Creamos el objeto usuario SIN la contraseña
  const nuevoUsuario = new User({ email, nombre, rol });

  //encarga de hashear 'password' y guardarlo seguro
  return await User.register(nuevoUsuario, password);
};

const obtenerUsuarioPorEmail = async (email) => {
  return await User.findOne({ email });
};

const obtenerUsuarioPorId = async (id) => {
  return await User.findById(id);
};

module.exports = {
  registrarUsuario,
  obtenerUsuarioPorEmail,
  obtenerUsuarioPorId
};