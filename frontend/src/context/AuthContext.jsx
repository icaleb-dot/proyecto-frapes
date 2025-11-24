// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { loginUser, logoutUser } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // 1. INICIALIZACIÓN (Lectura del LocalStorage)
  // Esta lógica se ejecuta una sola vez al cargar la página.
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      
      // Protección contra "undefined" como texto y nulos
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        return JSON.parse(storedUser);
      }
      return null;
    } catch (error) {
      console.error("Error recuperando sesión:", error);
      localStorage.removeItem('user'); 
      return null;
    }
  });

  // 2. LOGIN
  const login = async (email, password) => {
    try {
      // CORRECCIÓN IMPORTANTE:
      // loginUser ya devuelve el objeto usuario, no necesitamos desestructurar { user: userData }
      const userData = await loginUser({ email, password }); 
      
      // Verificación de seguridad extra
      if (userData && userData._id) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); 
        return userData;
      } else {
        throw new Error("La respuesta del servidor no contenía datos de usuario válidos.");
      }

    } catch (error) {
      throw error;
    }
  };

  // 3. LOGOUT
  const logout = async () => {
    try {
      await logoutUser(); 
    } catch (error) {
      console.error("Error al hacer logout en servidor (limpiando localmente igual):", error);
    }
    
    // Limpiamos todo localmente pase lo que pase en el servidor
    setUser(null);
    localStorage.removeItem('user');
  };

  // NOTA: Eliminé el useEffect. 
  // No es necesario porque la lectura inicial ya la hace el useState(() => ...) de arriba.
  // Tener ambos es redundante y puede causar parpadeos.

  const contextValue = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};