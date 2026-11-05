import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Shop from './components/Shop';
import Cart from './components/Cart';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Redirect any old or invalid path (like /login) back to home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;