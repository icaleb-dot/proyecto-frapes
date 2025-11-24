// src/components/Layout/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirigir al login después de cerrar sesión
  };

  const isAdminOrEmployee = isAuthenticated && (user.rol === 'admin' || user.rol === 'empleado');

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>
          🍦 Frappe App
        </Link>
      </div>

      <nav style={styles.nav}>
        {/* Enlaces siempre visibles */}
        <Link to="/" style={styles.link}>Menú</Link>
        <Link to="/cart" style={styles.link}>
          🛒 Carrito ({cartCount})
        </Link>

        {/* Enlaces condicionales para el usuario autenticado */}
        {isAuthenticated ? (
          <>
            {/* Vistas específicas por rol */}
            {isAdminOrEmployee && (
              <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            )}
            
            {/* Vistas para todos los usuarios autenticados */}
            <Link to="/history" style={styles.link}>Historial</Link>
            
            <span style={styles.welcome}>Hola, {user.nombre}</span>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          /* Enlaces para el usuario no autenticado */
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Registro</Link>
          </>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#333',
    padding: '15px 40px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '5px 10px',
    transition: 'color 0.2s',
  },
  welcome: {
    fontSize: '0.9em',
    color: '#ddd',
  },
  logoutButton: {
    background: 'none',
    color: '#ff6b6b',
    border: '1px solid #ff6b6b',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
    transition: 'background-color 0.2s, color 0.2s',
  }
};

export default Header;