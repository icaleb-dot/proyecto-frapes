// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../api/orders';

function CartPage() {
  const { cartItems, cartTotal, removeFromCart, clearCart } = useCart();
  const { user } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      alert('Debes iniciar sesión para completar el pedido.');
      navigate('/login');
      return;
    }
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    setError(null);
    setLoading(true);

    // 2. CORRECCIÓN: Construcción del Payload correcto
    const orderPayload = {
      // IMPORTANTE: El backend necesita saber de quién es el pedido
      usuarioId: user._id, 
      
      productos: cartItems.map(item => ({ 
        nombre: item.nombre, 
        precio: item.precio, 
        // Eliminamos 'categoria' porque no existe en el Schema de Order
        tamano: item.tamano,
        detalles: item.detalles || '' // Aseguramos que no sea undefined
      })),
      total: cartTotal
    };

    try {
      await createOrder(orderPayload);
      alert('¡Pedido realizado con éxito! Serás redirigido a tu historial.');
      clearCart();
      navigate('/history'); // Asegúrate de que esta ruta exista en tu App.jsx
    } catch (err) {
      console.error(err);
      setError(err.message || 'Fallo al procesar el pedido. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <h1>🛒 Carrito de Compras</h1>
      
      {cartItems.length === 0 ? (
        <p>
          Tu carrito está vacío. <Link to="/">Ve al menú</Link> para empezar a comprar.
        </p>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #333' }}>
                <th style={{ textAlign: 'left', padding: '10px' }}>Producto</th>
                <th style={{ padding: '10px' }}>Tamaño</th>
                <th style={{ padding: '10px' }}>Precio</th>
                <th style={{ padding: '10px' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>
                    {item.nombre}
                    {/* Opcional: Mostrar detalles si existen */}
                    {item.detalles && <div style={{ fontSize: '0.8em', color: '#666' }}>({item.detalles})</div>}
                  </td>
                  <td style={{ textAlign: 'center', padding: '10px' }}>
                    {/* Capitalizamos el tamaño para que se vea bien */}
                    {item.tamano?.charAt(0).toUpperCase() + item.tamano?.slice(1)}
                  </td>
                  <td style={{ textAlign: 'right', padding: '10px' }}>
                    ${item.precio.toFixed(2)}
                  </td>
                  <td style={{ textAlign: 'center', padding: '10px' }}>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '20px', textAlign: 'right', fontSize: '1.5em' }}>
            <strong>Total: ${cartTotal.toFixed(2)}</strong>
          </div>

          <div style={{ textAlign: 'right' }}>
            <button 
              onClick={handleCheckout} 
              disabled={loading}
              style={{ 
                marginTop: '30px', 
                padding: '15px 25px', 
                backgroundColor: loading ? '#aaa' : '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                fontSize: '1.1em', 
                cursor: loading ? 'not-allowed' : 'pointer' 
              }}
            >
              {loading ? 'Procesando...' : 'Completar Pedido'}
            </button>
          </div>
          
          {error && <p style={{ color: 'red', marginTop: '15px', textAlign: 'right' }}>{error}</p>}
        </>
      )}
    </div>
  );
}

export default CartPage;