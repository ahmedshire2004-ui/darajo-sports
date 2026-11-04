import React from 'react';
import { motion } from 'framer-motion';
import './Banner.css';

function Banner() {
  return (
    <section className="banner">
      <motion.div
        className="banner-left"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <span className="banner-tag">Limited Time Offer</span>
        <h2>Get <span>30% OFF</span> Your First Order!</h2>
        <p>Use code <strong>DARAJO30</strong> at checkout</p>
        <a href="/shop" className="banner-btn">Shop Now</a>
      </motion.div>

      <motion.div
        className="banner-right"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="banner-cards">
          <div className="banner-card">
            <span>🚚</span>
            <h4>Free Delivery</h4>
            <p>On all orders</p>
          </div>
          <div className="banner-card">
            <span>↩️</span>
            <h4>Easy Returns</h4>
            <p>Within 7 days</p>
          </div>
          <div className="banner-card">
            <span>🔒</span>
            <h4>Secure Payment</h4>
            <p>EVC & Waafi</p>
          </div>
          <div className="banner-card">
            <span>⭐</span>
            <h4>Top Quality</h4>
            <p>Premium products</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Banner;