// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Para el enrutamiento
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // Contexto de autenticación
import { CartProvider } from './context/CartContext.jsx';   // Contexto del carrito

// Opcional: Importar estilos base (si usas un archivo CSS)
// import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envuelve toda la app para habilitar la navegación */}
      <AuthProvider> {/* Provee el estado del usuario/sesión */}
        <CartProvider> {/* Provee el estado del carrito */}
          <App /> {/* Aquí se define el layout y las rutas */}
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);