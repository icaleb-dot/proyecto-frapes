// src/pages/OrderHistoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrdersByUser } from '../api/orders';
import OrderItem from '../components/OrderItem'; // Usamos el componente OrderItem

function OrderHistoryPage() {
  const { user } = useAuth(); // Obtenemos el ID del usuario
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si el usuario no está disponible (aunque ProtectedRoute lo debería manejar), salimos
    if (!user?._id) {
      setLoading(false);
      setError('Error: No se encontró el ID del usuario para cargar el historial.');
      return;
    }

    const fetchOrders = async () => {
      try {
        // Llama a GET /api/orders/user/:usuarioId
        const data = await getOrdersByUser(user._id); 
        setOrders(data);
      } catch (err) {
        console.error("Error al cargar historial de pedidos:", err);
        setError('Error al cargar el historial de pedidos. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?._id]); // Dependencia del ID del usuario

  if (loading) {
    return <div style={styles.centerText}>Cargando historial de pedidos...</div>;
  }

  if (error) {
    return <div style={{ ...styles.centerText, color: 'red' }}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1>🕒 Mi Historial de Pedidos</h1>
      {orders.length === 0 ? (
        <p style={styles.noOrders}>Aún no tienes pedidos registrados.</p>
      ) : (
        <div style={styles.orderList}>
          {orders.map(order => (
            // Reutilizamos el componente OrderItem para mostrar cada pedido
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
  },
  centerText: {
    textAlign: 'center',
    marginTop: '50px',
  },
  noOrders: {
    marginTop: '20px',
    fontSize: '1.2em',
    textAlign: 'center',
    color: '#6c757d',
  },
  orderList: {
    marginTop: '30px',
  }
};

export default OrderHistoryPage;