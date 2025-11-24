const Order = require('../models/Order');
const { cassandraClient } = require('../config/dbCassandra');


const registrarAnaliticaCassandra = async (pedido) => {
  const query = `
    INSERT INTO frapes_analytics.ventas_por_producto 
    (nombre_producto, fecha_venta, pedido_id, precio, tamano) 
    VALUES (?, ?, ?, ?, ?)
  `;

  // Recorremos cada producto del pedido para registrarlo individualmente
  pedido.productos.forEach(prod => {
    const params = [
      prod.nombre,
      pedido.fechaPedido,
      pedido._id.toString(), // Convertimos ObjectId de Mongo a String
      prod.precio,
      prod.tamano
    ];

    cassandraClient.execute(query, params, { prepare: true })
      .then(() => console.log(`Analítica registrada en Cassandra: ${prod.nombre}`))
      .catch(err => console.error('Error guardando en Cassandra:', err));
  });
};

const crearPedido = async (datosPedido) => {
  // 1. Guardar en MongoDB (Persistencia principal)
  const nuevoPedido = new Order(datosPedido);
  const pedidoGuardado = await nuevoPedido.save();

  registrarAnaliticaCassandra(pedidoGuardado);
  
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