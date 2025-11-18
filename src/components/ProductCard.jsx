import React from 'react';
import '../styles/ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  const discountedPrice = (product.price * (1 - product.discount / 100)).toFixed(2);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.discount > 0 && (
          <span className="discount-badge">{product.discount}% OFF</span>
        )}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="description">{product.description}</p>
        <div className="price-section">
          {product.discount > 0 ? (
            <>
              <span className="original-price">₹{product.price}</span>
              <span className="discounted-price">₹{discountedPrice}</span>
            </>
          ) : (
            <span className="price">₹{product.price}</span>
          )}
        </div>
        <div className="rating">
          ⭐ {product.rating} ({product.reviews} reviews)
        </div>
        <button 
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
