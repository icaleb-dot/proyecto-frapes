const cassandra = require('cassandra-driver');

// --- Función de utilidad para 'dormir' ---
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// ------------------------------------------

const client = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA_CONTACT_POINT],
  localDataCenter: process.env.CASSANDRA_DATACENTER,
  // Opciones para que el driver sea más paciente al conectar
  socketOptions: {
    connectTimeout: 10000,
    readTimeout: 30000,
  },
});

const connectCassandra = async (retries = 5) => {
  while (retries > 0) {
    try {
      console.log('Intentando conectar a Cassandra (reintentos restantes: ' + retries + ')...');
      await client.connect();
      console.log('Cassandra Conectado (Local Docker).');

      
      await client.execute(`
        CREATE KEYSPACE IF NOT EXISTS ${process.env.CASSANDRA_KEYSPACE}
        WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 1 }
      `);
      
      
      await client.execute(`USE ${process.env.CASSANDRA_KEYSPACE}`);
      
      await client.execute(`
        CREATE TABLE IF NOT EXISTS product_views (
          item_id uuid,
          view_time timeuuid,
          user_id uuid,
          PRIMARY KEY (item_id, view_time)
        ) WITH CLUSTERING ORDER BY (view_time DESC);
      `);

      return;

    } catch (err) {
      retries--;
      console.error(`Error en Cassandra, reintentos restantes: ${retries}`, err.message);
      
      if (retries === 0) {
        console.error("No se pudo conectar a Cassandra después de varios intentos.");
        throw err; // Lanzamos el error final si nos quedamos sin reintentos
      }
      
      console.log('Esperando 10 segundos antes de reintentar...');
      await sleep(10000);
    }
  }
};

module.exports = { connectCassandra, cassandraClient: client };