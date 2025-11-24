const { cassandraClient } = require('../config/dbCassandra');
const menuService = require('./menuService');

 
const obtenerVentasPorSabor = async (nombreProducto) => {
  const query = `
    SELECT count(*) as total 
    FROM frapes_analytics.ventas_por_producto 
    WHERE nombre_producto = ?
  `;

  try {
    const resultado = await cassandraClient.execute(query, [nombreProducto], { prepare: true });
    //cssandra devuelve un array de rows. Tomamos el primero.
    const fila = resultado.first();
    
    // convertirmos el objeto de long a string
    const totalVentas = fila ? fila.get('total').toString() : 0;
    
    return {
      producto: nombreProducto,
      total_vendidos: parseInt(totalVentas)
    };
  } catch (error) {
    console.error(`Error consultando analítica de ${nombreProducto}:`, error);
    return { producto: nombreProducto, total_vendidos: 0 };
  }
};

// REPORTE DE PRODUCTOS
// Esta función es "Políglota": Lee el catálogo de Mongo/Redis y las métricas de Cassandra
const obtenerReporteGeneral = async () => {
  const menuCompleto = await menuService.obtenerMenuCompleto();

  // extraer solo los nombres únicos
  // Usamos un 'Set' que elimina duplicados automáticamente
  const nombresUnicos = [...new Set(menuCompleto.map(item => item.nombre))];

  // 3. Consultamos Cassandra usando solo la lista de nombres únicos
  const reporte = await Promise.all(
    nombresUnicos.map(async (nombre) => {
      return await obtenerVentasPorSabor(nombre);
    })
  );

  return reporte.sort((a, b) => b.total_vendidos - a.total_vendidos);
};

module.exports = {
  obtenerVentasPorSabor,
  obtenerReporteGeneral
};