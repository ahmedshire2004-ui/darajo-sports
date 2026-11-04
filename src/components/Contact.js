import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="contact">
      <div className="contact-hero">
        <h1>Contact <span>Us</span></h1>
        <p>We'd love to hear from you. Send us a message!</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <div className="info-item">
            <span>📍</span>
            <div>
              <h4>Address</h4>
              <p>Mogadishu, Somalia</p>
            </div>
          </div>
          <div className="info-item">
            <span>📞</span>
            <div>
              <h4>Phone</h4>
              <p>+252 61 234 5678</p>
            </div>
          </div>
          <div className="info-item">
            <span>📧</span>
            <div>
              <h4>Email</h4>
              <p>info@darajosports.com</p>
            </div>
          </div>
          <div className="info-item">
            <span>🕐</span>
            <div>
              <h4>Working Hours</h4>
              <p>Sat - Thu: 8AM - 8PM</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          {sent ? (
            <div className="success-msg">
              <span>✅</span>
              <h3>Message Sent!</h3>
              <p>We'll get back to you soon.</p>
            </div>
          ) : (
            <>
              <h2>Send a Message</h2>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="6"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <button className="send-btn" onClick={handleSubmit}>Send Message</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;