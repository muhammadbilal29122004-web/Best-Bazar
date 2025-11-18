import React, { useEffect } from 'react';
import '../styles/Toast.css';

export default function Toast({ message, productName, quantity, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast show">
      <div className="toast-content">
        <div className="toast-icon">✓</div>
        <div className="toast-text">
          <p className="toast-title">{productName}</p>
          <p className="toast-message">{message} (Qty: {quantity})</p>
        </div>
        <button className="toast-close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
