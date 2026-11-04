import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>DARAJO SPORTS</h2>
          <p>Premium sports clothing & equipment for every athlete.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-links">
          <h4>Categories</h4>
          <a href="/shop">Jerseys</a>
          <a href="/shop">Shorts</a>
          <a href="/shop">Tracksuits</a>
          <a href="/shop">Shoes</a>
        </div>

        <div className="footer-newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe for latest deals</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Your email..." />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Darajo Sports. All rights reserved.</p>
        <div className="footer-socials">
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;