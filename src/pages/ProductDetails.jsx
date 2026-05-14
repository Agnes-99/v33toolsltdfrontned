import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useFetchProducts();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  
  const [quantity, setQuantity] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const product = products.find(p => p.id.toString() === id);

  if (!product) return <div style={styles.loader}>Searching inventory...</div>;

  const isMobile = windowWidth <= 850;
  const inStock = product.stockQuantity > 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div style={styles.page}>
      {/* Navigation Row */}
      <div style={styles.navRow}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ← BACK TO FLEET
        </button>
      </div>

      <div style={{
        ...styles.container,
        flexDirection: isMobile ? 'column' : 'row',
        padding: isMobile ? '20px' : '40px'
      }}>
        
        {/* Left: Product Image */}
        <div style={{...styles.imageWrap, maxWidth: isMobile ? '100%' : '500px'}}>
          <img src={product.image_url} alt={product.name} style={styles.image} />
          {product.stockQuantity < 5 && inStock && (
            <div style={styles.lowStockBadge}>LOW STOCK: {product.stockQuantity} LEFT</div>
          )}
        </div>

        {/* Right: Product Info */}
        <div style={styles.info}>
          <div style={styles.categoryLabel}>INDUSTRIAL EQUIPMENT</div>
          <h1 style={styles.title}>{product.name}</h1>
          
          <div style={styles.priceRow}>
            <div style={styles.price}>{formatPrice(product.price)}</div>
            <div style={{...styles.stockIndicator, color: inStock ? '#2ecc71' : '#e74c3c'}}>
               {inStock ? '● IN STOCK & READY TO SHIP' : '● CURRENTLY OUT OF STOCK'}
            </div>
          </div>

          <p style={styles.description}>{product.description}</p>

          {inStock && (
            <div style={styles.actionRow}>
              
              <button
                onClick={handleAddToCart}
                style={styles.button}
              >
                ADD TO CART
              </button>
            </div>
          )}

          {/* Value Added Sections */}
          <div style={styles.trustSection}>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>🌍</span>
              <div>
                <h4 style={styles.trustTitle}>Global Shipping</h4>
                <p style={styles.trustText}>Delivery available to over 120 countries directly from Newport Docks.</p>
              </div>
            </div>
            <div style={styles.trustItem}>
              <span style={styles.trustIcon}>🛡️</span>
              <div>
                <h4 style={styles.trustTitle}>V33 Certified</h4>
                <p style={styles.trustText}>All equipment is tested and certified by our engineering team before dispatch.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { padding: '160px 5% 80px', backgroundColor: '#FFFFFF', minHeight: '100vh', fontFamily: '"Inter", sans-serif' },
  loader: { paddingTop: '200px', textAlign: 'center', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 'bold' },
  
  navRow: { maxWidth: '1200px', margin: '0 auto 30px', display: 'flex', alignItems: 'center' },
  backBtn: { background: 'none', border: 'none', fontSize: '0.65rem', cursor: 'pointer', color: '#AAA', fontWeight: '900', letterSpacing: '2px' },

  container: {
    display: 'flex',
    gap: '60px',
    background: '#FFF',
    border: '1px solid #EEE',
    maxWidth: '1200px',
    margin: '0 auto'
  },

  imageWrap: { flex: '1.2', position: 'relative' },
  image: { width: '100%', height: 'auto', display: 'block', border: '1px solid #F9F9F9' },
  lowStockBadge: { position: 'absolute', top: '20px', left: '20px', backgroundColor: '#e74c3c', color: '#FFF', padding: '5px 12px', fontSize: '0.6rem', fontWeight: '900' },

  info: { flex: '1', display: 'flex', flexDirection: 'column' },
  categoryLabel: { fontSize: '0.6rem', color: '#6EC1E4', fontWeight: '900', letterSpacing: '2px', marginBottom: '10px' },
  title: { fontSize: '2.2rem', marginBottom: '20px', fontWeight: '900', color: '#000', letterSpacing: '-1px', lineHeight: '1.1' },
  
  priceRow: { display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '30px' },
  price: { fontSize: '1.8rem', fontWeight: '900', color: '#000' },
  stockIndicator: { fontSize: '0.65rem', fontWeight: '800', letterSpacing: '1px' },

  description: { fontSize: '0.95rem', lineHeight: '1.8', color: '#555', marginBottom: '40px', borderTop: '1px solid #EEE', paddingTop: '30px' },

  actionRow: { display: 'flex', gap: '15px', marginBottom: '40px' },
  qtyBox: { display: 'flex', alignItems: 'center', border: '1px solid #000', padding: '5px' },
  qtyBtn: { background: 'none', border: 'none', width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '300' },
  qtyDisplay: { width: '40px', textAlign: 'center', fontWeight: '900', fontSize: '0.9rem' },
  button: { flex: 1, backgroundColor: '#000', color: '#FFF', border: 'none', padding: '18px', fontWeight: '900', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer' },

  trustSection: { marginTop: 'auto', borderTop: '1px solid #EEE', paddingTop: '30px', display: 'flex', flexDirection: 'column', gap: '25px' },
  trustItem: { display: 'flex', gap: '15px', alignItems: 'flex-start' },
  trustIcon: { fontSize: '1.2rem' },
  trustTitle: { fontSize: '0.75rem', fontWeight: '900', margin: '0 0 3px 0' },
  trustText: { fontSize: '0.75rem', color: '#888', margin: 0, lineHeight: '1.4' }
};

export default ProductDetails;