import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/$/, '');

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const url = isLogin
        ? `${API_URL}/api/auth/login`
        : `${API_URL}/api/auth/register`;

      const body = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong. Try again.');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setLoading(false);
      navigate('/home');
    } catch (err) {
      setError('Cannot reach the server. It may be waking up, wait a minute and try again.');
      setLoading(false);
    }
  };

  return (
    <section className="login">
      <div className="login-box">
        <div className="login-logo">
          <img src="/logo.png" alt="Darajo Sports" />
        </div>

        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="login-sub">{isLogin ? 'Login to your account' : 'Join Darajo Sports today'}</p>

        {error && <div className="login-error">{error}</div>}

        {!isLogin && (
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button className="login-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>

        <p className="login-switch">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? ' Register' : ' Login'}
          </span>
        </p>
      </div>
    </section>
  );
}

export default Login;