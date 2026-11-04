import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { allProducts } from './shopData';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // useParams returns a string, product ids are numbers
  const product = allProducts.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/shop')} style={{ marginTop: 16, padding: '10px 20px', cursor: 'pointer' }}>
          Back to Shop
        </button>
      </div>
    );
  }

  const related = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <section style={{ maxWidth: 1000, margin: '60px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', maxWidth: 450, borderRadius: 8, objectFit: 'cover' }}
        />
        <div style={{ flex: 1, minWidth: 280 }}>
          <p style={{ color: '#22c55e', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 1 }}>
            {product.category}
          </p>
          <h1 style={{ margin: '8px 0' }}>{product.name}</h1>
          <h2 style={{ margin: '8px 0' }}>${product.price.toFixed(2)}</h2>
          <p style={{ margin: '20px 0', color: '#555', lineHeight: 1.6 }}>{product.description}</p>
          <p style={{ color: '#22c55e', fontWeight: 600 }}>Free shipping</p>

          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => addToCart(product)}
              style={{ background: '#000', color: '#fff', border: 'none', padding: '14px 28px', cursor: 'pointer', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate('/shop')}
              style={{ background: '#fff', color: '#000', border: '1px solid #000', padding: '14px 28px', cursor: 'pointer', fontWeight: 700, textTransform: 'uppercase' }}
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 60 }}>
          <h3>You may also like</h3>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 16 }}>
            {related.map(p => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                style={{ cursor: 'pointer', width: 200 }}
              >
                <img src={p.image} alt={p.name} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 6 }} />
                <p style={{ margin: '8px 0 0', fontWeight: 600 }}>{p.name}</p>
                <p style={{ margin: 0 }}>${p.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetails;