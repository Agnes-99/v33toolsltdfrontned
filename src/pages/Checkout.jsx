import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const { formatPrice } = useCurrency();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 968;
  const vat = cartTotal * 0.15;
  const shippingThreshold = 50000;
  const shipping = cartTotal > shippingThreshold ? 0 : 2500;
  const grandTotal = cartTotal + vat + shipping;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.mainTitle}>SECURE CHECKOUT</h1>
          <div style={styles.headerLine}></div>
        </header>

        {/* MAINTENANCE ALERT BAR */}
        <div style={styles.maintenanceAlert}>
          <span style={styles.alertIcon}>⚠️</span>
          <div style={styles.alertContent}>
            <strong style={styles.alertTitle}>SYSTEM STATUS: MAINTENANCE IN PROGRESS</strong>
            <p style={styles.alertText}>Transaction capabilities are temporarily offline. Please check back shortly.</p>
          </div>
        </div>
        
        <div style={{
          ...styles.checkoutGrid,
          gridTemplateColumns: isMobile ? '1fr' : '1fr 380px',
          opacity: 0.8
        }}>
          
          <div style={styles.leftCol}>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>1. DELIVERY DETAILS</h2>
              <div style={{...styles.inputGroup, flexDirection: isMobile ? 'column' : 'row'}}>
                <input style={styles.input} placeholder="FULL NAME" disabled />
                <input style={styles.input} placeholder="EMAIL ADDRESS" disabled />
              </div>
              <input style={styles.input} placeholder="CONTACT NUMBER" disabled />
              <input style={styles.input} placeholder="STREET ADDRESS" disabled />
              <div style={{...styles.inputGroup, flexDirection: isMobile ? 'column' : 'row'}}>
                <input style={styles.input} placeholder="CITY" disabled />
                <input style={styles.input} placeholder="POSTAL CODE" disabled />
              </div>
            </div>

            <div style={{...styles.section, marginTop: '30px'}}>
              <h2 style={styles.sectionTitle}>2. PAYMENT METHOD</h2>
              <div style={styles.paymentOptions}>
                
                {/* CARD OPTION (DISABLED) */}
                <div style={{...styles.payCard, cursor: 'not-allowed', opacity: 0.6}}>
                  <div style={styles.payLabelGroup}>
                    <input type="radio" checked={paymentMethod === 'card'} readOnly disabled />
                    <span style={styles.payText}>CREDIT / DEBIT CARD</span>
                  </div>
                  <div style={styles.logoGroup}>
                    <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Visa" style={{...styles.methodLogo, filter: 'grayscale(100%)'}} />
                    <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="Mastercard" style={{...styles.methodLogo, filter: 'grayscale(100%)'}} />
                    <img src="https://cdn-icons-png.flaticon.com/512/349/349225.png" alt="Amex" style={{...styles.methodLogo, filter: 'grayscale(100%)'}} />
                  </div>
                </div>

                {/* EFT OPTION (RESTORED & DISABLED) */}
                <div style={{...styles.payCard, cursor: 'not-allowed', opacity: 0.6}}>
                  <div style={styles.payLabelGroup}>
                    <input type="radio" checked={paymentMethod === 'eft'} readOnly disabled />
                    <span style={styles.payText}>BANK TRANSFER (EFT)</span>
                  </div>
                  <div style={styles.logoGroup}>
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/2830/2830284.png" 
                      alt="Bank" 
                      style={{ height: '16px', filter: 'grayscale(100%)', opacity: 0.5 }} 
                    />
                    <div style={{ ...styles.eftBadge, borderColor: '#AAA', color: '#AAA' }}>SECURE PAY</div>
                  </div>
                </div>

                                {/* EFT OPTION (RESTORED & DISABLED) */}
                <div style={{...styles.payCard, cursor: 'not-allowed', opacity: 0.6}}>
                  <div style={styles.payLabelGroup}>
                    <input type="radio" checked={paymentMethod === 'eft'} readOnly disabled />
                    <span style={styles.payText}>PAYPAL</span>
                  </div>
                  <div style={styles.logoGroup}>
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                       alt="Paypal" 
                      style={{ height: '16px', filter: 'grayscale(100%)', opacity: 0.5 }} 
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

          <aside style={{marginTop: isMobile ? '30px' : '0'}}>
            <div style={styles.summaryCard}>
              <h2 style={styles.summaryTitle}>ORDER SUMMARY</h2>
              <div style={styles.itemList}>
                {cartItems.map(item => (
                  <div key={item.product.id} style={styles.smallItem}>
                    <div style={styles.itemMain}>
                       <span style={styles.qtyBadge}>{item.quantity}</span>
                       <span style={styles.itemNameText}>{item.product.name}</span>
                    </div>
                    <span style={styles.itemPriceText}>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div style={styles.divider}></div>
              <div style={styles.summaryRow}><span>SUBTOTAL</span><span>{formatPrice(cartTotal)}</span></div>
              <div style={styles.summaryRow}><span>VAT (15%)</span><span>{formatPrice(vat)}</span></div>
              <div style={styles.summaryRow}><span>SHIPPING</span><span style={{color: shipping === 0 ? '#2ECC71' : '#000'}}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
              <div style={{...styles.divider, margin: '15px 0'}}></div>
              <div style={styles.totalRow}>
                <span>TOTAL</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>

              <button 
                style={{...styles.placeOrderBtn, backgroundColor: '#CCC', cursor: 'not-allowed'}}
                disabled
              >
                CHECKOUT OFFLINE
              </button>
              <div style={styles.secureFooter}>V33 COMMAND CENTER // STATUS: OFFLINE</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px', fontFamily: '"Inter", sans-serif' },
  container: { maxWidth: '1100px', margin: '0 auto', padding: '0 4%' },
  header: { marginBottom: '20px' },
  mainTitle: { fontSize: '0.8rem', fontWeight: '900', letterSpacing: '4px', opacity: 0.8 },
  headerLine: { height: '1px', backgroundColor: '#F0F0F0', width: '100%', marginTop: '12px' },
  
  maintenanceAlert: { 
    backgroundColor: '#FFFBE6', 
    border: '1px solid #FFE58F', 
    padding: '20px', 
    marginBottom: '40px', 
    display: 'flex', 
    gap: '15px', 
    alignItems: 'center' 
  },
  alertIcon: { fontSize: '1.2rem' },
  alertTitle: { fontSize: '0.7rem', fontWeight: '900', display: 'block', marginBottom: '4px', color: '#856404', letterSpacing: '1px' },
  alertText: { fontSize: '0.7rem', margin: 0, color: '#856404', fontWeight: '500' },

  checkoutGrid: { display: 'grid', gap: '50px', alignItems: 'start' },
  section: { border: '1px solid #F0F0F0', padding: '30px' },
  sectionTitle: { fontSize: '0.6rem', fontWeight: '900', letterSpacing: '2px', color: '#AAA', marginBottom: '20px' },
  input: { width: '100%', padding: '14px', marginBottom: '12px', border: '1px solid #EEE', fontSize: '0.75rem', fontWeight: '500', outline: 'none', backgroundColor: '#FAFAFA' },
  inputGroup: { display: 'flex', gap: '12px' },
  paymentOptions: { display: 'flex', flexDirection: 'column', gap: '10px' },
  payCard: { padding: '18px', border: '1px solid #EEE', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  payLabelGroup: { display: 'flex', alignItems: 'center', gap: '12px' },
  payText: { fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.5px' },
  logoGroup: { display: 'flex', gap: '10px', alignItems: 'center' },
  methodLogo: { height: '16px', width: 'auto' },
  eftBadge: { fontSize: '0.5rem', fontWeight: '900', border: '1px solid', padding: '3px 6px' },

  summaryCard: { backgroundColor: '#FAFAFA', padding: '30px', border: '1px solid #F0F0F0' },
  summaryTitle: { fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px', marginBottom: '25px', opacity: 0.6 },
  itemList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  smallItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  itemMain: { display: 'flex', alignItems: 'center', gap: '8px' },
  qtyBadge: { fontSize: '0.55rem', fontWeight: '900', background: '#EEE', padding: '1px 5px' },
  itemNameText: { fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase' },
  itemPriceText: { fontSize: '0.7rem', fontWeight: '600' },
  divider: { height: '1px', backgroundColor: '#EEE', margin: '15px 0' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', marginBottom: '10px', fontWeight: '500', color: '#666' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontWeight: '900', fontSize: '1rem' },
  placeOrderBtn: { width: '100%', color: '#FFF', border: 'none', padding: '18px', fontWeight: '900', fontSize: '0.7rem', marginTop: '25px', letterSpacing: '2px' },
  secureFooter: { textAlign: 'center', marginTop: '15px', fontSize: '0.5rem', fontWeight: '800', color: '#BBB' }
};

export default Checkout;