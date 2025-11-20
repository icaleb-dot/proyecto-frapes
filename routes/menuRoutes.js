const express = require('express');
const router = express.Router();
const { getMenu, createMenuItem } = require('../controllers/menuController');

// GET /api/menu  -> Obtiene todo el menú
router.get('/', getMenu);

// POST /api/menu -> Crea un nuevo ítem (ej. para un admin)
router.post('/', createMenuItem);

module.exports = router;