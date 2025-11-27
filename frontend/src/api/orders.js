// src/api/orders.js
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/menu`;

/**
 * Crea un nuevo pedido a partir del carrito (Checkout).
 * @param {object} orderData - { usuarioId, productos: [{ nombre, precio, tamaño, detalles }], total }
 * @returns {object} - El pedido recién creado.
 */
export const createOrder = async (orderData) => {
  try {
    // El backend guarda esto en MongoDB
    const response = await axios.post(API_BASE_URL, orderData);
    return response.data;
  } catch (error) {
    // El backend podría devolver 400 si faltan campos requeridos
    throw new Error(error.response?.data?.error || 'Error al crear el pedido.');
  }
};

/**
 * Obtiene el historial de pedidos de un cliente específico.
 * @param {string} usuarioId - El ID del usuario.
 * @returns {array} - Lista de pedidos del usuario, ordenados por fecha.
 */
export const getOrdersByUser = async (usuarioId) => {
  try {
    // Ruta: GET /api/orders/user/:usuarioId
    const response = await axios.get(`${API_BASE_URL}/user/${usuarioId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el historial de pedidos.');
  }
};

/**
 * Obtiene todos los pedidos (para uso de Admin/Empleado).
 * @returns {array} - Lista de todos los pedidos con información del usuario populada.
 */
export const getAllOrders = async () => {
  try {
    // Ruta: GET /api/orders
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener todos los pedidos.');
  }
};