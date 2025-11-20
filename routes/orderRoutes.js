const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Ruta: POST /api/orders
// Descripción: Crear un nuevo pedido
router.post('/', orderController.crearNuevoPedido);

// Ruta: GET /api/orders
// Descripción: Listar TODOS los pedidos (para el admin/cocina)
router.get('/', orderController.listarTodos);

// Ruta: GET /api/orders/user/:usuarioId
// Descripción: Ver historial de pedidos de un cliente específico
router.get('/user/:usuarioId', orderController.listarPedidosUsuario);

module.exports = router;