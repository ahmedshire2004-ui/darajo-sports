import React, { useState } from 'react';
import './Checkout.css';

function Checkout() {
  const [payment, setPayment] = useState('evc');
  const [form, setForm] = useState({ name: '', address: '', phone: '' });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePay = async () => {
    if (!form.name || !form.address || !form.phone) {
      alert('Please fill all fields!');
      return;
    }
    setLoading(true);
    try {
      const endpoint = payment === 'evc'
        ? 'http://localhost:5000/api/payment/evc'
        : 'http://localhost:5000/api/payment/waafi';

      const paymentRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: form.phone,
          amount: 139.97,
          orderID: 'ORD' + Date.now()
        })
      });

      const paymentData = await paymentRes.json(); // ✅ Always parse JSON first

      if (paymentData.success) {
        await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [],
            totalPrice: 139.97,
            paymentMethod: payment,
            phone: form.phone,
            address: form.address,
          })
        });
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
            <div className="summary-item">
              <span>👕 Pro Football Jersey x1</span>
              <span>$29.99</span>
            </div>
            <div className="summary-item">
              <span>🩳 Running Shorts x1</span>
              <span>$19.99</span>
            </div>
            <div className="summary-item">
              <span>👟 Sport Sneakers x1</span>
              <span>$89.99</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row">
              <span>Subtotal</span>
              <span>$139.97</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>$139.97</span>
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