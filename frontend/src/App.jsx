// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componentes de Layout
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Componente de Utilidad
import ProtectedRoute from './components/ProtectedRoute';

// Páginas de la aplicación
// Auth
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

// Cliente
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrderHistoryPage from './pages/OrderHistoryPage'; 

// Admin/Empleado
import DashBoardPage from './pages/DashBoardPage';
// Necesitas crear esta página para gestionar POST /api/menu
import AdminMenuPage from './pages/AdminMenuPage'; 


function App() {
  return (
    // Contenedor principal para asegurar que el footer esté abajo (minHeight: 100vh)
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <Header /> {/* 👈 Cabecera global */}

      <main style={{ flexGrow: 1, padding: '20px 0' }}> {/* El contenido principal ocupa el espacio restante */}
        <Routes>
          {/* ==================================== */}
          {/* 1. RUTAS PÚBLICAS Y DE AUTENTICACIÓN */}
          {/* ==================================== */}
          <Route path="/" element={<MenuPage />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* ==================================== */}
          {/* 2. RUTAS PROTEGIDAS PARA CUALQUIER USUARIO AUTENTICADO */}
          {/* ==================================== */}
          {/* El usuario debe estar logueado para ver el carrito y su historial */}
          <Route element={<ProtectedRoute allowedRoles={['cliente', 'admin', 'empleado']} />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/history" element={<OrderHistoryPage />} />
          </Route>

          {/* ==================================== */}
          {/* 3. RUTAS PROTEGIDAS SOLO PARA ADMIN/EMPLEADO */}
          {/* ==================================== */}
          {/* Solo usuarios con rol 'admin' o 'empleado' pueden acceder a la gestión */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'empleado']} />}>
            <Route path="/dashboard" element={<DashBoardPage />} />
            <Route path="/admin/menu" element={<AdminMenuPage />} /> {/* Para crear/editar ítems */}
          </Route>

          {/* ==================================== */}
          {/* 4. RUTA 404 (Not Found) */}
          {/* ==================================== */}
          <Route path="*" element={<h1 style={{ textAlign: 'center' }}>404 | Página No Encontrada</h1>} />
        </Routes>
      </main>
      
      <Footer /> {/* 👈 Pie de página global */}

    </div>
  );
}

export default App;