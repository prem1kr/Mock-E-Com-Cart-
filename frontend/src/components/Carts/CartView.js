import React from 'react';
import '../../styles/CartView.css';
import { useCart } from '../../context/CartContext.js';
import CartItem from './CartItem.js';

export default function CartView({ onCheckout }) {
  const { cartItems, removeFromCart, updateQty } = useCart();

  if (!cartItems.length) return <p>Your cart is empty.</p>;

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return (
    <div className="cart-view">
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <CartItem
          key={item._id}
          item={item}
          onRemove={() => removeFromCart(item._id)}
          onUpdateQty={qty => updateQty(item._id, qty)}
        />
      ))}
      <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
      <button className="checkout-btn" onClick={onCheckout}>Proceed to Checkout</button>
    </div>
  );
}
