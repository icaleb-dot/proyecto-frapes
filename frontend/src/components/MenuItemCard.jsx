// src/components/MenuItemCard.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

function MenuItemCard({ item }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = {
      nombre: item.nombre, 
      precio: item.precio,
      tamano: item.tamano,
      detalles: '',
      id: Date.now() + Math.random()
    };
    
    addToCart(product);
    alert(`${item.nombre} añadido al carrito.`);
  };

  // Función para mostrar la categoría más bonita (ej: 'fresas_c_crema' -> 'FRESAS C CREMA')
  const formatCategory = (cat) => {
    return cat ? cat.replace(/_/g, ' ').toUpperCase() : 'SIN CATEGORÍA';
  };

  return (
    <div style={styles.card}>
      {/* NOMBRE */}
      <h3 style={styles.name}>{item.nombre}</h3>
      
      {/* CATEGORÍA */}
      {/* Usamos item.categoria (del backend) y protegemos con ? */}
      <p style={styles.category}>
        Categoría: {formatCategory(item.categoria)}
      </p>

      {/* DESCRIPCIÓN */}
      {item.descripcion && (
        <p style={styles.description}>{item.descripcion}</p>
      )}

      {/* TAMAÑO (Nuevo: Tu esquema lo requiere) */}
      <p style={styles.size}>
        Tamaño: <strong>{item.tamano}</strong>
      </p>

      {/* PRECIO */}
      {/* Protegemos con || 0 por seguridad antes de toFixed */}
      <p style={styles.price}>${(item.precio || 0).toFixed(2)}</p>
      
      <button 
        onClick={handleAddToCart}
        style={styles.button}
      >
        Añadir al Carrito
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  name: {
    margin: '0 0 5px 0',
    color: '#333',
    fontSize: '1.2em'
  },
  category: {
    fontSize: '0.8em',
    color: '#888',
    marginBottom: '10px',
    fontWeight: 'bold'
  },
  description: {
    fontSize: '0.95em',
    color: '#555',
    marginBottom: '10px',
    fontStyle: 'italic'
  },
  size: {
    fontSize: '0.9em',
    color: '#444',
    marginBottom: '5px',
    textTransform: 'capitalize'
  },
  price: {
    fontSize: '1.4em',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '15px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#17a2b8',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  }
};

export default MenuItemCard;