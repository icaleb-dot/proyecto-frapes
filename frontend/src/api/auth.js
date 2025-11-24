// src/api/auth.js
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

/**
 * Registra un nuevo usuario.
 * @param {object} userData - { email, nombre, password, rol }
 * @returns {object} - { msj, usuarioId }
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    // Manejo de errores específicos del registro
    throw new Error(error.response?.data?.error || 'Error al registrar el usuario.');
  }
};

/**
 * Inicia sesión de un usuario.
 * @param {object} credentials - { email, password }
 * @returns {object} - { email, nombre, rol, _id } (Necesitarás el rol y _id para el contexto)
 */
export const loginUser = async (credentials) => {
  try {
    // Al usar Passport, axios debe enviar las cookies de sesión. 
    // `withCredentials: true` es crucial si tu backend usa sesiones basadas en cookies.
    const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
      withCredentials: true 
    });
    
    // NOTA: Tu backend actualmente devuelve { msj, user: { email, nombre } }.
    // Para que el frontend funcione correctamente (AuthContext, ProtectedRoutes),
    // necesitarás que el backend modifique la ruta /api/users/login para devolver también el 'rol' y el '_id' del usuario.
    
    // Asumimos que el backend fue modificado para devolver el rol y el _id:
    return response.data.user; 
  } catch (error) {
    // El backend devuelve 401 si las credenciales son incorrectas
    throw new Error(error.response?.data?.error || 'Email o contraseña incorrectos.');
  }
};

/**
 * Cierra la sesión del usuario.
 * NOTA: Esta función requiere un endpoint /api/users/logout en el backend.
 */
export const logoutUser = async () => {
  try {
    // Es importante enviar withCredentials para que sepa QUÉ sesión borrar
    await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
    return true;
  } catch (error) {
    console.error("Error al cerrar sesión", error);
    return false;
  }
};