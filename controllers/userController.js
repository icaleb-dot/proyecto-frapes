const passport = require('passport');
const userService = require('../services/userService');

// Registro (igual que antes, pero ahora usa el servicio actualizado)
exports.registrar = async (req, res) => {
  try {
    const usuario = await userService.registrarUsuario(req.body);
    res.status(201).json({ msj: "Usuario registrado", usuarioId: usuario._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login (Nueva función)
exports.login = (req, res, next) => {
  // Passport autentica usando la estrategia 'local' automáticamente
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: 'Email o contraseña incorrectos' });

    // Iniciar sesión en el servidor
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ msj: "Login exitoso", user: { email: user.email, nombre: user.nombre } });
    });
  })(req, res, next);
};