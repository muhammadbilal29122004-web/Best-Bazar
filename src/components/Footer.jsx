import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Sasta Bazar</h4>
          <p>Your one-stop shop for affordable products at unbeatable prices.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
            <li><a href="#shipping">Shipping Info</a></li>
            <li><a href="#returns">Returns</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: muhammadbilal29122004@gmail.com</p>
          <p>Phone: +92 311-3254286</p>
          <p>Hours: 24/7 Customer Support</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Sasta Bazar. All rights reserved.</p>
      </div>
    </footer>
  );
}
