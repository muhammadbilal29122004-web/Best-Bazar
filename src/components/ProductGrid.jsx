import React from 'react';
import ProductCard from './ProductCard';
import '../styles/ProductGrid.css';

export default function ProductGrid({ products, onAddToCart }) {
  return (
    <section id="products" className="products-section">
      <div className="products-container">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
