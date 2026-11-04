import React from 'react';
import './About.css';

function About() {
  return (
    <section className="about">
      <div className="about-hero">
        <h1>About <span>Darajo Sports</span></h1>
        <p>We are passionate about sports and dedicated to providing the best gear for every athlete.</p>
      </div>

      <div className="about-mission">
        <div className="mission-card">
          <span>🏆</span>
          <h3>Our Mission</h3>
          <p>To provide premium quality sports clothing and equipment that empowers every athlete to perform at their best.</p>
        </div>
        <div className="mission-card">
          <span>💪</span>
          <h3>Our Vision</h3>
          <p>To become the leading sports brand in East Africa, known for quality, style and performance.</p>
        </div>
        <div className="mission-card">
          <span>⭐</span>
          <h3>Our Values</h3>
          <p>Quality, integrity, and passion for sport drive everything we do at Darajo Sports.</p>
        </div>
      </div>

      <div className="about-story">
        <div className="story-text">
          <h2>Our Story</h2>
          <p>Darajo Sports was founded with one simple goal — to make premium sports gear accessible to every athlete. We believe that the right equipment can make a difference in your performance.</p>
          <p>From football jerseys to running shoes, we carry everything you need to dominate your sport. Our products are carefully selected for quality, durability and style.</p>
        </div>
        <div className="story-image">
          <span>🏟️</span>
        </div>
      </div>
    </section>
  );
}

export default About;