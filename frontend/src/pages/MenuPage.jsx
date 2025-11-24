// src/pages/MenuPage.jsx
import React, { useState, useEffect } from 'react';
import { getMenu } from '../api/menu';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

// Opcional: Si quieres usar la tarjeta bonita que ya arreglamos, podrías importarla:
// import MenuItemCard from '../components/MenuItemCard';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart, cartCount } = useCart(); 

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu(); 
        setMenuItems(data);
      } catch (err) {
        setError('Error al cargar el menú. Intenta refrescar la página.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Función para agregar ítem (Corregida al español)
  const handleAddToCart = (item) => {
    const product = {
      // 1. CORRECCIÓN: Mapear a los nombres del esquema de Order.js
      nombre: item.nombre,       // Antes: item.name
      precio: item.precio,       // Antes: item.price
      tamano: item.tamano || 'mediano', // Leemos el tamaño real de la BD
      detalles: '',
      id: Date.now() // ID temporal para React
    };
    
    addToCart(product);
    alert(`${item.nombre} añadido al carrito.`);
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Cargando menú...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Menú de Sabores Helados 🍧</h1>
      <Link to="/cart" style={{ float: 'right', textDecoration: 'none', padding: '10px', backgroundColor: '#ffd700', borderRadius: '5px' }}>
        🛒 Carrito ({cartCount})
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '20px' }}>
        {menuItems.map(item => (
          <div key={item._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            
            {/* 2. CORRECCIÓN: item.nombre */}
            <h3>{item.nombre}</h3>
            
            {/* 3. CORRECCIÓN: item.categoria + Protección (?) */}
            {/* Esto arregla el error "Cannot read properties of undefined (reading 'toUpperCase')" */}
            <p>Categoría: **{item.categoria?.toUpperCase() || 'SIN CATEGORÍA'}**</p>
            
            {/* 4. CORRECCIÓN: item.descripcion */}
            <p>{item.descripcion}</p>
            
            {/* Muestra el tamaño también, ya que es importante */}
            <p>Tamaño: {item.tamano}</p>

            {/* 5. CORRECCIÓN: item.precio */}
            <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
              ${(item.precio || 0).toFixed(2)}
            </p>
            
            <button 
              onClick={() => handleAddToCart(item)}
              style={{ padding: '8px 15px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Añadir a Orden
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;