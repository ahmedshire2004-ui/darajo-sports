import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Cart.css';

function Cart() {
  const { cartItems: items, removeFromCart: remove, updateQuantity } = useCart();

  // If your context uses different function names, adjust accordingly (e.g., increase/decrease)
  const total = items.reduce((sum, item) => sum + item.price * (item.qty || item.quantity || 1), 0);

  return (
    <section className="cart">
      <div className="cart-hero">
        <h1>Your <span>Cart</span></h1>
        <p>{items.length} item(s) in your cart</p>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span>🛒</span>
              <h3>Your cart is empty</h3>
              <Link to="/shop">Continue Shopping</Link>
            </div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <span>{item.emoji || '📦'}</span>
                </div>
                <div className="cart-item-info">
                  <p className="cart-item-category">{item.category}</p>
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-qty">
                  <span>Qty: {item.qty || item.quantity}</span>
                </div>
                <div className="cart-item-total">
                  ${(item.price * (item.qty || item.quantity || 1)).toFixed(2)}
                </div>
                <button className="remove-btn" onClick={() => remove(item.id)}>✕</button>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="checkout-btn" style={{textDecoration:'none', display:'block', textAlign:'center'}}>Proceed to Checkout</Link>
          <Link to="/shop" className="continue-link">Continue Shopping</Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;