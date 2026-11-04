import React from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const reviews = [
  { id: 1, name: 'Ahmed Hassan', city: 'Mogadishu', rating: 5, text: 'Amazing quality! The football jersey I ordered fits perfectly and the delivery was fast. Will definitely order again from Darajo Sports!', avatar: '👨🏾' },
  { id: 2, name: 'Fatima Omar', city: 'Bosaso', rating: 5, text: 'Best sports shop in Somalia! I bought a tracksuit and boxing gloves. The quality is top notch and payment via EVC was so easy!', avatar: '👩🏾' },
  { id: 3, name: 'Mohamed Ali', city: 'Kismayo', rating: 5, text: 'I was surprised by the quality of the shoes. They look exactly like the pictures. Fast delivery to Kismayo too. Highly recommended!', avatar: '👨🏾' },
  { id: 4, name: 'Hodan Abdi', city: 'Hargeisa', rating: 4, text: 'Great products and very good customer service. The hoodie I bought is very comfortable. Will order more items soon!', avatar: '👩🏾' },
];

function Testimonials() {
  return (
    <section className="testimonials">
      <motion.h2
        className="testimonials-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        What Our Customers Say
      </motion.h2>
      <motion.p
        className="testimonials-sub"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Real reviews from real athletes across Somalia
      </motion.p>
      <div className="testimonials-grid">
        {reviews.map((review, index) => (
          <motion.div
            className="review-card"
            key={review.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, borderBottom: '3px solid #2ecc40' }}
          >
            <div className="review-stars">{'⭐'.repeat(review.rating)}</div>
            <p className="review-text">"{review.text}"</p>
            <div className="review-author">
              <span className="review-avatar">{review.avatar}</span>
              <div>
                <h4>{review.name}</h4>
                <p>{review.city}, Somalia</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;