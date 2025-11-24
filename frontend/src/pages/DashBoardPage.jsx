// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../api/orders';

function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        setError('Error al cargar la lista de pedidos. Acceso denegado o problema de servidor.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Cargando Dashboard...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>📋 Panel de Pedidos (Cocina/Admin)</h1>
      <p>Total de pedidos activos: <strong>{orders.length}</strong></p>
      
      <div style={{ marginTop: '20px' }}>
        {orders.map(order => (
          <div key={order._id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '5px', backgroundColor: '#fff' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Pedido #{order._id.slice(-6)}</h3>
            
            {/* Protegemos los datos del cliente con ?. */}
            <p>Cliente: <strong>{order.usuarioId?.nombre || 'Cliente Desconocido'}</strong> ({order.usuarioId?.email || 'N/A'})</p>
            
            <p>Fecha: {new Date(order.fechaPedido).toLocaleString()}</p>
            
            {/* 🗑️ ELIMINADO: La línea de 'Estado' que causaba el error ha sido borrada */}
            
            <p>Total: <strong style={{ color: '#007bff', fontSize: '1.1em' }}>${order.total.toFixed(2)}</strong></p>
            
            <h4 style={{ marginTop: '10px', color: '#555' }}>Detalle de Productos:</h4>
            <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
              {order.productos.map((prod, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>
                  {/* CORRECCIÓN: Usamos 'tamano' (sin ñ) para que coincida con la BD */}
                  {prod.nombre} (<strong>{prod.tamano}</strong>) - ${prod.precio.toFixed(2)}
                  
                  {prod.detalles && (
                    <span style={{ fontStyle: 'italic', color: '#666' }}> (Notas: {prod.detalles})</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;