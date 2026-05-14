import { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import * as cartService from '../api/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Retrieve user from localStorage
  const getUserId = () => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser).id : null;
    } catch (err) {
      return null;
    }
  };

  // Sync with backend
  const refreshCart = useCallback(async (silent = false) => {
    const customerId = getUserId();
    if (!customerId) {
      setCartItems([]);
      return;
    }

    if (!silent) setLoading(true);

    try {
      const cart = await cartService.getCartByCustomerId(customerId);
      setCartItems(cart?.items ?? []);
    } catch (err) {
      console.error("FLEET_SYNC_ERROR:", err);
      setCartItems([]);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // Logic: Add Item
  const addToCart = async (product, quantity = 1) => {
    const customerId = getUserId();
    if (!customerId) return alert("LOGIN REQUIRED FOR FLEET ASSIGNMENT");

    try {
      const updatedCart = await cartService.addToCart(customerId, product.id, quantity);
      setCartItems(updatedCart?.items ?? []);
    } catch (err) {
      console.error("ADD_ERROR:", err);
    }
  };

  // Logic: Update Quantity (Handles Delta +/- 1 from UI)
  const updateQuantity = async (productId, delta) => {
    const customerId = getUserId();
    const item = cartItems.find(i => i.product.id === productId);
    
    if (!customerId || !item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) return;

    try {
      const updatedCart = await cartService.updateCartQuantity(customerId, productId, newQuantity);
      setCartItems(updatedCart?.items ?? []);
    } catch (err) {
      console.error("QUANTITY_UPDATE_ERROR:", err);
    }
  };

  // Logic: Remove Item
  const removeFromCart = async (productId) => {
    const customerId = getUserId();
    if (!customerId) return;

    const backup = [...cartItems];
    try {
      // Optimistic update
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
      const updatedCart = await cartService.removeFromCart(customerId, productId);
      setCartItems(updatedCart?.items ?? []);
    } catch (err) {
      setCartItems(backup);
      console.error("REMOVE_ERROR:", err);
    }
  };

  // Computed totals for the UI
  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cartItems]);

  const itemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{
      cartItems, loading, cartTotal, itemCount,
      addToCart, updateQuantity, removeFromCart, refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);