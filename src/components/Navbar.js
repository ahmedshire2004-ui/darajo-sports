import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Navbar.css';

function Navbar() {
  const [lang, setLang] = useState('EN');
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo-link">
          <img src="/logo.png" alt="Darajo Sports" className="logo-img" />
          <span className="logo-text">DARAJO SPORTS</span>
        </Link>
      </div>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="navbar-right">
        <button className="lang-btn" onClick={() => setLang(lang === 'EN' ? 'SO' : 'EN')}>
          {lang}
        </button>
        <Link to="/cart" className="cart-icon">
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>
    </nav>
  );
}

export default Navbar;