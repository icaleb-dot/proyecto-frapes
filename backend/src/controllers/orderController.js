const orderService = require('../services/orderService');

exports.crearNuevoPedido = async (req, res) => {
  try {
    // Nota: Normalmente el usuarioId vendría del token de autenticación (JWT)
    // Por ahora lo esperamos en el body para probar rápido
    const pedido = await orderService.crearPedido(req.body);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listarPedidosUsuario = async (req, res) => {
  try {
    const pedidos = await orderService.obtenerPedidosPorUsuario(req.params.usuarioId);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarTodos = async (req, res) => {
  try {
    const pedidos = await orderService.obtenerTodosLosPedidos();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};