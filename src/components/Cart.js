import React, { useState } from 'react';
import './Cart.css';

const initialItems = [
  { id: 1, name: 'Pro Football Jersey', price: 29.99, category: 'Jerseys', emoji: '👕', qty: 1 },
  { id: 2, name: 'Running Shorts', price: 19.99, category: 'Shorts', emoji: '🩳', qty: 1 },
  { id: 3, name: 'Sport Sneakers', price: 89.99, category: 'Shoes', emoji: '👟', qty: 1 },
];

function Cart() {
  const [items, setItems] = useState(initialItems);

  const increase = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  };

  const decrease = (id) => {
    setItems(items.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
  };

  const remove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

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
              <a href="/shop">Continue Shopping</a>
            </div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <span>{item.emoji}</span>
                </div>
                <div className="cart-item-info">
                  <p className="cart-item-category">{item.category}</p>
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-qty">
                  <button onClick={() => decrease(item.id)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increase(item.id)}>+</button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.qty).toFixed(2)}
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
          <a href="/checkout" className="checkout-btn" style={{textDecoration:'none', display:'block', textAlign:'center'}}>Proceed to Checkout</a>
          <a href="/shop" className="continue-link">Continue Shopping</a>
        </div>
      </div>
    </section>
  );
}

export default Cart;