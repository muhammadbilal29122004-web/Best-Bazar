import React from 'react';
import '../styles/Header.css';

export default function Header({ cartCount, cartItems = [], onCartClick, searchTerm, onSearchChange }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🛒 Sasta Bazar</h1>
          <p className="tagline">Affordable Shopping, Best Prices</p>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <div className="search-bar">
            <span className="search-icon" role="img" aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder="Search products..."
              aria-label="Search products"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>
          {/* Cart Thumbnails */}
          {cartItems.length > 0 && (
            <div className="cart-thumbnails" style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '8px' }}>
              {cartItems.slice(0, 4).map((item, idx) => (
                <img
                  key={item.product.id}
                  src={item.product.image}
                  alt={item.product.name}
                  title={item.product.name}
                  style={{ width: 28, height: 28, objectFit: 'cover', borderRadius: 4, border: '1px solid #eee', background: '#fafafa' }}
                />
              ))}
              {cartItems.length > 4 && (
                <span style={{ fontSize: '0.9rem', color: '#764ba2', marginLeft: 2 }}>+{cartItems.length - 4}</span>
              )}
            </div>
          )}
          <button className="cart-button" onClick={onCartClick}>
            🛍️ Cart ({cartCount})
          </button>
        </div>
      </div>
    </header>
  );
}
