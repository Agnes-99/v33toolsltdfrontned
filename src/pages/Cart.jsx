import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, loading } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [syncingId, setSyncingId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 968;
  const safeItems = Array.isArray(cartItems) ? cartItems : [];
  
  const vat = cartTotal * 0.15;
  const shippingThreshold = 50000; 
  const shippingCost = cartTotal > shippingThreshold ? 0 : 2500;
  const grandTotal = cartTotal + vat + shippingCost;
  const progress = Math.min((cartTotal / shippingThreshold) * 100, 100);

  if (loading && safeItems.length === 0) {
    return <div style={styles.loadingScreen}>LOADING EQUIPMENT LIST...</div>;
  }

  if (safeItems.length === 0) {
    return (
      <div style={styles.emptyPage}>
        <h2 style={styles.emptyTitle}>NO ITEMS SELECTED</h2>
        <p style={{color: '#888', fontSize: '0.7rem', marginBottom: '20px'}}>Your equipment list is currently empty.</p>
        <Link to="/" style={styles.shopLink}>BROWSE CATALOG</Link>
      </div>
    );
  }

  const handleAction = async (id, actionFn, ...args) => {
    setSyncingId(id);
    await actionFn(id, ...args);
    setSyncingId(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>
            CART <span style={styles.count}>[{safeItems.length} ITEM(S)]</span>
            {syncingId && <span style={styles.syncIndicator}>// UPDATING...</span>}
          </h1>
          <div style={styles.headerLine}></div>
          
          <div style={styles.progressWrapper}>
            <div style={styles.progressText}>
              {cartTotal > shippingThreshold 
                ? "QUALIFIED FOR FREE SHIPPING" 
                : `ADD ${formatPrice(shippingThreshold - cartTotal)} MORE FOR FREE SHIPPING`}
            </div>
            <div style={styles.progressBarBg}>
              <div style={{...styles.progressBarFill, width: `${progress}%`}}></div>
            </div>
          </div>
        </header>

        <div style={{
          ...styles.mainContent,
          gridTemplateColumns: isMobile ? '1fr' : '1fr 400px',
          gap: isMobile ? '40px' : '70px'
        }}>
          
          <div style={styles.itemSection}>
            {safeItems.map((item) => (
              <div key={item.product.id} style={{
                ...styles.cartItem,
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                opacity: syncingId === item.product.id ? 0.5 : 1,
              }}>
                <div style={styles.itemInfo}>
                  <img 
                    src={item.product.image_url || 'https://via.placeholder.com/300'} 
                    alt={item.product.name} 
                    style={styles.itemImg} 
                  />
                  <div style={styles.itemDetails}>
                    <span style={styles.category}>{item.product.brand || 'V33 SYSTEMS'}</span>
                    <h3 style={styles.itemName}>{item.product.name}</h3>
                    <span style={styles.unitPrice}>{formatPrice(item.product.price)} / unit</span>
                    {!isMobile && (
                      <button 
                        onClick={() => handleAction(item.product.id, removeFromCart)} 
                        style={styles.removeBtn}
                      >REMOVE ITEM</button>
                    )}
                  </div>
                </div>

                <div style={{
                  ...styles.actionsRow,
                  width: isMobile ? '100%' : 'auto',
                  marginTop: isMobile ? '20px' : '0'
                }}>
                  <div style={styles.qtyStepper}>
                    <button 
                      onClick={() => handleAction(item.product.id, updateQuantity, -1)} 
                      style={styles.stepperBtn}
                      disabled={item.quantity <= 1 || syncingId === item.product.id}
                    >—</button>
                    <span style={styles.qtyNum}>{item.quantity}</span>
                    <button 
                      onClick={() => handleAction(item.product.id, updateQuantity, 1)} 
                      style={styles.stepperBtn}
                      disabled={syncingId === item.product.id}
                    >+</button>
                  </div>
                  
                  <div style={styles.itemPrice}>
                    {formatPrice(item.product.price * item.quantity)}
                  </div>

                  {isMobile && (
                    <button 
                      onClick={() => handleAction(item.product.id, removeFromCart)} 
                      style={styles.removeBtnMobile}
                    >×</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <aside style={styles.sidebar}>
            <div style={styles.summaryCard}>
              <h2 style={styles.summaryTitle}>ORDER SUMMARY</h2>
              
              <div style={styles.summaryRow}>
                <span>SUBTOTAL</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>VAT (15%)</span>
                <span>{formatPrice(vat)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>SHIPPING</span>
                <span style={{color: shippingCost === 0 ? '#2ECC71' : '#000'}}>
                  {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                </span>
              </div>

              <div style={styles.summaryDivider}></div>
              
              <div style={styles.totalRow}>
                <span>TOTAL</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>

              <button 
                onClick={() => navigate('/checkout')} 
                style={styles.checkoutBtn}
              >
                PROCEED TO CHECKOUT
              </button>
              
              <div style={styles.trustBox}>
                <p style={styles.trustText}>SECURE PAYMENT METHODS</p>
                <div style={styles.paymentGrid}>
                  {/* Updated Icons with color sources */}
                  <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Visa" style={styles.paymentIcon}/>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={styles.paymentIcon}/>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" style={styles.paymentIcon}/>
                  <div style={styles.eftBadge}>EFT</div>
                </div>
                <div style={styles.secureBadge}>
                    🔒 SECURE SSL AUTHORIZATION
                </div>
              </div>
            </div>
            <Link to="/" style={styles.continueLink}>← Back to Equipment Catalog</Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { backgroundColor: '#FFFFFF', color: '#000', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px', fontFamily: '"Inter", sans-serif' },
  container: { maxWidth: '1400px', margin: '0 auto', padding: '0 4%' },
  header: { marginBottom: '50px' },
  title: { fontSize: '0.9rem', fontWeight: '900', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '15px' },
  syncIndicator: { fontSize: '0.55rem', color: '#6EC1E4', fontWeight: '400' },
  count: { color: '#AAA', fontWeight: '400' },
  headerLine: { height: '1px', backgroundColor: '#F0F0F0', width: '100%', marginTop: '15px' },
  progressWrapper: { marginTop: '25px' },
  progressText: { fontSize: '0.6rem', fontWeight: '800', marginBottom: '10px', letterSpacing: '1px' },
  progressBarBg: { height: '2px', backgroundColor: '#F0F0F0', width: '100%' },
  progressBarFill: { height: '100%', backgroundColor: '#6EC1E4', transition: 'width 0.5s ease' },
  
  mainContent: { display: 'grid', alignItems: 'start' },
  itemSection: { display: 'flex', flexDirection: 'column' },
  cartItem: { display: 'flex', padding: '35px 0', borderBottom: '1px solid #F6F6F6', position: 'relative' },
  itemInfo: { flex: 2, display: 'flex', gap: '30px', alignItems: 'center' },
  itemImg: { width: '120px', height: '90px', objectFit: 'cover', border: '1px solid #F0F0F0' },
  itemDetails: { display: 'flex', flexDirection: 'column', gap: '4px' },
  category: { fontSize: '0.55rem', fontWeight: '900', color: '#AAA', letterSpacing: '1px' },
  itemName: { fontSize: '0.9rem', fontWeight: '700', margin: 0, textTransform: 'uppercase' },
  unitPrice: { fontSize: '0.7rem', color: '#999' },
  removeBtn: { background: 'none', border: 'none', padding: 0, marginTop: '15px', fontSize: '0.55rem', fontWeight: '800', cursor: 'pointer', color: '#AAA', textAlign: 'left', letterSpacing: '1px', textDecoration: 'underline' },
  
  actionsRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1.2 },
  qtyStepper: { display: 'flex', alignItems: 'center', border: '1px solid #EEE', padding: '6px 15px' },
  stepperBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '0 10px', fontSize: '0.9rem', fontWeight: 'bold' },
  qtyNum: { fontSize: '0.8rem', fontWeight: '800', minWidth: '30px', textAlign: 'center' },
  itemPrice: { fontSize: '0.95rem', fontWeight: '900' },
  removeBtnMobile: { background: '#F5F5F5', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold' },
  
  sidebar: { position: 'sticky', top: '140px' },
  summaryCard: { backgroundColor: '#FAFAFA', padding: '40px', border: '1px solid #F0F0F0' },
  summaryTitle: { fontSize: '0.65rem', fontWeight: '900', letterSpacing: '2px', marginBottom: '30px', color: '#000' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '15px', fontWeight: '600', color: '#666' },
  summaryDivider: { height: '1px', backgroundColor: '#EEE', margin: '25px 0' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '900', marginBottom: '35px' },
  checkoutBtn: { width: '100%', backgroundColor: '#000', color: '#FFF', border: 'none', padding: '22px', fontSize: '0.7rem', fontWeight: '900', cursor: 'pointer', letterSpacing: '3px' },
  
  trustBox: { marginTop: '35px', textAlign: 'center', borderTop: '1px solid #EEE', paddingTop: '30px' },
  trustText: { fontSize: '0.5rem', fontWeight: '900', color: '#BBB', marginBottom: '15px', letterSpacing: '1.5px' },
  paymentGrid: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }, // Removed opacity
  paymentIcon: { height: '25px', width: 'auto' }, // Removed grayscale filter
  eftBadge: { fontSize: '0.55rem', fontWeight: '900', border: '1px solid #333', padding: '2px 6px', color: '#000' },
  secureBadge: { marginTop: '20px', fontSize: '0.5rem', fontWeight: '800', color: '#AAA', letterSpacing: '1px' },
  continueLink: { display: 'block', textAlign: 'center', marginTop: '30px', fontSize: '0.6rem', fontWeight: '800', color: '#6EC1E4', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px' },
  
  emptyPage: { height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: '1rem', fontWeight: '900', letterSpacing: '3px', marginBottom: '10px' },
  shopLink: { fontSize: '0.7rem', fontWeight: '800', color: '#FFF', backgroundColor: '#000', padding: '15px 35px', textDecoration: 'none' },
  loadingScreen: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '3px', fontWeight: '900' }
};

export default Cart;