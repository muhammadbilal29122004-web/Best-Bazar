import React from 'react';
import ProductCard from './ProductCard';
import '../styles/ProductGrid.css';

export default function ProductGrid({
  products,
  onAddToCart,
  isLoading = false
}) {
  const hasProducts = products.length > 0;

  return (
    <section id="products" className="products-section">
      <div className="products-container">
        <h2>Featured Products</h2>
        {isLoading ? (
          <p className="grid-status">Loading products...</p>
        ) : hasProducts ? (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <p className="no-products">No products match your search.</p>
        )}
      </div>
    </section>
  );
}
