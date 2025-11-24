const analyticsService = require('../services/analyticsService');

exports.getReporteVentas = async (req, res) => {
  try {
    const reporte = await analyticsService.obtenerReporteGeneral();
    res.json(reporte);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVentasProducto = async (req, res) => {
  try {
    //elnombre viene en la url /api/analytics/ventas/Frape%20Oreo
    // Usamos decodeURIComponent para quitar los %20 y tener espacios
    const nombre = decodeURIComponent(req.params.nombre);
    const datos = await analyticsService.obtenerVentasPorSabor(nombre);
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};