import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Navbar.css';

function Navbar() {
  const [lang, setLang] = useState('EN');
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home" className="navbar-logo-link">
          <img src="/logo.png" alt="Darajo Sports" className="logo-img" />
          <span className="logo-text">DARAJO SPORTS</span>
        </Link>
      </div>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/home">Home</Link>
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
        {user ? (
          <div className="user-menu">
            <span className="user-name">👤 {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/" className="login-link">Login</Link>
        )}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>
    </nav>
  );
}

export default Navbar;