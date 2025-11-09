import React from 'react';
import '../../styles/CartItems.css';

export default function CartItem({ item, onRemove, onUpdateQty }) {
  const increment = () => onUpdateQty(item.qty + 1);
  const decrement = () => { if (item.qty > 0) onUpdateQty(item.qty - 1); };

  return (
    <div className="cart-item">
      <span className="item-name">{item.product.name}</span>
      <div className="qty-controls">
        <button className="qty-btn" onClick={decrement} aria-label="Decrease">−</button>
        <input
          className="qty-input"
          type="number"
          min={0}
          value={item.qty}
          onChange={e => {
            const val = Number(e.target.value);
            if (val >= 0) onUpdateQty(val);
          }}
        />
        <button className="qty-btn" onClick={increment} aria-label="Increase">+</button>
      </div>
      <span className="item-total">${(item.product.price * item.qty).toFixed(2)}</span>
      <button className="remove-btn" onClick={onRemove}>Remove</button>
    </div>
  );
}
