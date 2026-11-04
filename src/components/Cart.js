import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Cart.css';

const qtyBtn = {
  width: 32,
  height: 32,
  border: '1px solid #ccc',
  background: '#fff',
  cursor: 'pointer',
  fontSize: 18,
  lineHeight: 1,
};

function Cart() {
  const { cartItems: items, removeFromCart: remove, updateQty } = useCart();

  const getQty = (item) => item.qty || 1;
  const total = items.reduce((sum, item) => sum + item.price * getQty(item), 0);
  const totalQty = items.reduce((sum, item) => sum + getQty(item), 0);

  return (
    <section className="cart">
      <div className="cart-hero">
        <h1>Your <span>Cart</span></h1>
        <p>{totalQty} item(s) in your cart</p>
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
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                </div>
                <div className="cart-item-info">
                  <p className="cart-item-category">{item.category}</p>
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-qty" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button style={qtyBtn} onClick={() => updateQty(item.id, getQty(item) - 1)}>−</button>
                  <span>{getQty(item)}</span>
                  <button style={qtyBtn} onClick={() => updateQty(item.id, getQty(item) + 1)}>+</button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * getQty(item)).toFixed(2)}
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
          <Link
            to="/checkout"
            className="checkout-btn"
            style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}
          >
            Proceed to Checkout
          </Link>
          <Link to="/shop" className="continue-link">Continue Shopping</Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;