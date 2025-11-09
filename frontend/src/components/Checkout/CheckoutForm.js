import React, { useState } from 'react';
import '../../styles/CheckoutForm.css';
import { useCart } from '../../context/CartContext';
import * as api from '../../services/api';

export default function CheckoutForm({ onSuccess }) {
  const { cartItems } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const receipt = await api.checkout(cartItems, name, email);
      onSuccess(receipt);
    } catch (err) {
      setError('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Checkout</h2>
      <div className="form-group">
        <label>Name:</label>
        <input
          required
          value={name}
          onChange={e => setName(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-input"
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button className="form-btn" disabled={loading} type="submit">
        {loading ? 'Processing...' : 'Submit Order'}
      </button>
    </form>
  );
}
