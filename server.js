require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/User'); // Importa tu modelo

// Importar Conexiones
const connectDB = require('./config/dbMongo');
const { connectRedis } = require('./config/dbRedis');
const { connectCassandra } = require('./config/dbCassandra');

// Importar Rutas
const menuRoutes = require('./routes/menuRoutes');
// const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Inicializar App
const app = express();

// Configuración de Sesión (necesaria para login persistente)
app.use(session({
  secret: 'frapes_secreto_super_seguro', // Cambia esto por una variable de entorno en producción
  resave: false,
  saveUninitialized: false
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Configurar la estrategia (el plugin lo hace fácil)
passport.use(User.createStrategy());

// Serialización (cómo guardar el usuario en la sesión)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middlewares
app.use(cors()); // Permite peticiones de otros dominios (tu frontend)
app.use(express.json()); // Permite leer JSON en el body


const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();
    await connectCassandra();

    // Definir Rutas de la API
    app.use('/api/menu', menuRoutes);
    // app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/orders', orderRoutes);

    // Iniciar el servidor
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error);
    process.exit(1);
  }
};


startServer();