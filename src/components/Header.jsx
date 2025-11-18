import React from 'react';
import '../styles/Header.css';

export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🛒 Sasta Bazar</h1>
          <p className="tagline">Affordable Shopping, Best Prices
            work in pending
          </p>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <button className="cart-button" onClick={onCartClick}>
          🛍️ Cart ({cartCount})
        </button>
      </div>
    </header>
  );
}
