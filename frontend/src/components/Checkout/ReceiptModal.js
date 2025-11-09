import React from 'react';
import '../../styles/ReceiptModal.css';

export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;
  return (
    <div className="receipt-modal-overlay">
      <div className="receipt-modal-content">
        <h2>Receipt</h2>
        <p>
          <strong>Total:</strong> ${receipt.total.toFixed(2)}
        </p>
        <p>
          <strong>Timestamp:</strong> {new Date(receipt.timestamp).toLocaleString()}
        </p>
        <button className="receipt-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
