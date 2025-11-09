import React from 'react';
import { CartProvider, useCart } from './context/CartContext.js';
import ProductGrid from './components/Products/ProductGrid.js';
import CartView from './components/Carts/CartView.js';
import CheckoutForm from './components/Checkout/CheckoutForm.js';
import './App.css'; 

function CartButton({ onClick }) {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <button className="cart-button" onClick={onClick}>
      Cart
      {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
    </button>
  );
}

export default function App() {
  const [view, setView] = React.useState('products');
  const [receipt, setReceipt] = React.useState(null);

  function handleCheckoutSuccess(receiptData) {
    setReceipt(receiptData);
    setView('receipt');
  }

  function handleReset() {
    setReceipt(null);
    setView('products');
  }

  return (
    <CartProvider>
      <div className="app-container">
        <header>
          <h1>Vibe Commerce</h1>
          <nav>
            <button onClick={() => setView('products')}>Products</button>
            <CartButton onClick={() => setView('cart')} />
            <button onClick={() => setView('checkout')}>Checkout</button>
          </nav>
        </header>

        <main>
          {view === 'products' && <ProductGrid />}
          {view === 'cart' && <CartView onCheckout={() => setView('checkout')} />}
          {view === 'checkout' && <CheckoutForm onSuccess={handleCheckoutSuccess} />}
          {view === 'receipt' && receipt && (
            <div className="receipt-modal">
              <h2>Receipt</h2>
              <p>Total: ${receipt.total.toFixed(2)}</p>
              <p>Timestamp: {new Date(receipt.timestamp).toLocaleString()}</p>
              <button onClick={handleReset}>Shop Again</button>
            </div>
          )}
        </main>
      </div>
    </CartProvider>
  );
}
