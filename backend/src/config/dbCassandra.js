require('dotenv').config();
const cassandra = require('cassandra-driver');

const cassandraClient = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA_CONTACT_POINT || 'cassandra'],
  localDataCenter: process.env.CASSANDRA_DATACENTER || 'datacenter1',
  // keyspace: process.env.CASSANDRA_KEYSPACE,
  socketOptions: {
    connectTimeout: 10000,
    readTimeout: 30000,
  },
});

const connectCassandra = async () => {
  try {
    await cassandraClient.connect();
    console.log('Cassandra Conectado satisfactoriamente.');

    // 2. Crear Keyspace (Si no existe)
    // Esto automatiza lo que antes hacías en terminal
    await cassandraClient.execute(`
      CREATE KEYSPACE IF NOT EXISTS ${process.env.CASSANDRA_KEYSPACE}
      WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 1 }
    `);
    console.log(` Keyspace '${process.env.CASSANDRA_KEYSPACE}' verificado.`);

    // 3. Usar el Keyspace
    await cassandraClient.execute(`USE ${process.env.CASSANDRA_KEYSPACE}`);

    // 4. Crear Tablas
    //tabla para las analíticas de ventas (del servicio de pedidos)
    const queryTablaVentas = `
      CREATE TABLE IF NOT EXISTS ventas_por_producto (
        nombre_producto text,
        fecha_venta timestamp,
        pedido_id text,
        precio float,
        tamano text,
        PRIMARY KEY ((nombre_producto), fecha_venta)
      ) WITH CLUSTERING ORDER BY (fecha_venta DESC);
    `;
    
    await cassandraClient.execute(queryTablaVentas);
    console.log('tabla "ventas_por_producto" verificada.');

    // (Opcional) Si querías tu otra tabla de vistas de producto, la puedes dejar aquí:

  } catch (error) {
    console.error("Error fatal conectando a Cassandra:", error);
    // Como Docker ya esperó el healthcheck, si falla aquí es un error grave de config
    process.exit(1); 
  }
};

// Exportamos 'client' tal cual para usarlo en los servicios
module.exports = { connectCassandra, cassandraClient };