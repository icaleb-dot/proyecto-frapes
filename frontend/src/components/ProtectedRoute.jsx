// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente para proteger rutas basadas en autenticación y roles.
 * @param {string[]} allowedRoles - Array de roles permitidos (ej: ['admin', 'empleado']).
 */
const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();
  
  // 1. Verificar Autenticación
  if (!isAuthenticated) {
    // Si no está logueado, redirigir a la página de Login
    return <Navigate to="/login" replace />; 
  }

  // 2. Verificar Rol (si se especificaron roles)
  // Utilizamos 'user.rol' que debe venir del AuthContext
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
    // Si el usuario está logueado, pero su rol no está permitido (ej: cliente en ruta de admin)
    // Redirigir a la página principal o a una página de 'Acceso Denegado'
    return <Navigate to="/" replace />; 
  }

  // 3. Permiso Concedido
  // Si está autenticado y pasa el chequeo de rol, renderiza la ruta anidada
  return <Outlet />;
};

export default ProtectedRoute;

// NOTA: Recuerda usar este componente en tu App.jsx para definir las rutas:
/*
  <Route element={<ProtectedRoute allowedRoles={['admin', 'empleado']} />}>
    <Route path="/dashboard" element={<DashboardPage />} />
  </Route>
*/