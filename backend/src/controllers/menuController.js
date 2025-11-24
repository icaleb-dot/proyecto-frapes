const menuService = require('../services/menuService');

exports.getMenu = async (req, res) => {
  try {
    const menu = await menuService.obtenerMenuCompleto();
    res.json(menu);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de Servidor');
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const savedItem = await menuService.crearItemMenu(req.body);
    res.status(201).json(savedItem);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error de Servidor');
  }
};