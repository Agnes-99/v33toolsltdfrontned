import React, { useState } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { useCart } from '../context/CartContext';
import { handleImageError } from '../utils/imageHelper';
import warehouseBg from '../assets/Hero Images/HeroImage2.avif';

const MOCK_INVENTORY = [
  { id: 201, name: 'V33-Hydra 8000', price: 120000, category: 'Automatic', img: 'https://sl.bing.net/f8JL4io614m', specs: '8000 Bricks/Day | 15MPa Pressure', stock: 'In Stock' },
  { id: 202, name: 'Eco-Block Semi-Pro', price: 48000, category: 'Semi-Auto', img: 'https://sl.bing.net/f8JL4io614m', specs: '3500 Blocks/Day | Dual-Vibration', stock: 'Available' },
  { id: 203, name: 'V33 Interlocking Master', price: 72000, category: 'Interlocking', img: 'https://sl.bing.net/f8JL4io614m', specs: 'Soil-Cement Ratio | High Precision', stock: 'Limited' },
  { id: 204, name: 'Mobile Egg-Layer M4', price: 35000, category: 'Mobile', img: 'https://sl.bing.net/f8JL4io614m', specs: 'No Pallets Needed | 4-Block Drop', stock: 'In Stock' },
  { id: 205, name: 'Industrial Crusher C1', price: 98000, category: 'Preparation', img: 'https://sl.bing.net/f8JL4io614m', specs: 'Stone-to-Sand | 50t/Hour', stock: 'Pre-Order' },
  { id: 206, name: 'Automatic Pallet Loader', price: 21000, category: 'Logistics', img: 'https://sl.bing.net/f8JL4io614m', specs: 'Sync-Speed | Steel Frame', stock: 'Available' }
];

const Home = () => {
  const { products, loading } = useFetchProducts(MOCK_INVENTORY);
  const [filter, setFilter] = useState('All');
  const { addToCart } = useCart();

  const categories = ['All', ...new Set(MOCK_INVENTORY.map(p => p.category))];
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  if (loading) return <div style={styles.loader}>INITIALIZING V33 SYSTEMS...</div>;

  return (
    <div style={styles.page}>
      {/* HERO SECTION WITH BACKGROUND */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div> {/* Darkens the image for text clarity */}
        <div style={styles.heroContent}>
          <div style={styles.badgeContainer}>
            <span style={styles.topLabel}>EST. 2026</span>
          </div>
          <h1 style={styles.mainHeading}>
            ENGINEERED <span style={{ color: '#6EC1E4' }}>DOMINANCE.</span>
          </h1>
          <p style={styles.subtext}>
            The industry standard for high-pressure brick production machinery.
          </p>
        </div>
      </section>

      <main style={styles.shopContainer}>
        {/* ... (Rest of the shop container code remains the same) */}
        <div style={styles.filterBar}>
          <div style={styles.filterGroup}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  ...styles.filterBtn,
                  color: filter === cat ? '#000' : '#888',
                  borderBottom: filter === cat ? '2px solid #6EC1E4' : '2px solid transparent'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div style={styles.statusIndicator}>
            <span style={styles.pulse}></span> {filteredProducts.length} UNITS ONLINE
          </div>
        </div>

        <div style={styles.productGrid}>
          {filteredProducts.map((item) => (
            <div key={item.id} style={styles.productCard}>
              <div style={styles.imageBox}>
                <div style={{
                  ...styles.stockBadge,
                  backgroundColor: item.stock === 'Limited' ? '#FF4444' : '#6EC1E4',
                  color: '#FFF'
                }}>
                  {item.stock}
                </div>
                <img
                  src={item.img}
                  alt={item.name}
                  onError={handleImageError}
                  style={styles.productImg}
                />
              </div>

              <div style={styles.infoBox}>
                <div style={styles.cardHeader}>
                  <span style={styles.category}>{item.category}</span>
                  <span style={styles.idTag}>#{item.id}</span>
                </div>
                <h3 style={styles.name}>{item.name}</h3>
                <div style={styles.specItem}>⚙️ {item.specs}</div>
                
                <div style={styles.priceRow}>
                  <div style={styles.priceWrap}>
                    <span style={styles.dollar}>R</span>
                    <span style={styles.amount}>{item.price.toLocaleString()}</span>
                  </div>
                  <button onClick={() => addToCart(item)} style={styles.cartButton}>
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const styles = {
  page: { 
    backgroundColor: '#F9F9F9', 
    color: '#1A1A1A', 
    minHeight: '100vh', 
    fontFamily: 'sans-serif',
    paddingTop: '90px' 
  },
  loader: { 
    height: '100vh',
     display: 'flex', 
     alignItems: 'center', 
     justifyContent: 'center',
      backgroundColor: '#F9F9F9', 
      color: '#6EC1E4', 
      letterSpacing: '2px'
     },
  
  // HERO STYLES UPDATED
  hero: { 
    height: '55vh', 
    display: 'flex', 
    alignItems: 'center', 
    padding: '0 8%', 
    position: 'relative',
    backgroundImage: `url(${warehouseBg})`,    
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden'
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    backdropFilter: 'blur(4px)', 
    zIndex: 1
  },
  heroContent: { 
    maxWidth: '800px', 
    position: 'relative', 
    zIndex: 2 
  },
  badgeContainer: { borderLeft: '3px solid #6EC1E4', paddingLeft: '15px', marginBottom: '10px' },
  topLabel: { color: '#6EC1E4', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '3px' },
  mainHeading: { fontSize: '3.5rem', margin: '0 0 10px 0', fontWeight: '900', color: '#FFF' }, // Text must be white here
  subtext: { fontSize: '1.1rem', color: '#CCC', maxWidth: '600px' },
  
  shopContainer: { padding: '40px 8%' },
  filterBar: { display: 'flex', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid #EEE' },
  filterGroup: { display: 'flex', gap: '20px' },
  filterBtn: { background: 'none', border: 'none', padding: '10px 0', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' },
  statusIndicator: { color: '#6EC1E4', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' },
  pulse: { width: '8px', height: '8px', backgroundColor: '#6EC1E4', borderRadius: '50%' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' },
  productCard: { backgroundColor: '#FFF', border: '1px solid #EEE' },
  imageBox: { height: '220px', position: 'relative', overflow: 'hidden', backgroundColor: '#F2F2F2' },
  productImg: { width: '100%', height: '100%', objectFit: 'cover' },
  stockBadge: { position: 'absolute', top: '10px', right: '10px', fontSize: '0.6rem', padding: '4px 8px', zIndex: 2, fontWeight: 'bold' },
  infoBox: { padding: '20px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  category: { color: '#6EC1E4', fontSize: '0.7rem', fontWeight: 'bold' },
  idTag: { color: '#AAA', fontSize: '0.7rem' },
  name: { fontSize: '1.2rem', margin: '0 0 10px 0', color: '#000' },
  specItem: { fontSize: '0.75rem', color: '#555', background: '#F5F5F5', padding: '8px 12px', borderLeft: '2px solid #EEE' },
  priceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' },
  amount: { fontSize: '1.4rem', fontWeight: 'bold', color: '#000' },
  dollar: { color: '#6EC1E4', marginRight: '5px', fontWeight: 'bold' },
  cartButton: { backgroundColor: '#000', color: '#FFF', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }
};

export default Home;