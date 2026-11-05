import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Checkout.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [payment, setPayment] = useState('evc');
  const [form, setForm] = useState({ name: '', address: '', phone: '' });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const getQty = (item) => item.qty || 1;
  const total = cartItems.reduce((sum, item) => sum + item.price * getQty(item), 0);
  const totalFixed = Number(total.toFixed(2));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePay = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    if (!form.name || !form.address || !form.phone) {
      alert('Please fill all fields!');
      return;
    }
    setLoading(true);
    try {
      const endpoint = payment === 'evc'
        ? `${API_URL}/api/payment/evc`
        : `${API_URL}/api/payment/waafi`;

      const paymentRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: form.phone,
          amount: totalFixed,
          orderID: 'ORD' + Date.now()
        })
      });

      const paymentData = await paymentRes.json();

      if (paymentData.success) {
        await fetch(`${API_URL}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cartItems.map(item => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              qty: getQty(item),
              image: item.image,
            })),
            totalPrice: totalFixed,
            paymentMethod: payment,
            phone: form.phone,
            address: form.address,
          })
        });
        clearCart();
        setLoading(false);
        setDone(true);
      } else {
        setLoading(false);
        alert(paymentData.message || 'Payment failed. Please try again.');
      }

    } catch (err) {
      setLoading(false);
      alert('Cannot connect to server. Make sure backend is running!');
    }
  };

  return (
    <section className="checkout">
      <div className="checkout-hero">
        <h1>Check<span>out</span></h1>
        <p>Complete your order securely</p>
      </div>

      {done ? (
        <div className="checkout-success">
          <span>🎉</span>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you <strong>{form.name}</strong>! Your payment via <strong>{payment === 'evc' ? 'EVC Plus' : 'Waafi'}</strong> is being processed.</p>
          <p className="success-phone">Confirmation will be sent to <strong>+252{form.phone}</strong></p>
          <a href="/" className="back-home">Back to Home</a>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="checkout-success">
          <span>🛒</span>
          <h2>Your cart is empty</h2>
          <p>Add some products before you check out.</p>
          <Link to="/shop" className="back-home">Go to Shop</Link>
        </div>
      ) : (
        <div className="checkout-container">
          <div className="checkout-form">
            <div className="checkout-section">
              <h2>1. Delivery Info</h2>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Delivery Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. Hodan, Mogadishu"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="checkout-section">
              <h2>2. Payment Method</h2>
              <div className="payment-options">
                <div
                  className={`payment-card ${payment === 'evc' ? 'active' : ''}`}
                  onClick={() => setPayment('evc')}
                >
                  <span>📱</span>
                  <div>
                    <h4>EVC Plus</h4>
                    <p>Hormuud Telecom</p>
                  </div>
                  {payment === 'evc' && <span className="check">✓</span>}
                </div>
                <div
                  className={`payment-card ${payment === 'waafi' ? 'active' : ''}`}
                  onClick={() => setPayment('waafi')}
                >
                  <span>💳</span>
                  <div>
                    <h4>Waafi</h4>
                    <p>Amal Bank</p>
                  </div>
                  {payment === 'waafi' && <span className="check">✓</span>}
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h2>3. Phone Number</h2>
              <div className="form-group">
                <label>
                  {payment === 'evc' ? 'EVC Plus Number (Hormuud)' : 'Waafi Number (Amal)'}
                </label>
                <div className="phone-input">
                  <span className="phone-prefix">+252</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="61 234 5678"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="checkout-summary">
            <h2>Order Summary</h2>
            {cartItems.map(item => (
              <div className="summary-item" key={item.id}>
                <span>{item.name} x{getQty(item)}</span>
                <span>${(item.price * getQty(item)).toFixed(2)}</span>
              </div>
            ))}
            <div className="summary-divider" />
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
            <button className="pay-btn" onClick={handlePay} disabled={loading}>
              {loading
                ? '⏳ Processing payment...'
                : payment === 'evc'
                ? '📱 Pay with EVC Plus'
                : '💳 Pay with Waafi'}
            </button>
            <p className="secure-note">🔒 Secure and encrypted payment</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Checkout;