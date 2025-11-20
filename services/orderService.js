const Order = require('../models/Order');
// const cassandraClient = require('../config/dbCassandra'); // Para el futuro

const crearPedido = async (datosPedido) => {
  // 1. Guardar en MongoDB (Persistencia principal)
  const nuevoPedido = new Order(datosPedido);
  const pedidoGuardado = await nuevoPedido.save();

  // TODO: Aquí agregaremos la lógica para Cassandra más adelante
  // Ej: await guardarAnaliticaDeVenta(pedidoGuardado);
  
  // TODO: Aquí podríamos invalidar caché de Redis si estuviéramos cacheando listas de pedidos

  return pedidoGuardado;
};

const obtenerPedidosPorUsuario = async (usuarioId) => {
  return await Order.find({ usuarioId }).sort({ fechaPedido: -1 });
};

const obtenerTodosLosPedidos = async () => {
  // Populate trae los datos del usuario en lugar de solo el ID
  return await Order.find().populate('usuarioId', 'nombre email').sort({ fechaPedido: -1 });
};

module.exports = {
  crearPedido,
  obtenerPedidosPorUsuario,
  obtenerTodosLosPedidos
};