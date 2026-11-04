import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import './ProductDetails.css'; // Optional styling file
import './ProductDetails.css';

const products = [
  { id: 1, name: 'Pro Football Jersey', price: 29.99, category: 'Jerseys', image: 'https://images.unsplash.com/photo-1562155955-1cb2d73488d7?w=400&fit=crop', description: 'High-performance professional football jersey designed for breathable comfort and durability during high-intensity matches.' },
  { id: 2, name: 'Running Shorts', price: 19.99, category: 'Shorts', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&fit=crop', description: 'Lightweight, moisture-wicking running shorts equipped with an elastic waistband and flexible fit.' },
  { id: 3, name: 'Training Tracksuit', price: 59.99, category: 'Tracksuits', image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400&fit=crop', description: 'Complete all-weather training tracksuit crafted for warm-ups, cool-downs, and outdoor athletic activities.' },
  { id: 4, name: 'Sport Sneakers', price: 89.99, category: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&fit=crop', description: 'Premium athletic sneakers featuring maximum impact cushioning, anti-slip rubber soles, and lightweight support.' },
  { id: 5, name: 'Boxing Gloves', price: 34.99, category: 'Equipment', image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?w=400&fit=crop', description: 'Durable synthetic leather boxing gloves built with multi-layer foam padding for wrist and shock protection.' },
  { id: 6, name: 'Sport Hoodie', price: 44.99, category: 'Hoodies', image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=400&fit=crop', description: 'Cozy fleece-lined athletic hoodie with an adjustable drawstring hood and front pouch pocket.' },
  { id: 7, name: 'Basketball Jersey', price: 32.99, category: 'Jerseys', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&fit=crop', description: 'Authentic mesh basketball jersey designed for total freedom of motion and maximum airflow.' },
  { id: 8, name: 'Gym Shorts', price: 22.99, category: 'Shorts', image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&fit=crop', description: 'Versatile gym shorts featuring side zipper pockets to keep your phone and keys secure during workouts.' },
];

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 2rem', color: '#fff' }}>
        <h2>Product Not Found</h2>
        <button 
          onClick={() => navigate('/shop')} 
          style={{ marginTop: '1rem', padding: '0.6rem 1.2rem', background: '#2b9348', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <section style={{ maxWidth: '1000px', margin: '3rem auto', padding: '2rem', color: '#fff' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'transparent', border: '1px solid #555', color: '#ccc', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginBottom: '2rem' }}
      >
        ← Go Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
        <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }} />
        </div>

        <div>
          <span style={{ textTransform: 'uppercase', color: '#2b9348', letterSpacing: '1px', fontWeight: 'bold', fontSize: '0.85rem' }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '2.2rem', margin: '0.5rem 0 1rem' }}>{product.name}</h1>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem' }}>${product.price.toFixed(2)}</h2>
          <p style={{ color: '#aaa', lineHeight: '1.7', marginBottom: '2rem' }}>{product.description}</p>
          
          <button 
            onClick={() => addToCart(product)}
            style={{ padding: '0.8rem 2rem', background: '#2b9348', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;