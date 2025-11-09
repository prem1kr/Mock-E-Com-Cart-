import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const prods = await api.getProducts();
      const cart = await api.getCart();
      setProducts(prods);
      setCartItems(cart.items || []);
    }
    fetchData();
  }, []);

  async function addToCart(productId, qty = 1) {
    try {
      await api.addToCart(productId, qty);
      const updatedCart = await api.getCart();
      setCartItems(updatedCart.items || []);
    } catch (error) {
      console.error('Add to cart failed:', error);
    }
  }

  async function removeFromCart(itemId) {
    try {
      await api.removeFromCart(itemId);
      const updatedCart = await api.getCart();
      setCartItems(updatedCart.items || []);
    } catch (error) {
      console.error('Remove from cart failed:', error);
    }
  }

  async function updateQty(itemId, qty) {
    try {
      await api.removeFromCart(itemId);
      if (qty > 0) {
        const productId = cartItems.find(item => item._id === itemId)?.product._id;
        if (productId) await api.addToCart(productId, qty);
      }
      const updatedCart = await api.getCart();
      setCartItems(updatedCart.items || []);
    } catch (error) {
      console.error('Update quantity failed:', error);
    }
  }

  return (
    <CartContext.Provider value={{ cartItems, products, addToCart, removeFromCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
