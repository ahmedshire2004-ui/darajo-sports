import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import { allProducts } from './shopData';
import './Shop.css';

const categories = ['All', 'Jerseys', 'Shorts', 'Tracksuits', 'Shoes', 'Equipment', 'Hoodies'];

function Shop() {
  const [active, setActive] = useState('All');
  const { addToCart } = useCart();

  const filtered = active === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === active);

  return (
    <section className="shop">
      <div className="shop-header">
        <h1>Our Products</h1>
        <p>Find the best sports gear for your game</p>
      </div>

      <div className="shop-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${active === cat ? 'active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="shop-grid">
        {filtered.map(product => (
          <div className="product-card" key={product.id}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
            </Link>
            <div style={{ padding: '0 1.2rem 1.2rem' }}>
              <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Shop;