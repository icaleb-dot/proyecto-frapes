// src/api/menu.js
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/menu`;

/**
 * Obtiene el menú completo de la cafetería.
 * @returns {array} - Lista de ítems del menú (MenuItem objects).
 */
export const getMenu = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el menú.');
  }
};

/**
 * Crea un nuevo ítem en el menú (para uso de Admin/Empleado).
 * @param {object} itemData - { name, price, category, description }
 * @returns {object} - El ítem del menú recién creado.
 */
export const createMenuItem = async (itemData) => {
  try {
    // Esta llamada provoca la invalidación del caché de Redis en el backend
    const response = await axios.post(API_BASE_URL, itemData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el ítem del menú.');
  }
};