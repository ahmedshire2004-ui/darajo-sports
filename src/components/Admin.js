import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import './Admin.css';

const COLORS = ['#2ecc40', '#000', '#888', '#444', '#2ecc40'];

function Admin() {
  const [tab, setTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', image: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOrders();
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) { setOrders([]); }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) { setUsers([]); }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) { setProducts([]); }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert('Please fill all fields!');
      return;
    }
    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...newProduct, price: Number(newProduct.price) })
    });
    if (res.ok) {
      alert('Product added!');
      setNewProduct({ name: '', price: '', category: '', image: '' });
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;

  const revenueData = [
    { name: 'Mon', revenue: 120 },
    { name: 'Tue', revenue: 240 },
    { name: 'Wed', revenue: 180 },
    { name: 'Thu', revenue: 320 },
    { name: 'Fri', revenue: 280 },
    { name: 'Sat', revenue: 450 },
    { name: 'Sun', revenue: 380 },
  ];

  const categoryData = [
    { name: 'Jerseys', value: 35 },
    { name: 'Shoes', value: 25 },
    { name: 'Tracksuits', value: 20 },
    { name: 'Shorts', value: 12 },
    { name: 'Others', value: 8 },
  ];

  const ordersData = [
    { name: 'Week 1', orders: 12 },
    { name: 'Week 2', orders: 19 },
    { name: 'Week 3', orders: 15 },
    { name: 'Week 4', orders: 28 },
  ];

  return (
    <section className="admin">
      <div className="admin-header">
        <div className="admin-header-left">
          <h1>Admin <span>Dashboard</span></h1>
          <p>Welcome back, Admin! 👋</p>
        </div>
        <div className="admin-header-right">
          <span className="admin-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      <div className="admin-tabs">
        <button className={tab === 'dashboard' ? 'active' : ''} onClick={() => setTab('dashboard')}>📊 Dashboard</button>
        <button className={tab === 'orders' ? 'active' : ''} onClick={() => setTab('orders')}>📦 Orders</button>
        <button className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}>🛍️ Products</button>
        <button className={tab === 'users' ? 'active' : ''} onClick={() => setTab('users')}>👥 Users</button>
      </div>

      {tab === 'dashboard' && (
        <div className="admin-section">
          <div className="stats-grid">
            <div className="stat-card green">
              <span className="stat-icon">💰</span>
              <div>
                <h3>${totalRevenue.toFixed(2)}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
            <div className="stat-card dark">
              <span className="stat-icon">📦</span>
              <div>
                <h3>{orders.length}</h3>
                <p>Total Orders</p>
              </div>
            </div>
            <div className="stat-card green">
              <span className="stat-icon">👥</span>
              <div>
                <h3>{users.length}</h3>
                <p>Total Users</p>
              </div>
            </div>
            <div className="stat-card dark">
              <span className="stat-icon">🛍️</span>
              <div>
                <h3>{products.length}</h3>
                <p>Total Products</p>
              </div>
            </div>
            <div className="stat-card green">
              <span className="stat-icon">⏳</span>
              <div>
                <h3>{pendingOrders}</h3>
                <p>Pending Orders</p>
              </div>
            </div>
            <div className="stat-card dark">
              <span className="stat-icon">✅</span>
              <div>
                <h3>{completedOrders}</h3>
                <p>Completed Orders</p>
              </div>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-card">
              <h3>Weekly Revenue ($)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#2ecc40" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>Monthly Orders</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={ordersData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#000" strokeWidth={3} dot={{ fill: '#2ecc40', strokeWidth: 2, r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>Sales by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card recent-orders">
              <h3>Recent Orders</h3>
              {orders.length === 0 ? (
                <p className="empty">No orders yet</p>
              ) : (
                orders.slice(0, 5).map(order => (
                  <div className="recent-order-item" key={order._id}>
                    <div>
                      <p className="order-id">#{order._id.slice(-6)}</p>
                      <p className="order-phone">{order.phone}</p>
                    </div>
                    <div>
                      <p className="order-amount">${order.totalPrice}</p>
                      <span className={`status ${order.status}`}>{order.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="admin-section">
          <h2>All Orders ({orders.length})</h2>
          {orders.length === 0 ? <p className="empty">No orders yet</p> : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Payment</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>#{order._id.slice(-6)}</td>
                    <td>{order.phone}</td>
                    <td>{order.address}</td>
                    <td>{order.paymentMethod}</td>
                    <td>${order.totalPrice}</td>
                    <td><span className={`status ${order.status}`}>{order.status}</span></td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {tab === 'products' && (
        <div className="admin-section">
          <h2>Add New Product</h2>
          <div className="add-product-form">
            <input placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
            <input placeholder="Price (e.g. 29.99)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
            <input placeholder="Category" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
            <input placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
            <button onClick={handleAddProduct}>+ Add Product</button>
          </div>

          <h2>All Products ({products.length})</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td><button className="delete-btn" onClick={() => handleDeleteProduct(product._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'users' && (
        <div className="admin-section">
          <h2>All Users ({users.length})</h2>
          {users.length === 0 ? <p className="empty">No users yet</p> : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? '✅' : '❌'}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </section>
  );
}

export default Admin;