import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Banner from './components/Banner';
import Categories from './components/Categories';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Shop from './components/Shop';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Admin from './components/Admin';
import ChatBot from './components/ChatBot';
import Welcome from './components/Welcome';
import { CartProvider } from './CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={
              <>
                <Navbar />
                <Hero />
                <Banner />
                <Categories />
                <Products />
                <Testimonials />
                <Footer />
                <ChatBot />
              </>
            } />
            <Route path="/shop" element={<><Navbar /><Shop /><Footer /><ChatBot /></>} />
            <Route path="/product/:id" element={<><Navbar /><ProductDetails /><Footer /><ChatBot /></>} />
            <Route path="/about" element={<><Navbar /><About /><Footer /><ChatBot /></>} />
            <Route path="/contact" element={<><Navbar /><Contact /><Footer /><ChatBot /></>} />
            <Route path="/cart" element={<><Navbar /><Cart /><Footer /><ChatBot /></>} />
            <Route path="/checkout" element={<><Navbar /><Checkout /><Footer /><ChatBot /></>} />
            <Route path="/admin" element={<><Navbar /><Admin /><Footer /></>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;