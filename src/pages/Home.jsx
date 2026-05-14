import React, { useState, useMemo, useEffect } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { getAllCategories } from '../api/categoryService'; 
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { handleImageError } from '../utils/imageHelper';
import warehouseBg from '../assets/Hero Images/HeroImage2.avif';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { products, loading: productsLoading, error } = useFetchProducts();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // --- STATE ---
  const [categories, setCategories] = useState([{ id: 'All', name: 'All' }]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // --- RESPONSIVE & SEO ---
  useEffect(() => {
    document.title = "V33 TOOLS | Industrial Machinery";
    window.scrollTo(0, 0);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  // Load Categories
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getAllCategories();
        if (data && Array.isArray(data)) {
          setCategories([{ id: 'All', name: 'All' }, ...data]);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCats();
  }, []);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let list = [...products];

    if (selectedCategory !== 'All') {
      const targetCat = categories.find(c => c.name === selectedCategory);
      if (targetCat) list = list.filter(p => p.categoryId === targetCat.id);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.id.toString().includes(term)
      );
    }
    return list;
  }, [products, selectedCategory, searchTerm, categories]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  if (productsLoading) return <div style={styles.loader}>INITIALIZING V33 SYSTEMS...</div>;
  if (error) return <div style={styles.loader}>SYSTEM CONNECTION ERROR</div>;

  return (
    <div style={styles.page}>
      
      {/* HERO SECTION - REFINED SCALE */}
      <section style={{ 
        ...styles.hero, 
        height: isMobile ? '40vh' : '50vh',
      }}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <div style={styles.badgeContainer}>
            <span style={styles.topLabel}>V33 FLEET OPERATIONS</span>
          </div>
          <h1 style={{ 
            ...styles.mainHeading, 
            fontSize: isMobile ? '1.8rem' : '2.8rem' 
          }}>
            ENGINEERED <span style={{ color: '#6EC1E4' }}>DOMINANCE.</span>
          </h1>
          <p style={{ ...styles.subtext, fontSize: isMobile ? '0.85rem' : '1rem' }}>
            The gold standard for high-pressure industrial machinery and global logistics.
          </p>
        </div>
      </section>

      <main style={styles.shopContainer}>
        
        {/* SLIDABLE NAVIGATION BAR */}
        <div style={{ 
          ...styles.filterBar, 
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '20px' : '0'
        }}>
          <div style={styles.filterWrapper}>
            <div style={styles.filterGroup} className="no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.name); setVisibleCount(12); }}
                  style={{
                    ...styles.filterBtn,
                    color: selectedCategory === cat.name ? '#111' : '#AAA',
                    borderBottom: selectedCategory === cat.name ? '2px solid #6EC1E4' : '2px solid transparent'
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ ...styles.searchWrapper, width: isMobile ? '100%' : '260px' }}>
            <input 
              type="text" 
              placeholder="SEARCH CATALOG..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        {/* PRODUCT GRID - "ZOOMED OUT" CARDS */}
        <div style={styles.productGrid}>
          {displayedProducts.map((item) => (
            <div key={item.id} style={styles.productCard} onClick={() => navigate(`/product/${item.id}`)}>
              <div style={styles.imageBox}>
                <div style={{
                  ...styles.stockBadge,
                  backgroundColor: item.stockQuantity <= 0 ? '#FF4444' : '#6EC1E4',
                }}>
                  {item.stockQuantity > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                </div>
                <img
                  src={item.image_url || 'https://via.placeholder.com/300'}
                  alt={item.name}
                  onError={handleImageError}
                  style={styles.productImg}
                />
              </div>

              <div style={styles.infoBox}>
                <div style={styles.cardHeader}>
                  <span style={styles.category}>SERIES V33</span>
                  <span style={styles.idTag}>#{item.id}</span>
                </div>
                <h3 style={styles.name}>{item.name}</h3>
                <p style={styles.specItem}>{item.description.slice(0, 65)}...</p>
                
                <div style={styles.priceRow}>
                  <span style={styles.amount}>{formatPrice(item.price)}</span>
                  <button 
                    disabled={item.stockQuantity <= 0}
                    onClick={(e) => { e.stopPropagation(); addToCart(item); }} 
                    style={{ ...styles.cartButton, opacity: item.stockQuantity <= 0 ? 0.3 : 1 }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE */}
        {visibleCount < filteredProducts.length && (
          <div style={styles.seeMoreContainer}>
            <button onClick={() => setVisibleCount(prev => prev + 12)} style={styles.seeMoreBtn}>
              LOAD MORE UNITS
            </button>
          </div>
        )}
      </main>

      {/* GLOBAL CSS FOR SCROLLBAR HIDING */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

const styles = {
  page: { backgroundColor: '#FDFDFD', color: '#111', minHeight: '100vh', paddingTop: '80px' },
  loader: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6EC1E4', fontSize: '0.7rem', letterSpacing: '3px' },
  
  // HERO - Scaled down for "zoomed out" feel
  hero: { display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundImage: `url(${warehouseBg})`, backgroundSize: 'cover', backgroundPosition: 'center', textAlign: 'center', overflow: 'hidden' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.65)' },
  heroContent: { maxWidth: '700px', position: 'relative', zIndex: 2, padding: '0 20px' },
  badgeContainer: { marginBottom: '10px' },
  topLabel: { color: '#6EC1E4', fontSize: '0.65rem', fontWeight: '800', letterSpacing: '4px' },
  mainHeading: { margin: '0 0 10px 0', fontWeight: '900', color: '#FFF' },
  subtext: { color: '#BBB', fontWeight: '400', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto' },

  // SHOP CONTAINER
  shopContainer: { maxWidth: '1400px', margin: '0 auto', padding: '40px 5%' },
  
  // FILTER BAR (SLIDABLE)
  filterBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '35px', borderBottom: '1px solid #F0F0F0' },
  filterWrapper: { flex: 1, overflow: 'hidden' },
  filterGroup: { 
    display: 'flex', 
    gap: '30px', 
    overflowX: 'auto', 
    whiteSpace: 'nowrap', 
    paddingBottom: '12px',
    WebkitOverflowScrolling: 'touch' 
  },
  filterBtn: { 
    background: 'none', 
    border: 'none', 
    padding: '8px 0', 
    cursor: 'pointer', 
    fontWeight: '800', 
    textTransform: 'uppercase', 
    fontSize: '0.65rem', 
    letterSpacing: '1px',
    flexShrink: 0 
  },
  
  // SEARCH
  searchWrapper: { position: 'relative' },
  searchInput: { width: '100%', padding: '10px 0', border: 'none', borderBottom: '2px solid #111', backgroundColor: 'transparent', fontSize: '0.7rem', fontWeight: '900', outline: 'none' },

  // GRID & CARDS - Compact "Zoomed Out" Style
  productGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
    gap: '30px' 
  },
  productCard: { backgroundColor: '#FFF', border: '1px solid #EEE', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: '0.2s' },
  imageBox: { height: '230px', position: 'relative', overflow: 'hidden', backgroundColor: '#F9F9F9' },
  productImg: { width: '100%', height: '100%', objectFit: 'cover' },
  stockBadge: { position: 'absolute', top: '10px', right: '10px', fontSize: '0.55rem', padding: '4px 8px', color: '#FFF', fontWeight: '800', letterSpacing: '1px' },
  
  infoBox: { padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  category: { color: '#6EC1E4', fontSize: '0.6rem', fontWeight: '800' },
  idTag: { color: '#CCC', fontSize: '0.6rem' },
  name: { fontSize: '0.95rem', margin: '0 0 8px 0', fontWeight: '800', color: '#111', minHeight: '2.5rem', lineHeight: '1.3' },
  specItem: { fontSize: '0.7rem', color: '#666', marginBottom: '15px', lineHeight: '1.5' },
  
  priceRow: { marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #F9F9F9' },
  amount: { fontSize: '1.1rem', fontWeight: '900', color: '#111' },
  cartButton: { backgroundColor: '#111', color: '#FFF', border: 'none', padding: '10px 18px', fontWeight: '800', cursor: 'pointer', fontSize: '0.65rem' },

  seeMoreContainer: { display: 'flex', justifyContent: 'center', marginTop: '50px' },
  seeMoreBtn: { backgroundColor: 'transparent', border: '1px solid #111', padding: '12px 30px', fontWeight: '800', cursor: 'pointer', fontSize: '0.65rem', letterSpacing: '1px' }
};

export default Home;