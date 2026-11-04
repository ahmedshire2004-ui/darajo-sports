import React from 'react';
import { motion } from 'framer-motion';
import './Categories.css';

const categories = [
  { id: 1, name: 'Jerseys', icon: '👕' },
  { id: 2, name: 'Shorts', icon: '🩳' },
  { id: 3, name: 'Tracksuits', icon: '🧥' },
  { id: 4, name: 'Shoes', icon: '👟' },
  { id: 5, name: 'Equipment', icon: '🥊' },
  { id: 6, name: 'Hoodies', icon: '🧤' },
];

function Categories() {
  return (
    <section className="categories">
      <motion.h2
        className="categories-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Shop By Category
      </motion.h2>
      <div className="categories-grid">
        {categories.map((cat, index) => (
          <motion.div
            className="category-card"
            key={cat.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, backgroundColor: '#000' }}
          >
            <span className="category-icon">{cat.icon}</span>
            <p className="category-name">{cat.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Categories;