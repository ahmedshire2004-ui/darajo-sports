import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Shop.css';

const allProducts = [
  { id: 1, name: 'Pro Football Jersey', price: 29.99, category: 'Jerseys', image: 'https://images.unsplash.com/photo-1562155955-1cb2d73488d7?w=400&fit=crop' },
  { id: 2, name: 'Running Shorts', price: 19.99, category: 'Shorts', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&fit=crop' },
  { id: 3, name: 'Training Tracksuit', price: 59.99, category: 'Tracksuits', image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400&fit=crop' },
  { id: 4, name: 'Sport Sneakers', price: 89.99, category: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&fit=crop' },
  { id: 5, name: 'Boxing Gloves', price: 34.99, category: 'Equipment', image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?w=400&fit=crop' },
  { id: 6, name: 'Sport Hoodie', price: 44.99, category: 'Hoodies', image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=400&fit=crop' },
  { id: 7, name: 'Basketball Jersey', price: 32.99, category: 'Jerseys', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&fit=crop' },
  { id: 8, name: 'Gym Shorts', price: 22.99, category: 'Shorts', image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&fit=crop' },
  { id: 9, name: 'Football Boots', price: 79.99, category: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&fit=crop' },
  { id: 10, name: 'Swim Goggles', price: 14.99, category: 'Equipment', image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?w=400&fit=crop' },
  { id: 11, name: 'Zip Tracksuit', price: 64.99, category: 'Tracksuits', image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400&fit=crop' },
  { id: 12, name: 'Pullover Hoodie', price: 49.99, category: 'Hoodies', image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=400&fit=crop' },
];

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