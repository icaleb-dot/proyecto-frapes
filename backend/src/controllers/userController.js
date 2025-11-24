const passport = require('passport');
const userService = require('../services/userService');


exports.registrar = async (req, res) => {
  try {
    const usuario = await userService.registrarUsuario(req.body);
    res.status(201).json({ msj: "Usuario registrado", usuarioId: usuario._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: 'Email o contraseña incorrectos' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ msj: "Login exitoso", user: { _id: user._id, email: user.email, nombre: user.nombre, rol: user.rol || 'cliente' } });
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ msj: "Sesión cerrada exitosamente" });
  });
};

exports.obtenerPerfil = async (req, res) => {
  try {
    const usuario = await userService.obtenerUsuarioPorId(req.params.id);
    if (!usuario) return res.status(404).json({ msj: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};