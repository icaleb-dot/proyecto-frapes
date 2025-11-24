const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// GET /api/analytics/dashboard -> Reporte de todos
router.get('/dashboard', analyticsController.getReporteVentas);

// GET /api/analytics/producto/:nombre -> Reporte de uno específico
router.get('/producto/:nombre', analyticsController.getVentasProducto);

module.exports = router;