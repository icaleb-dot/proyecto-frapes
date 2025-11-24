const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta: POST /api/users/register
// Descripción: Crear un nuevo cliente
router.post('/register', userController.registrar);

// Ruta: POST /api/users/login
router.post('/login', userController.login);

// Ruta: GET /api/users/:id
// Descripción: Obtener datos de un usuario por su ID
router.get('/:id', userController.obtenerPerfil);

module.exports = router;