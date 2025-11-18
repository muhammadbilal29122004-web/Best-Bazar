import React from 'react';
import '../styles/Cart.css';

export default function Cart({ items, isOpen, onClose }) {
  const total = items.reduce((sum, item) => {
    const itemPrice = item.product.price * (1 - item.product.discount / 100);
    return sum + (itemPrice * item.quantity);
  }, 0).toFixed(2);

  const savings = items.reduce((sum, item) => {
    return sum + (item.product.price * item.product.discount / 100 * item.quantity);
  }, 0).toFixed(2);

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <div className={`cart-modal ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <p className="empty-message">Add some products to get started!</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item, index) => {
                const itemPrice = item.product.price * (1 - item.product.discount / 100);
                return (
                  <div key={index} className="cart-item">
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="item-details">
                      <h4>{item.product.name}</h4>
                      <p>₹{itemPrice.toFixed(2)} × {item.quantity}</p>
                    </div>
                    <div className="item-total">
                      ₹{(itemPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{(parseFloat(total) + parseFloat(savings)).toFixed(2)}</span>
              </div>
              <div className="summary-row savings">
                <span>Savings:</span>
                <span className="savings-text">-₹{savings}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            </div>
            
            <button className="checkout-btn">Proceed to Checkout</button>
          </>
        )}
      </div>
    </>
  );
}
