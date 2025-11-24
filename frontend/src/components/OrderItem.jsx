// src/components/OrderItem.jsx
import React from 'react';

function OrderItem({ order }) {
  return (
    <div style={styles.orderCard}>
      <div style={styles.header}>
        {/* Solo mostramos el ID del pedido */}
        <h3 style={styles.orderId}>Pedido #{order._id.slice(-6)}</h3>
        
        {/* Eliminamos el Badge (Etiqueta) de estado */}
      </div>
      
      <p style={styles.info}>
        <strong>Fecha:</strong> {new Date(order.fechaPedido).toLocaleString()}
      </p>
      
      <p style={styles.total}>
        <strong>Total:</strong> ${order.total.toFixed(2)}
      </p>
      
      <h4 style={styles.productsTitle}>Productos ({order.productos.length})</h4>
      <ul style={styles.productsList}>
        {order.productos.map((prod, index) => (
          <li key={index} style={styles.productItem}>
            {prod.nombre} (<strong>{prod.tamano}</strong>) - ${prod.precio.toFixed(2)}
            
            {prod.detalles && (
              <span style={styles.details}> (Detalles: {prod.detalles})</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  orderCard: {
    border: '1px solid #e0e0e0',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    backgroundColor: '#fff'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px dashed #ccc',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  orderId: {
    margin: 0,
    color: '#333',
    fontSize: '1.1em'
  },
  info: {
    margin: '5px 0',
    fontSize: '0.9em',
    color: '#555'
  },
  total: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginTop: '15px',
    color: '#007bff',
  },
  productsTitle: {
    marginTop: '15px',
    marginBottom: '5px',
    fontSize: '1em',
    color: '#555',
  },
  productsList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  productItem: {
    backgroundColor: '#f8f8f8',
    padding: '8px 10px',
    borderRadius: '4px',
    marginBottom: '5px',
    fontSize: '0.9em',
    borderLeft: '3px solid #17a2b8' // Un detallito visual para que se vea lindo
  },
  details: {
    fontStyle: 'italic',
    color: '#777',
    display: 'block',
    fontSize: '0.85em',
    marginTop: '2px'
  }
};

export default OrderItem;