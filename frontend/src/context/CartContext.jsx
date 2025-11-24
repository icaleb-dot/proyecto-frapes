// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // El estado guarda la lista de productos seleccionados
  const [cartItems, setCartItems] = useState([]);

  // Añadir un ítem al carrito
  const addToCart = (product) => {
    // Aseguramos que el producto tenga un ID único para poder eliminarlo después
    setCartItems(prevItems => [...prevItems, { ...product, id: Date.now() + Math.random() }]); 
  };

  // Quitar un ítem del carrito (usando el ID temporal)
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Vaciar el carrito después del checkout
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcular el total usando useMemo para re-calcular solo cuando cartItems cambie
  const cartTotal = useMemo(() => {
    // El 'precio' es el campo necesario del objeto producto
    return cartItems.reduce((total, item) => total + item.precio, 0); 
  }, [cartItems]);
  
  // Contar cuántos ítems hay (puede ser diferente al cartItems.length si se agrupan, pero aquí no agrupamos)
  const cartCount = cartItems.length;


  const contextValue = { 
    cartItems, 
    cartTotal, 
    cartCount,
    addToCart, 
    removeFromCart, 
    clearCart, 
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};