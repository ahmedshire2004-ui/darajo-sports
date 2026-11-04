import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../CartContext';
import './Products.css';

const products = [
  { id: 1, name: 'Pro Football Jersey', price: 29.99, category: 'Jerseys', image: 'https://images.unsplash.com/photo-1562155955-1cb2d73488d7?w=400&fit=crop' },
  { id: 2, name: 'Running Shorts', price: 19.99, category: 'Shorts', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&fit=crop' },
  { id: 3, name: 'Training Tracksuit', price: 59.99, category: 'Tracksuits', image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400&fit=crop' },
  { id: 4, name: 'Sport Sneakers', price: 89.99, category: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&fit=crop' },
  { id: 5, name: 'Boxing Gloves', price: 34.99, category: 'Equipment', image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?w=400&fit=crop' },
  { id: 6, name: 'Sport Hoodie', price: 44.99, category: 'Hoodies', image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=400&fit=crop' },
  { id: 7, name: 'Basketball Jersey', price: 32.99, category: 'Jerseys', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&fit=crop' },
  { id: 8, name: 'Gym Shorts', price: 22.99, category: 'Shorts', image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&fit=crop' },
];

function Products() {
  const { addToCart } = useCart();

  return (
    <section className="products">
      <motion.h2
        className="products-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Featured Products
      </motion.h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <motion.div
            className="product-card"
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
          >
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <p className="product-category">{product.category}</p>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Products;